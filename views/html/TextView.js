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
 * TextView presents subject and description values in provided html format 
 * and css styles. TextView is capable of extracting information from a remote 
 * web service using GET / POST calls and display using observer or by directly
 * writing into node's innerHTML content. In case of observer less scenario 
 * the type of content, content node and error node must be defined.
 * 
 * options.contentnode
 * options.errornode
 * 
 * options.subject
 * options.description
 * options.url
 * options.html
 * options.css
 * 
 * options.uri - defines the address (unique resource identifier).
 * options.observer - view's own observer instance.
 * 
 * @param {type} options 
 * @returns {undefined}
 */
function TextView(options) {
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
    
    //content fields
    instance.Subject = options.subject;
    instance.Description = options.description;
    instance.URL = options.url;
    instance.URLTitle = options.urltitle;
    instance.HTML = options.html;
    instance.CSS = options.css;
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "TextView";
    };
    
    /**
     * Gets subject.
     * 
     * @returns {TextView.subject}
     */
    instance.getSubject = function () {
        return instance.Subject;
    };
    
    /**
     * Sets subject value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setSubject = function (value) {
        instance.Subject = value;
    };
    
    /**
     * Gets description value.
     * 
     * @returns {TextView.description}
     */
    instance.getDescription = function () {
        return instance.Description;
    };
    
    /**
     * Sets description value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setDescription = function (value) {
        instance.Description = value;
    };
    
    /**
     * Gets URL value.
     * 
     * @returns {unresolved}
     */
    instance.getURL = function () {
        return instance.URL;
    };
    
    /**
     * Sets URL value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setURL = function (value) {
        instance.URL = value;
    };
    
    /**
     * Gets HTML value.
     * 
     * @returns {unresolved}
     */
    instance.getHTML = function () {
        return instance.HTML;
    };
    
    /**
     * Sets HTML value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setHTML = function (value) {
        instance.HTML = value;
    };
    
    /**
     * Gets CSS value.
     * 
     * @returns {unresolved}
     */
    instance.getCSS = function () {
        return instance.CSS;
    };
    
    /**
     * Sets CSS value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setCSS = function (value) {
        instance.CSS = value;
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
     * Present view with input values and html format.
     * 
     * @param {type} options
     * @returns {String|TextView.present.htmlFormat}
     */
    instance.presentView = function (options) {
        
        var htmlFormat = instance.HTML;
        
        if (options !== null && options !== undefined) {
            if (options.html !== null && options.html !== undefined) {

                htmlFormat = options.html;

            } else {

                if (options.link !== null && options.link !== undefined) {
                    if (options.link) {

                        htmlFormat = "<a class='cssValue' href='urlValue' title='urlTitleValue'>subjectValue</a>";
                        
                    }
                }
            }
        }

        htmlFormat = htmlFormat.replace(/cssValue/gi, Util().extractValue(instance.CSS, Util().extractValue(instance.newOptions().css, "")));
        htmlFormat = htmlFormat.replace(/urlValue/gi, Util().extractValue(instance.URL, Util().extractValue(instance.newOptions().url, "")));
        htmlFormat = htmlFormat.replace(/urlTitleValue/gi, Util().extractValue(instance.URLTitle, Util().extractValue(instance.newOptions().urltitle, "")));
        htmlFormat = htmlFormat.replace(/subjectValue/gi, Util().extractValue(instance.Subject, Util().extractValue(instance.newOptions().subject, "")));
        htmlFormat = htmlFormat.replace(/descriptionValue/gi, Util().extractValue(instance.Description, Util().extractValue(instance.newOptions().description, "")));
        
        return htmlFormat;
    };
    
    if (instance.getObserverInterface() !== null &&
            instance.getObserverInterface() !== undefined) {
        
        instance.getObserverInterface().getSubject = function () {
            instance.getSubject();
        };
        
        instance.getObserverInterface().setSubject = function (subject) {
            instance.setSubject(subject);
        };
        
        instance.getObserverInterface().getDescription = function () {
            instance.getDescription();
        };
        
        instance.getObserverInterface().setDescription = function (description) {
            instance.setDescription(description);
        };
        
        instance.getObserverInterface().getURL = function () {
            instance.getURL();
        };
        
        instance.getObserverInterface().setURL = function (url) {
            instance.setURL(url);
        };
        
        instance.getObserverInterface().getHtml = function () {
            instance.getHtml();
        };
        
        instance.getObserverInterface().setHtml = function (html) {
            instance.setHtml(html);
        };
        
        instance.getObserverInterface().presentView = function (options) {
            instance.presentView(options);
        };
    }
    
    if (instance.getObserverObject() !== null &&
            instance.getObserverObject() !== undefined) {
        
        instance.getObserverObject().getSubject = function () {
            instance.getSubject();
        };
        
        instance.getObserverObject().setSubject = function (subject) {
            instance.setSubject(subject);
        };
        
        instance.getObserverObject().getDescription = function () {
            instance.getDescription();
        };
        
        instance.getObserverObject().setDescription = function (description) {
            instance.setDescription(description);
        };
        
        instance.getObserverObject().getURL = function () {
            instance.getURL();
        };
        
        instance.getObserverObject().setURL = function (url) {
            instance.setURL(url);
        };
        
        instance.getObserverObject().getHtml = function () {
            instance.getHtml();
        };
        
        instance.getObserverObject().setHtml = function (html) {
            instance.setHtml(html);
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
            
            instance.Subject = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().subjectf, "subject")], instance.newOptions().subject);
            instance.Description = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().descriptionf, "description")], instance.newOptions().description);
            instance.URL = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().urlf, "url")], instance.newOptions().url);
            instance.URLTitle = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().urltitlef, "urltitle")], instance.newOptions().urltitle);
            instance.HTML = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().htmlf, "html")], instance.newOptions().html);
            instance.CSS = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().cssf, "css")], instance.newOptions().css);

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

        if (instance.getCRUDProcessor().getKey() !== null &&
                instance.getCRUDProcessor().getKey() !== undefined) {

            $('#' + instance.getCRUDProcessor().getKey()).on('errors.processor.CRUD.WindnTrees', eventsInstance.presentErrors);
            $('#' + instance.getCRUDProcessor().getKey()).on('record.processor.CRUD.WindnTrees', eventsInstance.presentRecord);
            $('#' + instance.getCRUDProcessor().getKey()).on('fail.processor.CRUD.WindnTrees', eventsInstance.presentFailRequest);
        }
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

        if (instance.getCRUDProcessor().getKey() !== null &&
                instance.getCRUDProcessor().getKey() !== undefined) {

            $('#' + instance.getCRUDProcessor().getKey()).off('errors.processor.CRUD.WindnTrees', eventsInstance.presentErrors);
            $('#' + instance.getCRUDProcessor().getKey()).off('record.processor.CRUD.WindnTrees', eventsInstance.presentRecord);
            $('#' + instance.getCRUDProcessor().getKey()).off('fail.processor.CRUD.WindnTrees', eventsInstance.presentFailRequest);
        }
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