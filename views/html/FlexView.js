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

/* global Util */

/**
 * FlexView presents list values in provided HTML format. This operates on a 
 * FlexObject record that contain information and its output or evaluation method.
 * FlexView extracts HTML, styling and content objects information from FlexObject 
 * and produces output as defined by evaluation function and result output.
 * FlexView is capable of extracting information from a remote 
 * web service using GET / POST calls and display using observer or by directly
 * writing into node's innerHTML content. In case of observer less scenario 
 * the type of content, content node and error node must be defined.
 * 
 * options.contentnode
 * options.errornode
 * 
 * options.uri - defines the address (unique resource identifier).
 * options.observer - view's own observer instance.
 * 
 * @param {type} options 
 * @returns {undefined}
 */
function FlexView(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'options': options});
    }
    
    //extend from object view
    var extOptions = Object.create(options);
    extOptions.instance = instance;
    extOptions.events = false;
    instance = ObjectView(extOptions);
    
    instance.FlexRecord = options.flexrecord;
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "FlexView";
    };
    
    /**
     * Gets content node value.
     * 
     * @returns {unresolved}
     */
    instance.getContentNode = function () {
        return instance.ContentNode;
    };
    
    /**
     * Gets record based on key value.
     * 
     * @param {type} key 
     * @returns {undefined}
     */
    instance.getFlex = function (key) {
        
        if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {
            instance.getObserverInterface().displayProcessingActivity();
        }

        //checks on key value if present then use the key value, otherwise get object key
        key = (key !== null && key !== undefined) ? key : ((instance.ObjectKey !== null && instance.ObjectKey !== undefined) ? instance.ObjectKey : key);

        instance.getCRUDProcessor().get({
            'uri': instance.URI,
            'request': 'flexget',
            'key': key
        });
    };
    
    /**
     * Gets record based on key value via post.
     * 
     * @param {type} key 
     * @returns {undefined}
     */
    instance.postFlex = function (key) {

        if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {
            instance.getObserverInterface().displayProcessingActivity();
        }

        //checks on key value if present then use the key value, otherwise get object key
        key = (key !== null && key !== undefined) ? key : ((instance.ObjectKey !== null && instance.ObjectKey !== undefined) ? instance.ObjectKey : key);

        instance.getCRUDProcessor().post({
            'uri': instance.URI,
            'request': 'flexpost',
            'key': key
        });
    };
    
    /**
     * Gets record based on key value.
     * 
     * @param {type} keyword
     * @returns {undefined}
     */
    instance.listFlex = function (keyword) {
        
        if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {
            instance.getObserverInterface().displayProcessingActivity();
        }

        //checks for keyword value if present then use the keyword value, otherwise observers keyword value
        keyword = (keyword !== null && keyword !== undefined) ? keyword : ((instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) ? instance.getObserverInterface().getKeyword() : keyword);

        instance.getCRUDProcessor().list({
            'uri': instance.URI,
            'method': 'GET',
            'request': 'flexlist',
            'keyword': keyword
        });
    };
    
    /**
     * Gets record based on key value via post.
     * 
     * @param {type} keyword
     * @returns {undefined}
     */
    instance.listFlexPost = function (keyword) {

        if (instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) {
            instance.getObserverInterface().displayProcessingActivity();
        }

        //checks for keyword value if present then use the keyword value, otherwise observers keyword value
        keyword = (keyword !== null && keyword !== undefined) ? keyword : ((instance.getObserverInterface() !== null && instance.getObserverInterface() !== undefined) ? instance.getObserverInterface().getKeyword() : keyword);

        instance.getCRUDProcessor().list({
            'uri': instance.URI,
            'request': 'flexlist',
            'keyword': keyword
        });
    };
    
    /**
     * Present view with input values and html format.
     * 
     * @param {type} options
     * @returns {String|TextView.present.htmlFormat}
     */
    instance.presentView = function (options) {
        
        var htmlFormat = "";
        
        //check for flexrecord
        var flexObject = instance.FlexRecord;
        
        //if get or post update is available then update flex object with returned
        //record
        if (instance.getCRUDProcessor().getRecord() !== null 
                && instance.getCRUDProcessor().getRecord() !== undefined) {
            
            //typed FlexObject returned by processed based on provided content information.
            flexObject = instance.getCRUDProcessor().getRecord();
        }
        
        if (flexObject !== null && flexObject !== undefined) {
            
            var flexOptions = Object.create(instance.newOptions());
            flexOptions.flexobject = flexObject;
            
            htmlFormat = Util().getFlexOutput(flexOptions);
        }
        
        return htmlFormat;
    };
    
    if (instance.getObserverInterface() !== null &&
            instance.getObserverInterface() !== undefined) {
        
        instance.getObserverInterface().getFlex = function (options) {
            instance.getFlex(options);
        };
        
        instance.getObserverInterface().postFlex = function (options) {
            instance.postFlex(options);
        };
        
        instance.getObserverInterface().listFlex = function (options) {
            instance.listFlex(options);
        };
        
        instance.getObserverInterface().listFlexPost = function (options) {
            instance.listFlexPost(options);
        };
        
        instance.getObserverInterface().presentView = function (options) {
            instance.presentView(options);
        };
    }
    
    if (instance.getObserverObject() !== null &&
            instance.getObserverObject() !== undefined) {
        
        instance.getObserverObject().getFlex = function (options) {
            instance.getFlex(options);
        };
        
        instance.getObserverObject().postFlex = function (options) {
            instance.postFlex(options);
        };
        
        instance.getObserverObject().listFlex = function (options) {
            instance.listFlex(options);
        };
        
        instance.getObserverObject().listFlexPost = function (options) {
            instance.listFlexPost(options);
        };
        
        instance.getObserverObject().presentView = function (options) {
            instance.presentView(options);
        };
    }
    
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

            var htmlErrorOutput = "An error has occured.";
            if (instance.getMessageRepository() !== null && instance.getMessageRepository() !== undefined) {
                htmlErrorOutput = instance.getMessageRepository().get("standard.err.text");
            }

            if ((instance.ErrorNode !== null && instance.ErrorNode !== undefined)
                    || (instance.contenNode !== null && instance.contenNode !== undefined)) {

                htmlErrorOutput = "";
                for (var i = 0; i < instance.getErrors().length; i++) {

                    htmlErrorOutput += (instance.getErrors()[i] + ". ");

                }
            }

            if (instance.ErrorNode !== null && instance.ErrorNode !== undefined) {

                instance.ErrorNode.innerHTML = htmlErrorOutput;

            } else if (instance.ContentNode !== null && instance.ContentNode !== undefined) {

                instance.ContentNode.innerHtml = htmlErrorOutput;

            } else {

                if (instance.getObserverInterface() !== null
                        && instance.getObserverInterface() !== undefined) {
                    
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

        if (eventData.data.callback !== null &&
                eventData.data.callback !== undefined) {

            eventData.data.callback(eventData.result);
        } else {

            if (instance.ContentNode !== null && instance.ContentNode !== undefined) {

                instance.ContentNode.innerHTML = instance.presentView();

            } else {

                if (instance.getObserverInterface() !== null
                        && instance.getObserverInterface() !== undefined) {
                    
                    if (instance.getObserverInterface().getType() === "ListObserver" ||
                            instance.getObserverInterface().getType() === "ListKNObserver") {
                        
                        instance.getObserverInterface().displaySuccessActivity();
                        instance.getObserverInterface().updateItem({'object': instance});
                        
                    } else if (instance.getObserverInterface().getType() === "ObjectObserver" ||
                            instance.getObserverInterface().getType() === "ObjectKNObserver") {

                        instance.getObserverInterface().displaySuccessActivity();

                        instance.getObserverInterface().setObject({'content': instance.presentView()});

                    } else {

                        instance.getObserverInterface().setRecord({'content': instance.presentView()});
                    }
                }
            }
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
            
            var htmlErrorOutput = "An error has occured.";
            if (instance.getMessageRepository() !== null && instance.getMessageRepository() !== undefined) {
                htmlErrorOutput = instance.getMessageRepository().get("standard.err.text");
            }
            
            if (instance.ErrorNode !== null && instance.ErrorNode !== undefined) {
                
                instance.ErrorNode.innerHTML = htmlErrorOutput;
                
            } else if (instance.ContentNode !== null && instance.ContentNode !== undefined) {

                instance.ContentNode.innerHtml = htmlErrorOutput;
                
            } else {
                
                if (instance.getObserverInterface() !== null
                        && instance.getObserverInterface() !== undefined) {
                    
                    instance.getObserverInterface().displayFailureActivity();
                }
            }
        }
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
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}