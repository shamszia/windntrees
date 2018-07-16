/*  Copyright [2018] [Invincible Technologies]
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
 * CRUD data processor extracts and processes response data into an object 
 * or list of entity objects.
 * 
 * options.contentType
 * options.key
 * 
 * @param {type} options
 * @returns {undefined}
 */
function CRUDProcessor(options) {
    var instance = this;

    instance.Key = options !== undefined ? options.key : null;
    instance.Controller = null;

    instance.Record = null;
    instance.Records = [];
    instance.Errors = [];

    instance.ProcessingState = null;
    instance.ProcessingStatus = false;

    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "CRUDProcessor";
    };

    /**
     * Gets controller key.
     * 
     * @returns {type.key}
     */
    instance.getKey = function () {
        return instance.Key;
    };

    /**
     * Reference function to CRUD controller.
     * 
     * @returns {CRUDController}
     */
    instance.getController = function () {
        if (instance.Controller === null) {
            instance.Controller = new CRUDController();
        }
        return instance.Controller;
    };

    /**
     * Reference function to CRUD controller response data.
     * 
     * @returns {CRUDController.ResponseData|CRUDProcessor.getController.ResponseData|Window.ResponseData|CRUDProcessor.ResponseData}
     */
    instance.responseData = function () {
        return instance.getController().responseData();
    };

    /**
     * Reference function to CRUD controller response error.
     * 
     * @returns {CRUDProcessor.getController.ResponseError|CRUDProcessor.ResponseError|Window.ResponseError|CRUDController.ResponseError}
     */
    instance.responseError = function () {
        return instance.getController().responseError();
    };

    /**
     * Reference function to CRUD controller to check for response error.
     * 
     * @returns {Boolean}
     */
    instance.isResponseError = function () {
        return instance.getController().isResponseError();
    };

    /**
     * Reference function to check if there were input errors.
     * 
     * @returns {Boolean}
     */
    instance.isInputError = function () {
        if (instance.Errors === null || instance.Errors === undefined) {
            return false;
        }

        return instance.Errors.length > 0;
    };

    /**
     * Gets request processing status.
     * 
     * @returns {Boolean}
     */
    instance.getProcessingStatus = function () {
        return instance.ProcessingStatus;
    };

    /**
     * Gets in process request state.
     * 
     * @returns {CRUDProcessor.ProcessingState}
     */
    instance.getProcessingState = function () {
        return instance.ProcessingState;
    };

    /**
     * Gets list of errors. Note that the list of errors is only available when
     * the request has been completed and processed.
     * 
     * @returns {Array|Window.Errors}
     */
    instance.getErrors = function () {
        return instance.Errors;
    };

    /**
     * Gets processed record. Note that record is only available when the request
     * has been completed and processed.
     * 
     * @returns {result|type.data.content|.eventData.result.contents}
     */
    instance.getRecord = function () {
        return instance.Record;
    };

    /**
     * Gets processed records. Note that records are only available when request
     * has been completed and processed. 
     * 
     * @returns {Array}
     */
    instance.getRecords = function () {
        return instance.Records;
    };

    /**
     * Gets the server side context path for the requested URI.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.getContextPath = function (data) {
        instance.Record = null;
        instance.Errors = [];

        instance.getController().getContextPath(data);
    };

    /**
     * Get and extract data object by key from the specified URL. 
     * 
     * data.uri
     * data.key
     * 
     * @param {type} data 
     * @returns {Window.Record}
     */
    instance.get = function (data) {
        instance.Record = null;
        instance.Errors = [];

        instance.getController().get(data);
    };

    /**
     * Get and extract data object by composite key from the specified URL.
     * 
     * data.uri
     * data.compsiteKey
     * 
     * @param {type} data 
     * @returns {Window.Record}
     */
    instance.post = function (data) {
        instance.Record = null;
        instance.Errors = [];

        instance.getController().post(data);
    };

    /**
     * Find and extract paged data objects (usuallay detail records) referenced
     * by keyword (primary key) from the specified URL.
     * 
     * data.uri
     * data.key
     * data.keyword
     * data.size
     * data.page
     * 
     * @param {type} data 
     * @returns {Array|Window.Records}
     */
    instance.select = function (data) {
        instance.Records = [];
        instance.Errors = [];

        instance.getController().select(data);
    };

    /**
     * Selects list objects (usuallay detail records) referenced
     * by keyword (primary key) from the specified URL.
     *
     * data.uri
     * data.key
     * data.keyword
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.selectList = function (data) {
        instance.Records = [];
        instance.Errors = [];

        instance.getController().selectList(data);
    };

    /**
     * Find and extract paged data objects by keyword from the specified URL .
     * 
     * data.uri
     * data.keyword
     * data.size
     * data.page
     * 
     * @param {type} data 
     * @returns {Array|Window.Records}
     */
    instance.find = function (data) {
        instance.Records = [];
        instance.Errors = [];

        instance.getController().find(data);
    };

    /**
     * Sends list request based on keyword related entities.
     * 
     * data.uri - Web resource identifier
     * data.keyword - Search keyword data value
     * callback - Callback function
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.list = function (data) {
        instance.Records = [];
        instance.Errors = [];

        instance.getController().list(data);
    };

    /**
     * Sends list all entities request.
     * 
     * data.uri - Web resource identifier
     * callback - Callback function
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.listAll = function (data) {
        instance.Records = [];
        instance.Errors = [];

        instance.getController().listAll(data);
    };

    /**
     * Create new entity object and process its response.
     * 
     * data.uri
     * data.content
     * 
     * @param {type} data 
     * @returns {Window.Record}
     */
    instance.create = function (data) {
        instance.Record = null;
        instance.Errors = [];

        instance.getController().create(data);
    };

    /**
     * Update existing entity object and process its response.
     * 
     * data.uri
     * data.content
     * 
     * @param {type} data 
     * @returns {Window.Record}
     */
    instance.update = function (data) {
        instance.Record = null;
        instance.Errors = [];

        instance.getController().update(data);
    };

    /**
     * Delete existing entity object and process its response.
     * 
     * data.uri
     * data.content
     * 
     * @param {type} data 
     * @returns {Window.Record}
     */
    instance.delete = function (data) {
        instance.Record = null;
        instance.Errors = [];

        instance.getController().delete(data);
    };

    /**
     * Results processor to extract and process record data in response to create,
     * update and delete function calls.
     * 
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.processRecord = function (eventData) {
        var result = eventData.result;

        if (result !== null && result !== undefined) {

            if (result.errors !== null && result.errors !== undefined) {

                if (Array.isArray(result.errors)) {
                    for (var i = 0; i < result.errors.length; i++) {

                        var item = result.errors[i];
                        if (item !== null && item !== undefined) {
                            instance.Errors.push({"errField": item.field, "errMessage": item.defaultMessage});
                        }
                    }

                    instance.notify({ 'event': 'errors.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': instance.Errors, 'code': result.code});
                } else {

                    instance.notify({ 'event': 'errors.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': result.errors, 'code': result.code});
                }

            } else {

                if (eventData.request === 'delete' && (eventData.target === null || eventData.target === undefined)) {

                    try {

                        //check if the content information was provided within the request data
                        if (eventData.data.contentType !== null && eventData.data.contentType !== undefined) {
                            //if content information exists then take this information to construct
                            //new typed object

                            //instance.Record = options.contentType.newObject((typeof (eventData.data.content) === "string") ? JSON.parse(eventData.data.content) : eventData.data.content);

                            instance.Record = eventData.data.contentType.newObject((typeof (eventData.data.content) === "string") ? JSON.parse(eventData.data.content) : eventData.data.content);
                        }
                        else {

                            //if content information was not provided within the request then
                            //check for CRUDProcessor options for content information 

                            if (options.contentType !== null && options.contentType !== undefined) {
                                //if CRUDProcessor have content information then use this information
                                //to construct new typed content object.

                                //instance.Record = options.contentType.newObject(contentObject);
                                instance.Record = options.contentType.newObject((typeof (eventData.data.content) === "string") ? JSON.parse(eventData.data.content) : eventData.data.content);

                            } else {
                                //if content information is not provided within request or within
                                //CRUDProcessor then just the new object as it is.

                                //instance.Record = contentObject;
                                instance.Record = (typeof (eventData.data.content) === "string") ? JSON.parse(eventData.data.content) : eventData.data.content;
                            }
                        }
                    }
                    catch (e) {

                        instance.notify({ 'event': 'errors.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': 'Exception occured during content processing.', 'code': result.code });
                    }

                    instance.notify({ 'event': 'record.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': instance.Record, 'code': result.code });

                } else {

                    var objectReady = false;
                    var contentObject = (result.contents !== null && result.contents !== undefined) ? result.contents : ((result.contents === null || result.contents === undefined) ? null : result);

                    if (contentObject !== null && contentObject !== undefined) {

                        try {

                            if (typeof (contentObject) === "object") {
                                objectReady = true;
                            } else {
                                JSON.parse(contentObject);
                                objectReady = true;
                            }

                        } catch (e) { }

                        try {

                            //if returned result is object ready only then construct typed objects
                            if (objectReady) {

                                //check if the content information was provided within the request data
                                if (eventData.data.contentType !== null && eventData.data.contentType !== undefined) {
                                    //if content information exists then take this information to construct
                                    //new typed object

                                    instance.Record = eventData.data.contentType.newObject(contentObject);
                                }
                                else {

                                    //if content information was not provided within the request then
                                    //check for CRUDProcessor options for content information 

                                    if (options.contentType !== null && options.contentType !== undefined) {
                                        //if CRUDProcessor have content information then use this information
                                        //to construct new typed content object.

                                        instance.Record = options.contentType.newObject(contentObject);

                                    } else {
                                        //if content information is not provided within request or within
                                        //CRUDProcessor then just the new object as it is.

                                        instance.Record = contentObject;
                                    }
                                }

                            } else {

                                //if returned result is not object ready then return reply as it is.

                                instance.Record = contentObject;
                            }
                        }
                        catch (e) {

                            instance.notify({ 'event': 'errors.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': 'Exception occured during content processing.', 'code': result.code });
                        }

                        instance.notify({ 'event': 'record.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': instance.Record, 'code': result.code });

                    } else {

                        instance.notify({ 'event': 'record.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': contentObject, 'code': result.code });
                    }
                }
            }
        }
    };

    /**
     * Results processor to extract and process records in response to find and
     * select calls.
     * 
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.processRecords = function (eventData) {
        var result = eventData.result;

        if (result.errors !== null && result.errors !== undefined) {

            if (Array.isArray(result.errors)) {
                for (var i = 0; i < result.errors.length; i++) {

                    var item = result.errors[i];
                    if (item !== null && item !== undefined) {
                        instance.Errors.push({"errField": item.field, "errMessage": item.defaultMessage});
                    }
                }

                instance.notify({ 'event': 'errors.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': instance.Errors, 'code': result.code});
            } else {

                instance.notify({ 'event': 'errors.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': result.errors, 'code': result.code});
            }

        } else {
            
            var contentArray = (result.contents !== null && result.contents !== undefined) ? result.contents : ((result.contents === null || result.contents === undefined) ? null : result);

            if (contentArray !== null && contentArray !== undefined) {

                for (var i = 0; i < contentArray.length; i++) {
                    var item = contentArray[i];
                    if (item !== null && item !== undefined) {

                        var objectReady = false;
                        try {
                            if (typeof (item) === "object") {
                                objectReady = true;
                            } else {
                                JSON.parse(item);
                                objectReady = true;
                            }
                        } catch (e) { }

                        try {

                            //if returned result is object ready only then construct typed objects
                            if (objectReady) {

                                //check if the content information was provided within the request data
                                if (eventData.data.contentType !== null && eventData.data.contentType !== undefined) {
                                    //if content information exists then take this information to construct
                                    //new typed object

                                    instance.Records.push(eventData.data.contentType.newObject(item));
                                }
                                else {

                                    //if content information was not provided within the request then
                                    //check for CRUDProcessor options for content information 

                                    if (options.contentType !== null && options.contentType !== undefined) {
                                        //if CRUDProcessor have content information then use this information
                                        //to construct new typed content object.

                                        instance.Records.push(options.contentType.newObject(item));
                                    } else {
                                        //if content information is not provided within request or within
                                        //CRUDProcessor then just the new object as it is.

                                        instance.Records.push(item);
                                    }
                                }

                            } else {

                                //if returned result is not object ready then return reply as it is.
                                instance.Records.push(item);
                            }
                        }
                        catch (e) {

                            instance.notify({ 'event': 'errors.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': 'Exception occured during content processing.', 'code': result.code });
                        }
                    }
                }

                instance.notify({ 'event': 'records.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': instance.Records, 'code': result.code });

            } else {

                instance.notify({ 'event': 'records.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': contentArray, 'code': result.code });
            }
        }
    };

    /**
     * Notify event subscribers with event information.
     * 
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.notify = function (eventData) {
        $(instance).trigger(eventData.event, eventData);
        if (instance.Key !== null && instance.Key !== undefined) {
            $(instance.Key).trigger(eventData.event, eventData);
        }
    };
    
    /**
     * Events and notifications subscriptions.
     * 
     * 
     * @returns {Boolean}
     */

    /**
     * Processes request before processing.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.beforeRequest = function (event, eventData) {
        instance.ProcessingState = {'event': event, 'triggerEvent': eventData};
        instance.ProcessingStatus = true;
    };

    /**
     * Processes request successful event.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.afterRequest = function (event, eventData) {
        instance.ProcessingState = {'event': event, 'triggerEvent': eventData};
        instance.ProcessingStatus = false;

        if (Array.isArray(eventData.result.contents)) {

            instance.processRecords(eventData);
        } else {

            instance.processRecord(eventData);
        }
    };

    /**
     * Processes request failure event.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.failRequest = function (event, eventData) {
        instance.ProcessingState = {'event': event, 'triggerEvent': eventData};
        instance.ProcessingStatus = false;

        instance.notify({'event': 'fail.processor.CRUD.WindnTrees', 'key': instance.Key, 'request': eventData.request, 'data': eventData.data, 'result': eventData.result});

    };

    /**
     * Subscribes on a CRUD controller event.
     * 
     * @param {type} event
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    instance.subscribeCRUDControllerEvent = function (event, callback) {

        $(instance.getController()).on(event, callback);
    };

    /**
     * Subscribes off a CRUD controller event.
     * 
     * @param {type} event
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    instance.unSubscribeCRUDControllerEvent = function (event, callback) {

        $(instance.getController()).off(event, callback);
    };

    /**
     * Subscribe CRUD/CRUDController events
     * 
     * @param {type} eventsInstance 
     * @returns {undefined}
     */
    instance.subscribeEvents = function (eventsInstance) {

        eventsInstance = (eventsInstance !== null && eventsInstance !== undefined) ? eventsInstance : instance;

        $(instance.getController()).on('before.request.CRUD.WindnTrees', eventsInstance.beforeRequest);
        $(instance.getController()).on('after.request.CRUD.WindnTrees', eventsInstance.afterRequest);
        $(instance.getController()).on('fail.request.CRUD.WindnTrees', eventsInstance.failRequest);
    };

    /**
     * Subscribe CRUD/CRUDController events
     * 
     * @param {type} eventsInstance 
     * @returns {undefined}
     */
    instance.unSubscribeEvents = function (eventsInstance) {

        eventsInstance = (eventsInstance !== null && eventsInstance !== undefined) ? eventsInstance : instance;

        $(instance.getController()).off('before.request.CRUD.WindnTrees', eventsInstance.beforeRequest);
        $(instance.getController()).off('after.request.CRUD.WindnTrees', eventsInstance.afterRequest);
        $(instance.getController()).off('fail.request.CRUD.WindnTrees', eventsInstance.failRequest);
    };

    instance.subscribeEvents();
}