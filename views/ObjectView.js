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
 * ObjectView provides observer independent data handling and communication 
 * capability using get (GET) and post (POST) calls to a hosted web service or
 * web API and is able to produce typed objects (contents) based on provided 
 * content object.
 * 
 * options.uri - defines the address (unique resource identifier).
 * options.observer - view's own observer instance.
 * 
 * @param {type} options 
 * @returns {undefined}
 */
function ObjectView(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'options': options});
    }
    
    instance.Name = options.name;
    instance.Title = options.title;
    instance.Options = options;
    instance.Key = options.key;
    instance.ObjectKey = options.objectkey;
    instance.KeyField = options.keyfield;
    instance.Objects = options.objects;
    instance.URI = options.uri;
    instance.ViewScope = options.viewscope;
    instance.ContentProcessor = null;
    instance.ContentType = options.contentType;
    instance.Observer = options.observer;
    instance.CRUDContextPath = options.contextpath;
    instance.MessageRepository = options.messages;
    instance.Fields = options.fields;
    instance.Views = options.views;
    instance.ListCounter = 0;
    instance.AuthorizationCode = options.authorizationCode
    
    //reference to document component node in DOM tree.
    instance.ContentNode = options.contentnode;
    instance.ErrorNode = options.errornode;
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "ObjectView";
    };
    
    /**
     * Sets CRUD user friendly name.
     * 
     * @param {type} name
     * @returns {undefined}
     */
    instance.setName = function (name) {
        instance.Name = name;
    };
    
    /**
     * Gets CRUD user friendly name.
     * 
     * @returns {type.name}
     */
    instance.getName = function () {
        return instance.Name;
    };
    
    /**
     * Sets CRUD title.
     * 
     * @param {type} title
     * @returns {undefined}
     */
    instance.setTitle = function (title) {
        instance.Title = title;
    };
    
    /**
     * Gets CRUD title.
     * 
     * @returns {type.title}
     */
    instance.getTitle = function() {
        return instance.Title;
    };
    
    /**
     * Get object options.
     * 
     * @returns {type}
     */
    instance.getOptions = function () {
        return instance.Options;
    };

    /**
     * Gets a view key.
     * 
     * @returns {type.key}
     */
    instance.getKey = function () {
        return instance.Key;
    };
    
    /**
     * Gets object key.
     * 
     * @returns {type.key}
     */
    instance.getObjectKey = function () {
        return instance.ObjectKey;
    };
    
    /**
     * Sets object key value.
     * 
     * @param {type} value 
     * @returns {type.key}
     */
    instance.setObjectKey = function (value) {
        instance.ObjectKey = value;
        
        instance.notify({ event: "objectKey.fields.view.CRUD.WindnTrees", value: value });
    };

    /**
     * Gets object key.
     * 
     * @returns {type.key}
     */
    instance.getKeyField = function () {
        return instance.KeyField;
    };

    /**
     * Sets object key value.
     * 
     * @param {type} value 
     * @returns {type.key}
     */
    instance.setKeyField = function (value) {
        instance.KeyField = value;

        instance.notify({ event: "keyField.fields.view.CRUD.WindnTrees", value: value });
    };
    
    /**
     * Sets reference objects.
     * 
     * @param {type} value 
     */
    instance.setObjects = function (value) {
        instance.Objects = value;
        instance.notify({event: "objects.fields.view.CRUD.WindnTrees", value: value});
    };
    
    /**
     * Gets reference objects.
     * 
     * @returns {type.key}
     */
    instance.getObjects = function () {
        return instance.Objects;
    };
    
    /**
     * Gets content value.
     * 
     * @returns {type.content}
     */
    instance.getContentType = function (){
        return instance.ContentType;
    };
    
    /**
     * Sets content value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setContentType = function (value) {
        instance.ContentType = value;

        instance.notify({ event: "contentType.fields.view.CRUD.WindnTrees", value: value });
    };

    /**
     * Gets authorization code.
     * 
     * @returns {type.AuthorizationCode}
     */
    instance.getAuthorizationCode = function () {
        return instance.AuthorizationCode;
    };

    /**
     * Sets authorization code.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setAuthorizationCode = function (value) {
        instance.AuthorizationCode = value;

        instance.notify({ event: "authorizationCode.fields.view.CRUD.WindnTrees", value: value });
    };

    /**
     * Reference function to CRUD controller.
     * 
     * @returns {CRUDProcessor}
     */
    instance.getCRUDProcessor = function () {
        if (instance.ContentProcessor === null) {
            
            if (instance.Observer !== null && instance.Observer !== undefined) {
                instance.ContentProcessor = new CRUDProcessor({ 'contentType': instance.Observer.getContentTypeObject() });
            } else {
                
                if (options.content !== null && options.content !== undefined) {
                    instance.ContentProcessor = new CRUDProcessor({ 'contentType': options.contentType });
                } else {
                    instance.ContentProcessor = new CRUDProcessor({ });
                }
            }
        }
        return instance.ContentProcessor;
    };

    /**
     * Gets URI.
     * 
     * @returns {Window.URI|CRUDView.URI}
     */
    instance.getURI = function () {
        return instance.URI;
    };

    /**
     * Sets view scope.
     * 
     * @param {type} value 
     * 
     * @returns {unresolved}
     */
    instance.setViewScope = function (value) {

        instance.ViewScope = value;
    };

    /**
     * Gets view scope.
     * 
     * @returns {unresolved}
     */
    instance.getViewScope = function () {

        return instance.ViewScope;
    };

    /**
     * Request processing status.
     * 
     * @returns {unresolved}
     */
    instance.processing = function () {
        return instance.getCRUDProcessor().processing();
    };

    /**
     * Reference function to CRUD controller response data.
     * 
     * @returns {Window.ResponseData|CRUDController.ResponseData|CRUDProcessor.getController.ResponseData|CRUDProcessor.ResponseData}
     */
    instance.responseData = function () {
        return instance.getCRUDProcessor().responseData();
    };

    /**
     * Reference function to CRUD controller to check for response error.
     * 
     * @returns {Boolean}
     */
    instance.isResponseError = function () {
        return instance.getCRUDProcessor().isResponseError();
    };

    /**
     * Reference function to CRUD controller response error.
     * 
     * @returns {CRUDProcessor.getController.ResponseError|CRUDProcessor.ResponseError|Window.ResponseError|CRUDController.ResponseError}
     */
    instance.responseError = function () {
        return instance.getCRUDProcessor().responseError();
    };

    /**
     * Reference function to check if there were input errors.
     * 
     * @returns {Boolean}
     */
    instance.isInputError = function () {
        return instance.getCRUDProcessor().isInputError();
    };

    /**
     * Reference function to extract input errors.
     * 
     * @returns {Array|Window.Errors}
     */
    instance.getErrors = function () {
        return instance.getCRUDProcessor().getErrors();
    };
    
    /**
     * Sets content node.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setContentNode = function (value) {
        instance.ContentNode = value;
    };
    
    /**
     * Gets error node value.
     * 
     * @returns {unresolved}
     */
    instance.getErrorNode = function () {
        return instance.ErrorNode;
    };
    
    /**
     * Sets error node.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setErrorNode = function (value) {
        instance.ErrorNode = value;
    };

    /**
     * Observer interface reference to the actual observer.
     * 
     * @returns {Window.Observer|CRUDView.Observer}
     */
    instance.getObserverInterface = function () {
        return instance.Observer;
    };

    /**
     * Synchronize or excute provided script within a specific context.
     * 
     * @param {type} options 
     * 
     * @returns {Window.Observer|CRUDView.Observer}
     */
    instance.synchronizeScript = function(options) {

        options = (options !== null && options !== undefined) ? options : {};

        if (options.script !== null && options.script !== undefined) {

            eval(options.script);
        }
    };

    /**
     * Gets view's actual underlying observer.
     * 
     * @param {type} options
     * 
     * @returns {unresolved}
     */
    instance.getObserverObject = function (options) {
        var observerInterface = instance.Observer;
        try {
            while (1) {
                observerInterface = observerInterface.getObserver();
            }
        } catch (e) {
        }

        return observerInterface;
    };
    
    /**
     * return content objects from simple objects array based on provided
     * prototype definition.
     * 
     * options.simpleObjects - array of simple objects
     * options.contentPrototype - concrete object prototype definition
     * 
     * @param {type} options
     * @returns {Array}
     */
    instance.getContentTypeObjects = function (options) {
        var entityObjects = [];
        if (options.simpleObjects !== null &&
                options.simpleObjects !== undefined) {
            if (Array.isArray(options.simpleObjects)) {
                for (var i = 0; i < options.simpleObjects.length; i++) {
                    if (options.contentPrototype !== null &&
                            options.contentPrototype !== undefined) {
                        entityObjects[i] = new options.contentPrototype.constructor(options.simpleObjects[i]);
                    } else {
                        entityObjects[i] = new (instance.getObserverInterface().getContentTypeObjectPrototype()).constructor(options.simpleObjects[i]);
                    }
                }
            } else {
                return new (instance.getObserverInterface().getContentTypeObjectPrototype()).constructor(options.simpleObjects);
            }
        }
        return entityObjects;
    };
    
    /**
     * Returns loaded context path.
     * 
     * @returns {type.contextpath}
     */
    instance.getContextPath = function () {
        return instance.CRUDContextPath;
    };
    
    /**
     * Gets message repository attached to observer.
     * 
     * @returns {type.messages}
     */
    instance.getMessageRepository = function() {
        return instance.MessageRepository;
    };


    /**
     * Gets instance list counter value.
     *
     */
    instance.getListCounter = function () {

        return instance.ListCounter;
    };

    /**
     * Sets referential views.
     * 
     * @param {type} views 
     * 
     * @returns {type.messages}
     */
    instance.setReferentialViews = function (views) {

        if (instance.Views !== null && instance.Views !== undefined) {

            if (instance.Views.getType !== null && instance.Views.getType !== undefined) {

                if (instance.Views.getType() === 'ListObserver' ||
                    instance.Views.getType() === 'ListKNObserver') {

                    instance.Views.fillList({ objects: views });

                } else if (instance.Views.getType() === 'ObjectObserver' ||
                    instance.Views.getType() === 'ObjectKNObserver') {

                    instance.Views.setObject(views);
                }
            }
        } else {

            instance.Views = views;
        }
    };

    /**
     * Gets referential views.
     * 
     * @returns {type.messages}
     */
    instance.getReferentialViews = function () {
        return instance.Views;
    };

    /**
     * Gets referential view based on key value.
     * 
     * @param {type} key 
     * 
     * @returns {type.messages}
     */
    instance.getReferentialView = function (key) {

        if (instance.Views !== null && instance.Views !== undefined) {

            //check if views are observer function constructs
            if (instance.Views.getType !== null && instance.Views.getType !== undefined) {

                if (instance.Views.getType() === 'ListObserver' ||
                    instance.Views.getType() === 'ListKNObserver') {

                    var result = instance.Views.getItem(key);

                    if (result !== null && result !== undefined) {

                        if (typeof (result) === "object") {

                            if (result.getType() !== null && result.getType() !== undefined) {

                                if (result.getType() === "ObjectObserver" ||
                                    result.getType() === "ObjectKNObserver") {

                                    return result.getObserverObject();
                                }
                            }
                            return result;
                        }
                    }
                    return result;;

                } else if (instance.Views.getType() === 'ObjectObserver' ||
                    instance.Views.getType() === 'ObjectKNObserver') {

                    return instance.Views.getObserverObject();
                }

                return instance.Views;

            } else {

                if (Array.isArray(instance.Views)) {

                    for (var i = 0; i < instance.Views.length; i++) {

                        if (instance.Views[i].getKey() === key) {

                            return instance.Views[i];
                        }
                    }

                } else {

                    return instance.Views;
                }
            }
        }
        return null;
    };
    
    /**
     * Gets the CRUD context path.
     * 
     * @returns {undefined}
     */
    instance.loadContextPath = function () {
        instance.getCRUDProcessor().getContextPath({'uri': instance.URI,
            'callback': function (result) {
                instance.CRUDContextPath = result;
            }
        });
    };

    /**
     * Clears (resets) observer records list and view.
     * 
     * @returns {undefined}
     */
    instance.clearRecord = function () {

        if (instance.getObserverInterface().getType() === "ObjectObserver" ||
                instance.getObserverInterface().getType() === "ObjectKNObserver") {

            instance.getObserverInterface().setObject({});

        } else {

            instance.getObserverInterface().setRecord({});
        }

        instance.getObserverInterface().displayProcessing(false);
    };
   
    /**
     * Gets record based on key value.
     * 
     * @param {type} key 
     * @returns {undefined}
     */
    instance.get = function (key) {
        
        if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {
            instance.getObserverInterface().displayProcessingActivity();
            instance.getObserverInterface().displayFormProcessingActivity();

        }

        if (typeof (key) === "object") {

            //update uri
            key.uri = (key.uri !== null && key.uri !== undefined) ? key.uri : instance.URI;
            instance.getCRUDProcessor().get(key);

        } else {

            instance.getCRUDProcessor().get({
                'uri': instance.URI,
                'key': (key !== null && key !== undefined) ? key : instance.getObjectKey()
            });
        }
    };
    
    /**
     * Gets record based on key value via post.
     * 
     * @param {type} key 
     * @returns {undefined}
     */
    instance.post = function (key) {

        if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {
            instance.getObserverInterface().displayProcessingActivity();
            instance.getObserverInterface().displayFormProcessingActivity();
        }

        if (typeof (key) === "object") {

            //update uri
            key.uri = (key.uri !== null && key.uri !== undefined) ? key.uri : instance.URI;
            instance.getCRUDProcessor().post(key);

        } else {

            instance.getCRUDProcessor().post({
                'uri': instance.URI,
                'key': (key !== null && key !== undefined) ? key : { 'key': instance.getObjectKey() }
            });
        }
    };

    /**
     * Loads view and related lists.
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.load = function (options) {

        instance.get(options);
        instance.LoadFields(options);
    };

    /**
     * Loads result and place it withing provided memory reference.
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.loadListResult = function (options) {

        try {

            if (options.uri !== null && options.uri !== undefined) {

                if (options.target !== null && options.target !== undefined) {

                    var uri = (options.uri !== null && options.uri !== undefined) ? options.uri : instance.getURI();
                    var keyword = (options.keyword !== null && options.keyword !== undefined) ? options.keyword : instance.getObserverInterface().getKeyword();

                    instance.ListCounter++;

                    new SearchView({
                        'uri': uri
                    }).listRequest({
                        'target': options.target,
                        'contentType': options.contentType,
                        'query': { "key": options.key, "keyword": keyword },
                        'callback': function (data) {

                            if (Array.isArray(data)) {

                                if (options.result !== null && options.result !== undefined) {

                                    for (var i = 0; i < data.length; i++) {

                                        options.result.push(new OptionItem(data[i][options.keyfield], data[i][options.valuefield]));
                                    }

                                } else {

                                    if (options.resultfield !== null && options.resultfield !== undefined) {

                                        var resultField = instance.getObserverObject()[options.resultfield];

                                        if (typeof (resultField) === "function") {

                                            resultField([]);
                                        }
                                        else {

                                            resultField = [];
                                        }

                                        for (var i = 0; i < data.length; i++) {

                                            if (options.contentType !== null && options.contentType !== undefined) {

                                                resultField.push(data[i]);
                                            }
                                            else {

                                                resultField.push(new OptionItem(data[i][options.keyfield], data[i][options.valuefield]));
                                            }
                                        }
                                    }
                                }
                            }
                            else {

                                if (options.result !== null && options.result !== undefined) {

                                    options.result = new OptionItem(data[options.keyfield], data[options.valuefield]);
                                }
                                else {

                                    if (options.resultfield !== null && options.resultfield !== undefined) {

                                        var resultField = instance.getObserverObject()[options.resultfield];

                                        if (typeof (resultField) === "function") {

                                            if (options.contentType !== null && options.contentType !== undefined) {

                                                resultField(data);
                                            }
                                            else {

                                                resultField(new OptionItem(data[options.keyfield], data[options.valuefield]));
                                            }

                                        } else {

                                            if (options.contentType !== null && options.contentType !== undefined) {

                                                resultField = data;
                                            }
                                            else {

                                                resultField = new OptionItem(data[options.keyfield], data[options.valuefield]);
                                            }
                                        }
                                    }
                                }
                            }

                            //if form and list fields are specified then update list with form field
                            if (options.formfield !== null && options.formfield !== undefined) {

                                if (instance.getObserverObject().getFormObject() !== null && instance.getObserverObject().getFormObject() !== undefined) {

                                    if (instance.getObserverObject().getFormObject()[options.formfield] !== null && instance.getObserverObject().getFormObject()[options.formfield] !== undefined) {

                                        if (typeof (instance.getObserverObject().getFormObject()[options.formfield]) === "function") {

                                            if (options.list !== null && options.list !== undefined) {

                                                if (instance.getObserverObject().getType() === "ObjectKNObserver" || instance.getObserverObject().getType() === "ObjectObserver") {

                                                    $(options.list).val(instance.getObserverObject().getInputObject()[options.formfield]());
                                                } else {

                                                    $(options.list).val(instance.getObserverObject().getFormObject()[options.formfield]());
                                                }
                                            } else {

                                                if (instance.getObserverObject().getType() === "ObjectKNObserver" || instance.getObserverObject().getType() === "ObjectObserver") {

                                                    $(options.resultfield).val(instance.getObserverObject().getInputObject()[options.formfield]());
                                                }
                                                else {

                                                    $(options.resultfield).val(instance.getObserverObject().getFormObject()[options.formfield]());
                                                }
                                            }
                                        }
                                        else {

                                            if (options.list !== null && options.list !== undefined) {

                                                if (instance.getObserverObject().getType() === "ObjectKNObserver" || instance.getObserverObject().getType() === "ObjectObserver") {

                                                    $(options.list).val(instance.getObserverObject().getInputObject()[options.formfield]);
                                                }
                                                else {

                                                    $(options.list).val(instance.getObserverObject().getFormObject()[options.formfield]);
                                                }

                                            } else {

                                                if (instance.getObserverObject().getType() === "ObjectKNObserver" || instance.getObserverObject().getType() === "ObjectObserver") {

                                                    $(options.resultfield).val(instance.getObserverObject().getInputObject()[options.formfield]);
                                                }
                                                else {

                                                    $(options.resultfield).val(instance.getObserverObject().getFormObject()[options.formfield]);
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                            instance.ListCounter--;
                            if (options.counterUpdate !== null && options.counterUpdate !== undefined) {

                                if (typeof (options.counterUpdate) === "function") {

                                    options.counterUpdate(instance.ListCounter);
                                }
                            }
                        }
                    });
                }
            }
        }
        catch (e) {

            console.log(e.message);
        }
    };

    /*
    * Format the content object time fields.
    */
    instance.formatContent = function (options) {

        //if update have time fields then format them in proper order.
        if (options.TimeFields !== null && options.TimeFields !== undefined) {

            //get form object
            var content = (options.content !== null && options.content !== undefined) ? options.content : instance.getObserverInterface().getFormObject();

            for (var i = 0; i < options.TimeFields.length; i++) {

                //for each time field format time value. If the time field is a function then evalute and format otherwise just format it.
                content[options.TimeFields[i]] = moment(typeof (content[options.TimeFields[i]]) === "function" ? content[options.TimeFields[i]]() : content[options.TimeFields[i]]).format('YYYY-MM-DD HH:mm:ss');
            }

            content = instance.getObserverInterface().getStringifiedObject(content);

        } else {

            content = (options.content === null || options.content === undefined) ? (instance.getObserverInterface().getFormStringifiedObject()) : instance.getObserverInterface().getStringifiedObject(options.content);
        }

        return content;
    }
    
    /**
     * Sends create, update and deletion record requests based on action and 
     * provided record.
     * 
     * options.action - create, update or delete
     * options.content - record object / instance
     * options.validate - true / false (validate form or not)
     * options.placement - 'first' or 'last'
     * callback - reference callback function
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.createOrUpdateOrDelete = function (options) {
        var formInputErrors = true;
        instance.getObserverInterface().setErrors([]);
        
        if (options.validate !== null && options.validate !== undefined) {
            if (options.validate) {
                if (options.action === undefined) { //if action is not defined then consider a 'create' action

                    if (options.refObject !== null && options.refObject !== undefined) {
                        formInputErrors = options.refObject.validateFormObject();
                    } else {
                        formInputErrors = instance.getObserverInterface().validateFormObject();
                    }

                } else {
                    if (options.action === 'create' || options.action === 'update') { //otherwise choose between actions

                        if (options.refObject !== null && options.refObject !== undefined) {
                            formInputErrors = options.refObject.validateFormObject();
                        } else {
                            formInputErrors = instance.getObserverInterface().validateFormObject();
                        }
                    }
                }
            }
        }

        if (formInputErrors) {
            instance.getObserverInterface().displayProcessingActivity();
            instance.getObserverInterface().displayFormProcessingActivity();
            
            options.uri = instance.URI;

            if (options.action === undefined) {
                instance.getCRUDProcessor().create(options);
            } else {
                
                if (options.action === 'create') {
                    instance.getCRUDProcessor().create(options);
                } else if (options.action === 'update') {
                    instance.getCRUDProcessor().update(options);
                } else if (options.action === 'delete') {
                    instance.getCRUDProcessor().delete(options);
                }
            }
        }
    };

    /**
     * Extend view related field by integrating observable field with observer object.
     * 
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.ExtendField = function (options) {

        options = (options !== null && options !== undefined) ? options : {};

        if (options.field !== null && options.field !== undefined) {

            //then if observer support available
            if (instance.getObserverObject() !== null && instance.getObserverObject() !== undefined) {

                //identity the type of observers group
                if (instance.getObserverObject().getObserversGroup() === "KN") {

                    if (options.objectType !== null && options.objectType !== undefined) {

                        if (options.objectType === "array") {

                            if (options.object !== null && options.object !== undefined) {

                                instance.getObserverObject()[options.field] = ko.observableArray(options.object);

                            } else {

                                instance.getObserverObject()[options.field] = ko.observableArray([]);
                            }
                        }
                        else {

                            if (options.object !== null && options.object !== undefined) {

                                instance.getObserverObject()[options.field] = ko.observable(options.object);

                            } else {

                                instance.getObserverObject()[options.field] = ko.observable();
                            }
                        }

                    }
                    else {

                        if (options.object !== null && options.object !== undefined) {

                            instance.getObserverObject()[options.field] = ko.observable(options.object);

                        } else {

                            instance.getObserverObject()[options.field] = ko.observable();
                        }
                    }
                }
            }
        }
    };

    /**
     * Extends view related fields by integrating field observables with observer object.
     * 
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.ExtendFields = function (options) {

        options = (options !== null && options !== undefined) ? options : {};

        var fieldsObject = (options.fields !== null && options.fields !== undefined) ? options.fields : instance.Fields;

        //if there are list views with the crud view.
        if (fieldsObject !== null && fieldsObject !== undefined) {

            //then if observer support available
            if (instance.getObserverObject() !== null && instance.getObserverObject() !== undefined) {

                //identity the type of observers group
                if (instance.getObserverObject().getObserversGroup() === "KN") {

                    //check if there multiple list views
                    if (Array.isArray(fieldsObject)) { 

                        //foreach list view
                        for (var i = 0; i < fieldsObject.length; i++) {

                            var listView = fieldsObject[i];

                            if (listView.field !== null && listView.field !== undefined) {

                                //if field is not extended already then extend list observer with field.
                                if (instance.getObserverObject()[listView.field] === null || instance.getObserverObject()[listView.field] === undefined) {

                                    if (listView.expectObjectResult !== null && listView.expectObjectResult !== undefined) {

                                        if (listView.expectObjectResult) {

                                            if (listView.intialObject !== null && listView.intialObject !== undefined) {

                                                instance.getObserverObject()[listView.field] = ko.observable(listView.intialObject);

                                            } else {

                                                instance.getObserverObject()[listView.field] = ko.observable();
                                            }

                                        } else {

                                            if (listView.intialObject !== null && listView.intialObject !== undefined) {

                                                instance.getObserverObject()[listView.field] = ko.observableArray(listView.intialObject);

                                            } else {
                                                instance.getObserverObject()[listView.field] = ko.observableArray([]);
                                            }
                                        }

                                    } else {

                                        if (listView.intialObject !== null && listView.intialObject !== undefined) {

                                            instance.getObserverObject()[listView.field] = ko.observableArray(listView.intialObject);

                                        } else {
                                            instance.getObserverObject()[listView.field] = ko.observableArray([]);
                                        }
                                    }
                                }
                            }

                            //if form object is provided within view field definition
                            if (listView.formObject !== null && listView.formObject !== undefined) {

                                //if list view (listView) content type (contentType) is defined
                                if (listView.contentType !== null && listView.contentType !== undefined) {

                                    //then extend observer object with form field and intitialize with provided content type.
                                    instance.getObserverObject()[listView.formObject] = ko.observable(new (Object.getPrototypeOf(listView.contentType)).constructor({}));
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * Loads view related fields consisting of either single object or array of objects
     * 
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.LoadFields = function (options) {

        options = (options !== null && options !== undefined) ? options : {};

        var fieldsObject = (options.fields !== null && options.fields !== undefined) ? options.fields : instance.Fields;

        //if there are list views within the crud view forming a composite view.
        if (fieldsObject !== null && fieldsObject !== undefined) {

            //then if observer support available
            if (instance.getObserverObject() !== null && instance.getObserverObject() !== undefined) {

                //identity the type of observers group
                if (instance.getObserverObject().getObserversGroup() === "KN") {

                    //check if there multiple list views
                    if (Array.isArray(fieldsObject)) {

                        //foreach list view
                        for (var i = 0; i < fieldsObject.length; i++) {

                            var listView = fieldsObject[i];

                            if (listView.field !== null && listView.field !== undefined) {

                                //if field is not extended already then extend list observer with field.
                                if (instance.getObserverObject()[listView.field] === null || instance.getObserverObject()[listView.field] === undefined) {

                                    if (listView.expectObjectResult !== null && listView.expectObjectResult !== undefined) {

                                        if (listView.expectObjectResult) {

                                            if (listView.intialObject !== null && listView.intialObject !== undefined) {

                                                instance.getObserverObject()[listView.field] = ko.observable(listView.intialObject);

                                            } else {

                                                instance.getObserverObject()[listView.field] = ko.observable();
                                            }
                                            
                                        } else {

                                            if (listView.intialObject !== null && listView.intialObject !== undefined) {

                                                instance.getObserverObject()[listView.field] = ko.observableArray(listView.intialObject);

                                            } else {
                                                instance.getObserverObject()[listView.field] = ko.observableArray([]);
                                            }
                                        }

                                    } else {


                                        if (listView.intialObject !== null && listView.intialObject !== undefined) {

                                            instance.getObserverObject()[listView.field] = ko.observableArray(listView.intialObject);

                                        } else {
                                            instance.getObserverObject()[listView.field] = ko.observableArray([]);
                                        }
                                    }
                                }
                            }
                        }

                        //field extension definition and contents loading within field are kept in different
                        //loops for performance and view integral purpose.
                        //if a composite view with list views is in process of loading with few fields yet to be defined
                        //then observer object and document binding effort will result in unddefined extended fields
                        //and to avoid this different loops are used.
                        //however, best approach toward composite view will to extend fields (ExtendLists) and then load views (LoadFields).

                        //foreach list view
                        for (var i = 0; i < fieldsObject.length; i++) {

                            var listView = fieldsObject[i];

                            new SearchView({
                                'uri': listView.uri
                            }).listRequest({
                                'target': listView.target,
                                'contentType': listView.contentType,
                                'query': listView.query,
                                'method': listView.method,
                                'scopeObject': { 'field': listView.field, 'key': listView.key, 'value': listView.value, 'contentType': listView.contentType, 'expectObjectResult': listView.expectObjectResult },
                                'callback': function (data) {

                                    instance.ProcessFieldResponse(data, this.scopeObject);
                                }
                            });
                        }

                    } else {

                        //if single list view then extend list observer with list field.

                        if (listView.field !== null && listView.field !== undefined) {

                            if (instance.getObserverObject()[fieldsObject.field] === null || instance.getObserverObject()[fieldsObject.field] === undefined) {

                                instance.getObserverObject()[fieldsObject.field] = ko.observableArray([]);
                            }
                        }
                        
                        new SearchView({
                            'uri': fieldsObject.uri
                        }).listRequest({
                            'target': fieldsObject.target,
                            'contentType': listView.contentType,
                            'query': listView.query,
                            'method': fieldsObject.method,
                            'scopeObject': { 'field': listView.field, 'key': listView.key, 'value': listView.value, 'contentType': listView.contentType },
                            'callback': function (data) {

                                instance.ProcessFieldResponse(data, this.scopeObject);
                            }
                        });
                    }
                }
            }
        }
    };

    /**
     * Processes and present field response.
     * 
     * 
     * @param {type} data
     * @param {type} scopeObject
     * 
     * @returns {undefined}
     */
    instance.ProcessFieldResponse = function (data, scopeObject) {

        if (data !== null && data !== undefined) {

            //if data result is array of objects
            if (Array.isArray(data)) {
                //then fill the extended field object with result objects.
                for (var i = 0; i < data.length; i++) {

                    if (scopeObject.contentType !== null && scopeObject.contentType !== undefined) {

                        if (scopeObject.field !== null && scopeObject.field !== undefined) {

                            if (instance.getObserverObject()[scopeObject.field] !== null && instance.getObserverObject()[scopeObject.field] !== undefined) {

                                instance.getObserverObject()[scopeObject.field].push(data[i]);
                            }

                        } else {

                            instance.getObserverObject().getRecords().push(data[i]);
                        }

                    } else {

                        if (scopeObject.field !== null && scopeObject.field !== undefined && scopeObject.value !== null && scopeObject.value !== undefined) {

                            if (instance.getObserverObject()[scopeObject.field] !== null && instance.getObserverObject()[scopeObject.field] !== undefined) {

                                instance.getObserverObject()[scopeObject.field].push(new OptionItem(data[i][scopeObject.key], data[i][scopeObject.value]));
                            }
                        }
                    }
                }
            } else {

                //if the result object is only a single record then fill the field object with result object.
                if (scopeObject.contentType !== null && scopeObject.contentType !== undefined) {

                    if (scopeObject.field !== null && scopeObject.field !== undefined) {

                        if (instance.getObserverObject()[scopeObject.field] !== null && instance.getObserverObject()[scopeObject.field] !== undefined) {

                            instance.getObserverObject()[scopeObject.field](data);
                        }
                    }
                } else {

                    if (scopeObject.field !== null && scopeObject.field !== undefined && scopeObject.value !== null && scopeObject.value !== undefined) {

                        if (instance.getObserverObject()[scopeObject.field] !== null && instance.getObserverObject()[scopeObject.field] !== undefined) {

                            instance.getObserverObject()[scopeObject.field](new OptionItem(data[scopeObject.key], data[scopeObject.value]));
                        }
                    }
                }
            }
        }

    };


    /**
     * Extends content type object with get, getKey and newObject.
     * 
     * 
     * @param {type} functionOptions
     * @returns {undefined}
     */
    instance.extendContentMethods = function (functionOptions) {

        var contentTypeObject = (functionOptions.contentType !== null && functionOptions.contentType !== undefined ? functionOptions.contentType : (options.contentType !== null && options.contentType !== undefined) ? options.contentType : (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined ? instance.getObserverInterface().getContentTypeObject() : null));

        /**
         * Extend content object with get, getKey and newObject functionalities.
         */
        if (contentTypeObject !== null && contentTypeObject !== undefined) {

            if (Object.getPrototypeOf(contentTypeObject).get === undefined) {

                Object.getPrototypeOf(contentTypeObject).get = function (name) {
                    var instance = this;
                    if (typeof (instance[name]) === "function") {
                        return instance[name]();
                    } else {
                        return instance[name];
                    }
                };
            }

            if (Object.getPrototypeOf(contentTypeObject).getKey === undefined) {

                Object.getPrototypeOf(contentTypeObject).getKey = function () {
                    var instance = this;
                    if (instance._datakey !== null && instance._datakey !== undefined) {
                        return instance._datakey;
                    }
                };
            }

            if (Object.getPrototypeOf(contentTypeObject).newObject === undefined) {

                Object.getPrototypeOf(contentTypeObject).newObject = function (data) {
                    return new (Object.getPrototypeOf(contentTypeObject)).constructor(data);
                };
            }
        }

        return contentTypeObject;
    };

    //extends content methods
    instance.ContentType = options.contentType = instance.extendContentMethods({});
    
    if (instance.getObserverInterface() !== null &&
            instance.getObserverInterface() !== undefined) {
        
        /**
        * Extends observer content object with get, getKey and newObject functionalities.
        */
        if (instance.getObserverInterface().getContentTypeObjectPrototype() !== null &&
                instance.getObserverInterface().getContentTypeObjectPrototype() !== undefined) {

            if (instance.getObserverInterface().getContentTypeObjectPrototype().get === undefined) {
                /**
                 * Extends relating (master) view's entity object with get function at 
                 * runtime.
                 * 
                 * Gets object data member by its reference name.
                 * 
                 * @param {type} name object data member propery name or field name.
                 */
                instance.getObserverInterface().getContentTypeObjectPrototype().get = function (name) {
                    var instance = this;
                    if (typeof (instance[name]) === "function") {
                        return instance[name]();
                    } else {
                        return instance[name];
                    }
                };
            }

            if (instance.getObserverInterface().getContentTypeObjectPrototype().getKey === undefined) {
                /**
                 * Extends relating master view's entity object with getkey function at 
                 * runtime.
                 * 
                 * Gets object data key (_datakey) data member.
                 * 
                 */
                instance.getObserverInterface().getContentTypeObjectPrototype().getKey = function () {
                    var instance = this;
                    if (instance._datakey !== null && instance._datakey !== undefined) {
                        return instance._datakey;
                    }
                };
            }

            if (instance.getObserverInterface().getContentTypeObjectPrototype().newObject === undefined) {
                /**
                 * Extends relating master view's entity object prototype with new
                 * object creation functionality of same type.
                 * 
                 * @param {type} data
                 * @returns {.Object@call;getPrototypeOf.newObject.entityObject}
                 */
                instance.getObserverInterface().getContentTypeObjectPrototype().newObject = function (data) {
                    return new (instance.getObserverInterface().getContentTypeObjectPrototype()).constructor(data);
                };
            }
        }
        
        /**
        * Returns loaded context path.
        * 
        * @returns {type.contextpath}
        */
        instance.getObserverInterface().getContextPath = function () {
            return instance.getContextPath();
        };
        
        /**
        * Gets the CRUD context path.
        * 
        * @returns {undefined}
        */
        instance.getObserverInterface().loadContextPath = function () {
            return instance.loadContextPath();
        };
        
        /**
         * Gets view
         * 
         * @returns {SearchView}
         */
        instance.getObserverInterface().getView = function () {
            return instance;
        };

        /** 
         * Observer view getType() function definition.
         * 
         * @param {type} options
         * @returns {undefined}
         */
        instance.getObserverInterface().getViewType = function (options) {
            return instance.getType();
        };
        
        /** 
         * Gets referential views.
         * 
         * @returns {undefined}
         */
        instance.getObserverInterface().getReferentialViews = function () {
            return instance.getReferentialViews();
        };
        
        /** 
         * Gets a referential view based on identification.
         * 
         * @param {type} key
         * @returns {undefined}
         */
        instance.getObserverInterface().getReferentialView = function (key) {
            return instance.getReferentialView(key);
        };
        
        /** 
         * Observer get function definition.
         * 
         * @param {type} key
         * @returns {undefined}
         */
        instance.getObserverInterface().get = function (key) {
            instance.get(key);
        };
        
        /** 
         * Observer post function definition.
         * 
         * @param {type} key
         * @returns {undefined}
         */
        instance.getObserverInterface().post = function (key) {
            instance.post(key);
        };

        /** 
         * Observer load function definition.
         * 
         * @param {type} options
         * @returns {undefined}
         */
        instance.getObserverInterface().load = function (options) {
            instance.load(options);
        };
    }
    
    if (instance.getObserverObject() !== null &&
            instance.getObserverObject() !== undefined) {
        
        /**
        * Returns loaded context path.
        * 
        * @returns {type.contextpath}
        */
        instance.getObserverObject().getContextPath = function () {
            return instance.getContextPath();
        };
        
        /**
        * Gets the CRUD context path.
        * 
        * @returns {undefined}
        */
        instance.getObserverObject().loadContextPath = function () {
            return instance.loadContextPath();
        };
        
        /**
         * Gets view.
         * 
         * @returns {SearchView}
         */
        instance.getObserverObject().getView = function () {
            return instance;
        };

        /** 
         * Observer view getType() function definition.
         * 
         * @param {type} options
         * @returns {undefined}
         */
        instance.getObserverObject().getViewType = function (options) {
            return instance.getType();
        };
        
        /** 
         * Gets referential views.
         * 
         * @returns {undefined}
         */
        instance.getObserverObject().getReferentialViews = function () {
            return instance.getReferentialViews();
        };
        
        /** 
         * Gets a referential view based on identification.
         * 
         * @param {type} key
         * @returns {undefined}
         */
        instance.getObserverObject().getReferentialView = function (key) {
            return instance.getReferentialView(key);
        };
        
        /** 
         * Observer get function definition.
         * 
         * @param {type} key
         * @returns {undefined}
         */
        instance.getObserverObject().get = function (key) {
            instance.get(key);
        };
        
        /** 
         * Observer post function definition.
         * 
         * @param {type} key
         * @returns {undefined}
         */
        instance.getObserverObject().post = function (key) {
            instance.post(key);
        };

        /** 
         * Observer load function definition.
         * 
         * @param {type} options
         * @returns {undefined}
         */
        instance.getObserverObject().load = function (options) {
            instance.load(options);
        };
    }

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
     * Error processing and presenting event subscription.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.presentErrors = function (event, eventData) {

        if (eventData.data.callback !== null &&
                eventData.data.callback !== undefined) {

            eventData.data.callback(eventData.result);
        } else {

            if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {

                if (eventData.data.messageType !== null && eventData.data.messageType !== undefined) {

                    if (eventData.data.messageType === 'brief') {

                        instance.getObserverInterface().displayFailed();

                    } else {

                        instance.getObserverInterface().displayClearActivity();
                        instance.getObserverInterface().setErrors(instance.getErrors());
                    }

                } else {

                    instance.getObserverInterface().displayClearActivity();
                    instance.getObserverInterface().setErrors(instance.getErrors());
                }
            }
        }
    };
    
    /**
     * Record processing and presenting event subscription.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.presentRecord = function (event, eventData) {

        eventData.event = "record.before.rendering.view.CRUD.WindnTrees";
        instance.notify(eventData);

        if (eventData !== null && eventData !== undefined) {

            if (eventData.code !== null && eventData.code !== undefined) {

                if (eventData.code.length > 0) {
                    instance.setAuthorizationCode(eventData.code);

                    if (eventData.data.codeField !== null && eventData.data.codeField !== undefined) {

                        $('[name=' + eventData.data.codeField + ']').val(eventData.code);
                    }
                    else {

                        $('[name=__RequestVerificationToken]').val(eventData.code);
                    }
                }
            }
        }

        if (eventData.data.callback !== null &&
                eventData.data.callback !== undefined) {

            eventData.observerType = "callback";
            eventData.data.callback(eventData.result);
        } else {

            if (instance.getObserverInterface() !== null 
                    && instance.getObserverInterface() !== undefined) {
                
                //attach observer type information within event
                eventData.observerType = instance.getObserverInterface().getType();

                if (instance.getObserverInterface().getType() === "ObjectObserver" ||
                        instance.getObserverInterface().getType() === "ObjectKNObserver") {

                    if (eventData.data.messageType !== null && eventData.data.messageType !== undefined) {

                        if (eventData.data.messageType === 'brief') {

                            instance.getObserverInterface().displaySaved();

                        } else {
                            instance.getObserverInterface().displaySuccessActivity();
                            instance.getObserverInterface().displayFormSuccessActivity();
                        }

                    } else {

                        instance.getObserverInterface().displaySuccessActivity();
                        instance.getObserverInterface().displayFormSuccessActivity();
                    }

                    //sets the output object with returned result value
                    instance.getObserverInterface().setObject(eventData.result);

                    //check if input object has to be set or not. 
                    if (eventData.data !== null && eventData.data !== undefined) {
                        
                        if (eventData.data.updateInputObject !== null && eventData.data.updateInputObject !== undefined) {
                            //if configuration is set for input object update then follow the configuration
                            //if input object is not required to be updated with returned result
                            //then set 'updateInputObject' to false value.
                            if (eventData.data.updateInputObject) {

                                if (eventData.result !== null && eventData.result !== undefined) {

                                    instance.getObserverObject().InputObject(eventData.result);

                                } else {

                                    instance.getObserverInterface().displayFormNoRecordActivity();
                                }
                            }
                        } else {
                            //else update the input object.

                            if (eventData.result !== null && eventData.result !== undefined) {

                                instance.getObserverObject().InputObject(eventData.result);

                            } else {

                                instance.getObserverInterface().displayFormNoRecordActivity();
                            }
                        }
                    } else {
                        //else update the input object.

                        if (eventData.result !== null && eventData.result !== undefined) {

                            instance.getObserverObject().InputObject(eventData.result);

                        } else {

                            instance.getObserverInterface().displayFormNoRecordActivity();
                        }
                    }
                } else {

                    if (eventData.result !== null && eventData.result !== undefined) {

                        instance.getObserverObject().InputObject(eventData.result);

                    } else {

                        instance.getObserverInterface().displayFormNoRecordActivity();
                    }
                }
            }

            eventData.event = "record.after.rendering.view.CRUD.WindnTrees";
            instance.notify(eventData);
        }
    };

    /**
     * Presents request failure.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.presentFailRequest = function (event, eventData) {
        
        if (eventData.data.callback !== null &&
                eventData.data.callback !== undefined) {

            eventData.data.callback(eventData.result);
        } else {
            
            if (instance.getObserverInterface() !== null 
                    && instance.getObserverInterface() !== undefined) {

                if (eventData.data.messageType !== null && eventData.data.messageType !== undefined) {

                    if (eventData.data.messageType === 'brief') {

                        instance.getObserverInterface().displayFailed();

                    } else {

                        instance.getObserverInterface().displayFailureActivity();
                    }

                } else {

                    instance.getObserverInterface().displayFailureActivity();
                }
            }
        }
    };

    /**
     * Subscribes on a CRUD processor event.
     * 
     * @param {type} event
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    instance.subscribeCRUDProcessorEvent = function (event, callback) {

        $(instance.getCRUDProcessor()).on(event, callback);
    };

    /**
     * Subscribes off a CRUD processor  event.
     * 
     * @param {type} event
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    instance.unSubscribeCRUDProcessorEvent = function (event, callback) {

        $(instance.getCRUDProcessor()).off(event, callback);
    };

    /**
     * Subscribes on a view event.
     * 
     * @param {type} event
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    instance.subscribeEvent = function (event, callback) {

        $(instance).on(event, callback);
    };

    /**
     * Subscribes off a view event.
     * 
     * @param {type} event
     * @param {type} callback
     * 
     * @returns {undefined}
     */
    instance.unSubscribeEvent = function (event, callback) {

        $(instance).off(event, callback);
    };

    /**
     * Subscribe CRUDProcessor events.
     * 
     * @param {type} eventsInstance 
     * @returns {undefined}
     */
    instance.subscribeEvents = function (eventsInstance) {
        eventsInstance = (eventsInstance !== null && eventsInstance !== undefined) ? eventsInstance : instance;
        
        $(instance.getCRUDProcessor()).on('errors.processor.CRUD.WindnTrees', eventsInstance.presentErrors);
        $(instance.getCRUDProcessor()).on('record.processor.CRUD.WindnTrees', eventsInstance.presentRecord);
        $(instance.getCRUDProcessor()).on('fail.processor.CRUD.WindnTrees', eventsInstance.presentFailRequest);

    };
    
    /**
     * Subscribe CRUDProcessor events.
     * 
     * @param {type} eventsInstance 
     * @returns {undefined}
     */
    instance.unSubscribeEvents = function (eventsInstance) {
        
        eventsInstance = (eventsInstance !== null && eventsInstance !== undefined) ? eventsInstance : instance;
        
        $(instance.getCRUDProcessor()).off('errors.processor.CRUD.WindnTrees', eventsInstance.presentErrors);
        $(instance.getCRUDProcessor()).off('record.processor.CRUD.WindnTrees', eventsInstance.presentRecord);
        $(instance.getCRUDProcessor()).off('fail.processor.CRUD.WindnTrees', eventsInstance.presentFailRequest);
    };
    
    if (options.events !== null && options.events !== undefined) {
        if (options.events) {
            instance.subscribeEvents();
        }
    } else {
        instance.subscribeEvents();
    }

    /**
     * Record processing and presenting event subscription.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.displayProgress = function (event, eventData) {

        if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {

            if (eventData !== null && eventData !== undefined) {

                if (eventData.result !== null && eventData.result !== undefined) {

                    instance.getObserverInterface().setRequestProgress(eventData.result);
                    instance.getObserverInterface().setFormResultMessage(eventData.result + "%");
                }
            }
        }
    };

    if (options.progressEvent !== null && options.progressEvent !== undefined) {

        if (options.progressEvent) {

            instance.getCRUDProcessor().subscribeCRUDControllerEvent('progress.request.CRUD.WindnTrees', instance.displayProgress);
        }
    }
    
    if (options.contextpath !== null && options.contextpath !== undefined) {
        if (options.contextpath === 'load') {
            instance.loadContextPath();
        }
    }
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}