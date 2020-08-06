/*  Copyright [2017-2020] [Invincible Technologies]
 *  
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *    
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

/**
 * Entities / Objects
 * 
 * AJAX based CRUD controller that provides create, read, update and delete 
 * requests functionality and response notifications. All requests takes a 
 * URI (address) and or related data entity object(s).
 * 
 * @param {type} options 
 * @returns {undefined}
 */
function CRUDController(options) {
    var instance = this;

    instance.Key = options !== undefined ? options.key : null;
    instance.Processing = false;
    instance.ResponseData = null;
    instance.ResponseError = null;

    /**
     * Gets controller key.
     * 
     * @returns {type.key}
     */
    instance.getKey = function () {
        return instance.Key;
    };
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "CRUDController";
    };

    /**
     * Request processing status.
     * 
     * @returns {Boolean}
     */
    instance.processing = function () {
        return instance.Processing;
    };

    /**
     * Reference function to CRUD controller response data.
     * 
     * @returns {CRUDController.ResponseData|CRUDProcessor.controller.ResponseData}
     */
    instance.responseData = function () {
        return instance.ResponseData;
    };

    /**
     * Reference function to CRUD controller response error.
     * 
     * @returns {CRUDProcessor.controller.ResponseError|CRUDController.ResponseError}
     */
    instance.responseError = function () {
        return instance.ResponseError;
    };

    /**
     * Reference function to CRUD controller to check for response error.
     * 
     * @returns {Boolean}
     */
    instance.isResponseError = function () {
        return instance.ResponseError !== null;
    };
    
    /**
     * Sends ajax request.
     * 
     * @param {type} options
     * @param {type} callback 
     * @returns {undefined}
     */
    instance.sendRequest = function (options, callback) {

        //initialize headers and set __RequestVerificationToken for request authorization.
        var headers = (options.headers !== null && options.headers !== undefined) ? options.headers : {};
        var token = $('[name=__RequestVerificationToken]').val();
        headers['__RequestVerificationToken'] = token;

        //initialize request data or content and extend with __RequestVerificationToken for request authorization.
        var data = (options.data !== null && options.data !== undefined) ? JSON.parse(options.data) : {};

        var verificationElements = document.getElementsByName("__RequestVerificationToken");
        if (verificationElements !== null && verificationElements !== undefined) {

            data.__RequestVerificationToken = [];
            for (var index = 0; index < verificationElements.length; index++) {

                data.__RequestVerificationToken.push(verificationElements[index].value);
            }
        }

        options.data = JSON.stringify(data);

        if (options.eventData.target === 'CreateFileContent' || options.eventData.target === 'UpdateFileContent') {

            var uploadForm = (options.eventData.form !== null && options.eventData.form !== undefined) ? options.eventData.form : '__uploadform';

            if (document.forms[uploadForm] !== null && document.forms[uploadForm] !== undefined) {

                headers["Content-Disposition"] = "attachment; filename=" + document.forms[uploadForm]["upload"].value;

                try {

                    $(document.forms[uploadForm]).ajaxSubmit({
                        headers: headers,
                        dataType: (options.dataType !== null && options.dataType !== undefined) ? options.dataType : "json",
                        type: (options.method !== null && options.method !== undefined) ? options.method : "POST",
                        data: (options.data !== null && options.data !== undefined) ? options.data : null,
                        url: options.url,
                        contentType: 'multipart/form-data',
                        uploadProgress: function (event, position, total, percentComplete) {

                            instance.notify({ event: "progress.request.CRUD.WindnTrees", result: percentComplete, position: position, total: total, percentComplete: percentComplete });
                        },
                        success: function (data, textStatus, jqXHR) {

                            options.eventData.event = "after.request.CRUD.WindnTrees";
                            options.eventData.method = (options.method !== null && options.method !== undefined) ? options.method : "POST";

                            instance.notifyDone(data, textStatus, jqXHR, options.eventData);
                        },
                        error: function (data, textStatus, jqXHR) {

                            options.eventData.event = "after.request.CRUD.WindnTrees";
                            options.eventData.method = (options.method !== null && options.method !== undefined) ? options.method : "POST";

                            instance.notifyFail(data, textStatus, jqXHR, options.eventData);
                        },
                        always: function (data, textStatus, jqXHR) {
                            if (callback !== null && callback !== undefined) {
                                callback(data);
                            }
                        }
                    });

                } catch (e) {

                }
            }
        }
         else {

            $.ajax({
                headers: headers,
                dataType: (options.dataType !== null && options.dataType !== undefined) ? options.dataType : "json",
                type: (options.method !== null && options.method !== undefined) ? options.method : "POST",
                data: (options.data !== null && options.data !== undefined) ? options.data : null,
                url: options.url,
                contentType: (options.contentType !== null && options.contentType !== undefined) ? options.contentType : "application/json; charset=utf-8"
            })
                .done(function (data, textStatus, jqXHR) {

                    options.eventData.event = "after.request.CRUD.WindnTrees";
                    options.eventData.method = (options.method !== null && options.method !== undefined) ? options.method : "POST";

                    instance.notifyDone(data, textStatus, jqXHR, options.eventData);
                })
                .fail(function (data, textStatus, jqXHR) {

                    options.eventData.event = "after.request.CRUD.WindnTrees";
                    options.eventData.method = (options.method !== null && options.method !== undefined) ? options.method : "POST";

                    instance.notifyFail(data, textStatus, jqXHR, options.eventData);
                })
                .always(function (data, textStatus, jqXHR) {
                    if (callback !== null && callback !== undefined) {
                        callback(data);
                    }
                });
        }
    };

    /**
     * Sends new entity request at sepcified URL.
     * 
     * data.uri - Web resource identifier
     * data.content - Data entity object
     * callback - Callback function
     * 
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    instance.create = function (data, callback) {
        instance.Processing = true;
        instance.ResponseData = null;
        instance.ResponseError = null;

        var eventData = { 'event': 'before.request.CRUD.WindnTrees', 'key': instance.Key, 'request': (data.request !== null && data.request !== undefined) ? data.request : "create", 'target': data.target, 'form': data.form, 'data': data };
        var request = (data.target !== null && data.target !== undefined) ? data.target : (data.request !== null && data.request !== undefined) ? data.request : "create";
        
        instance.notify(eventData);
        
        instance.sendRequest({
            'headers': {},
            'data': (typeof(data.content) === "string" ? data.content : JSON.stringify(data.content)),
            'url': data.uri + "/" + request,
            'eventData': eventData}, callback);
    };

    /**
     * Sends read entity object request by key using GET method.
     * 
     * data.uri - Web resource identifier
     * data.key - Key value
     * callback - Callback function
     * 
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    instance.read = function (data, callback) {
        instance.Processing = true;
        instance.ResponseData = null;
        instance.ResponseError = null;

        var eventData = { 'event': 'before.request.CRUD.WindnTrees', 'key': instance.Key, 'request': (data.request !== null && data.request !== undefined) ? data.request : "read", 'target': data.target, 'form': data.form, 'data': data };
        var request = (data.target !== null && data.target !== undefined) ? data.target : (data.request !== null && data.request !== undefined) ? data.request : "read";

        instance.notify(eventData);

        instance.sendRequest({
            'headers': {},
            'method': 'GET',
            'data': null,
            'url': encodeURI(data.uri + "/" + request + "/" + ((data.key !== null && data.key !== undefined) ? data.key : "")),
            'eventData': eventData
        }, callback);
    };

    /**
     * Sends existing entity update request at specified URL.
     * 
     * data.uri - Web resource identifier
     * data.content - Entity data object
     * callback - Callback function
     * 
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    instance.update = function (data, callback) {
        instance.Processing = true;
        instance.ResponseData = null;
        instance.ResponseError = null;

        var eventData = { 'event': 'before.request.CRUD.WindnTrees', 'key': instance.Key, 'request': (data.request !== null && data.request !== undefined) ? data.request : "update", 'target': data.target, 'form': data.form, 'data': data };
        var request = (data.target !== null && data.target !== undefined) ? data.target : (data.request !== null && data.request !== undefined) ? data.request : "update";
        
        instance.notify(eventData);

        instance.sendRequest({
            'headers': {},
            'data': (typeof(data.content) === "string" ? data.content : JSON.stringify(data.content)),
            'url': data.uri + "/" + request,
            'file': data.UploadField,
            'eventData': eventData}, callback);
    };

    /**
     * Sends existing entity deletion request at specified URL.
     * 
     * data.uri -  Web resource identifier
     * data.content - Entity data object
     * callback - Callback function
     * 
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    instance.delete = function (data, callback) {
        instance.Processing = true;
        instance.ResponseData = null;
        instance.ResponseError = null;

        var eventData = { 'event': 'before.request.CRUD.WindnTrees', 'key': instance.Key, 'request': (data.request !== null && data.request !== undefined) ? data.request : "delete", 'target': data.target, 'form': data.form, 'data': data };
        var request = (data.target !== null && data.target !== undefined) ? data.target : (data.request !== null && data.request !== undefined) ? data.request : "delete";
        
        instance.notify(eventData);

        instance.sendRequest({
            'headers': {},
            'data': (typeof(data.content) === "string" ? data.content : JSON.stringify(data.content)),
            'url': data.uri + "/" + request,
            'eventData': eventData}, callback);
    };

    /**
     * Sends list request based on keyword related entities.
     * 
     * data.uri - Web resource identifier
     * data.keyword - Search keyword data value
     * callback - Callback function
     * 
     * @param {type} data
     * @param {type} callback
     * @returns {undefined}
     */
    instance.list = function (data, callback) {
        instance.Processing = true;
        instance.ResponseData = null;
        instance.ResponseError = null;

        var eventData = { 'event': 'before.request.CRUD.WindnTrees', 'key': instance.Key, 'request': (data.request !== null && data.request !== undefined) ? data.request : "list", 'target': data.target, 'form': data.form, 'data': data };

        var request = (data.target !== null && data.target !== undefined) ? data.target : (data.request !== null && data.request !== undefined) ? data.request : "list";

        instance.notify(eventData);

        if (data.method === "GET") {

            var url = data.uri + "/" + request;

            if (data.key !== null && data.key !== undefined) {
                url = (url + "/" + data.key);
            }

            if (data.source !== null && data.source !== undefined) {
                url = (url + "/" + data.source);
            }

            if (data.keyword !== null && data.keyword !== undefined) {
                url = (url + "/" + data.keyword);
            }

            if (data.page !== null && data.page !== undefined) {
                url = (url + "/" + data.page);
            }

            if (data.size !== null && data.size !== undefined) {
                url = (url + "/" + data.size);
            }

            instance.sendRequest({
                'headers': {},
                'method': "GET",
                'data': null,
                'url': url,
                'eventData': eventData
            }, callback);

        } else {

            var queryObject = (data.query !== null && data.query !== undefined) ? data.query : { "key": data.key, "source": data.source, "keyword": data.keyword, "size": data.size, "page": data.page };

            instance.sendRequest({
                'headers': {},
                'data': JSON.stringify(queryObject),
                'url': data.uri + "/" + request,
                'eventData': eventData
            }, callback);
        }
    };

    /**
     * Events publishing and processing section.
     * 
     * @param {type} eventData
     * @returns {undefined}
     */
    
    /**
     * Notify event subscribers with event information.
     * 
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.notify = function (eventData) {
        $(instance).trigger(eventData.event, eventData);
    };
    
    /**
     * Processes successfull response.
     * 
     * @param {type} data
     * @param {type} textStatus
     * @param {type} jqXHR
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.notifyDone = function (data, textStatus, jqXHR, eventData) {
        instance.Processing = false;
        instance.ResponseData = data;

        eventData.result = data;
        $(instance).trigger('after.request.CRUD.WindnTrees', eventData);
    };
    
    /**
     * Processes failure response.
     * 
     * @param {type} jqXHR
     * @param {type} textStatus
     * @param {type} errorThrown
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.notifyFail = function (jqXHR, textStatus, errorThrown, eventData) {
        instance.Processing = false;
        instance.ResponseError = errorThrown;

        eventData.result = jqXHR;
        $(instance).trigger('fail.request.CRUD.WindnTrees', eventData);
    };
}