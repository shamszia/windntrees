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

/* global Util */

/**
 * ImageView presents image, subject and description values in provided html 
 * format and css styles. ImageView is capable of extracting information from a 
 * remote web service using GET / POST calls and display using observer or by 
 * directly writing into node's innerHTML content. In case of observer less 
 * scenario the type of content, content node and error node must be defined.
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
 * options.imagename
 * options.imagepath
 * options.imagetitle
 * 
 * options.uri - defines the address (unique resource identifier).
 * options.observer - view's own observer instance.
 * 
 * @param {type} options 
 * @returns {undefined}
 */
function ImageView(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'options': options});
    }
    
    //extends from text view
    var extOptions = Object.create(options);
    extOptions.instance = instance;
    extOptions.events = false;
    instance = TextView(extOptions);
    
    instance.ImageName = options.imagename;
    instance.ImagePath = options.imagepath;
    instance.ImageTitle = options.imagetitle;
    instance.ImageWidth = options.imagewidth; // Horizontal dimension
    instance.ImageHeight = options.imageheight; // Vertical dimension
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "ImageView";
    };
    
    /**
     * Gets image name.
     * 
     * @returns {type.imageName}
     */
    instance.getImageName = function () {
        return instance.ImageName;
    };
    
    /**
     * Sets image name value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setImageName = function (value) {
        instance.ImageName = value;
    };
    
    /**
     * Gets image path.
     * 
     * @returns {type.imagePath}
     */
    instance.getImagePath = function () {
        return instance.ImagePath;
    };
    
    /**
     * Sets image path value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setImagePath = function (value) {
        instance.ImagePath = value;
    };
    
    /**
     * Gets image title.
     * 
     * @returns {type.imageTitle}
     */
    instance.getImageTitle = function () {
        return instance.ImageTitle;
    };
    
    /**
     * Sets image title value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setImageTitle = function (value) {
        instance.ImageTitle = value;
    };
    
    /**
     * Gets width value.
     * 
     * @returns {name}
     */
    instance.getImageWidth = function () {
        return instance.ImageWidth;
    };
    
    /**
     * Sets width value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setImageWidth = function (value) {
        instance.ImageWidth = value;
    };
    
    /**
     * Gets height value.
     * 
     * @returns {name}
     */
    instance.getImageHeight = function () {
        return instance.ImageHeight;
    };
    
    /**
     * Sets height value.
     * 
     * @param {type} value
     * @returns {undefined}
     */
    instance.setImageHeight = function (value) {
        instance.ImageHeight = value;
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

                        htmlFormat = "<a href='urlValue' title='urlTitleValue'><img alt='imageTitleValue' class='cssValue' src='imagePathValue' /></a><p>imageNameValue</p>";
                        
                    }
                }
            }
        }

        htmlFormat = htmlFormat.replace(/cssValue/gi, Util().extractValue(instance.CSS, Util().extractValue(instance.newOptions().css, "")));
        htmlFormat = htmlFormat.replace(/urlValue/gi, Util().extractValue(instance.URL, Util().extractValue(instance.newOptions().url, "")));
        htmlFormat = htmlFormat.replace(/urlTitleValue/gi, Util().extractValue(instance.URLTitle, Util().extractValue(instance.newOptions().urltitle, "")));
        htmlFormat = htmlFormat.replace(/subjectValue/gi, Util().extractValue(instance.Subject, Util().extractValue(instance.newOptions().subject, "")));
        htmlFormat = htmlFormat.replace(/descriptionValue/gi, Util().extractValue(instance.Description, Util().extractValue(instance.newOptions().description, "")));
        
        htmlFormat = htmlFormat.replace(/imageNameValue/gi, Util().extractValue(instance.ImageName, Util().extractValue(instance.newOptions().imagename, "")));
        htmlFormat = htmlFormat.replace(/imagePathValue/gi, Util().extractValue(instance.ImagePath, Util().extractValue(instance.newOptions().imagepath, "")));
        htmlFormat = htmlFormat.replace(/imageTitleValue/gi, Util().extractValue(instance.ImageTitle, Util().extractValue(instance.newOptions().imagetitle, "")));

        htmlFormat = htmlFormat.replace(/imageWidthValue/gi, (instance.ImageWidth !== null && instance.ImageWidth !== undefined) ? (instance.ImageWidth > 0 ? "width='" + instance.ImageWidth + "'" : "") : Util().extractValue(instance.newOptions().imagewidth, ""));
        htmlFormat = htmlFormat.replace(/imageHeightValue/gi, (instance.ImageHeight !== null && instance.ImageHeight !== undefined) ? (instance.ImageHeight > 0 ? "height='" + instance.ImageHeight + "'" : "") : Util().extractValue(instance.newOptions().imageheight, ""));

        return htmlFormat;
    };
    
    if (instance.getObserverInterface() !== null &&
            instance.getObserverInterface() !== undefined) {
        
        /**
     * Gets image name.
     * 
     * @returns {type.imageName}
     */
        instance.getObserverInterface().getImageName = function () {
            return instance.getImageName();
        };

        /**
         * Sets image name.
         * 
         * @param {type} name
         * @returns {undefined}
         */
        instance.getObserverInterface().setImageName = function (name) {
            instance.setImageName(name);
        };

        /**
         * Gets image path.
         * 
         * @returns {type.imagePath}
         */
        instance.getObserverInterface().getImagePath = function () {
            return instance.getImagePath();
        };

        /**
         * Sets image path.
         * 
         * @param {type} path
         * @returns {undefined}
         */
        instance.getObserverInterface().setImagePath = function (path) {
            instance.setImagePath(path);
        };

        /**
         * Gets image title.
         * 
         * @returns {type.imageTitle}
         */
        instance.getObserverInterface().getImageTitle = function () {
            return instance.getImageTitle();
        };

        /**
         * Sets image title.
         * 
         * @param {type} title
         * @returns {undefined}
         */
        instance.getObserverInterface().setImageTitle = function (title) {
            instance.setImageTitle(title);
        };
        
        /**
        * Present view with input values and html format.
        * 
        * @param {type} options
        * @returns {String|TextView.present.htmlFormat}
        */
        instance.getObserverInterface().presentView = function (options) {
            instance.presentView(options);
        };
    }
    
    if (instance.getObserverObject() !== null &&
            instance.getObserverObject() !== undefined) {
        
        /**
     * Gets image name.
     * 
     * @returns {type.imageName}
     */
        instance.getObserverObject().getImageName = function () {
            return instance.getImageName();
        };

        /**
         * Sets image name.
         * 
         * @param {type} name
         * @returns {undefined}
         */
        instance.getObserverObject().setImageName = function (name) {
            instance.setImageName(name);
        };

        /**
         * Gets image path.
         * 
         * @returns {type.imagePath}
         */
        instance.getObserverObject().getImagePath = function () {
            return instance.getImagePath();
        };

        /**
         * Sets image path.
         * 
         * @param {type} path
         * @returns {undefined}
         */
        instance.getObserverObject().setImagePath = function (path) {
            instance.setImagePath(path);
        };

        /**
         * Gets image title.
         * 
         * @returns {type.imageTitle}
         */
        instance.getObserverObject().getImageTitle = function () {
            return instance.getImageTitle();
        };

        /**
         * Sets image title.
         * 
         * @param {type} title
         * @returns {undefined}
         */
        instance.getObserverObject().setImageTitle = function (title) {
            instance.setImageTitle(title);
        };
        
        /**
        * Present view with input values and html format.
        * 
        * @param {type} options
        * @returns {String|TextView.present.htmlFormat}
        */
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

            instance.ImageName = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().imagenamef, "imageName")], instance.newOptions().imagename);
            instance.ImageTitle = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().imagetitlef, "imageTitle")], instance.newOptions().imagetitle);
            instance.ImagePath = ((instance.newOptions().contextpath !== null && instance.newOptions().contextpath !== undefined) ? instance.newOptions().contextpath : "") + Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().imagepathf, "imagePath")], instance.newOptions().imagepath);
            
            instance.ImageWidth = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().imagewidthf, "imageWidth")], instance.newOptions().imagewidth);
            instance.ImageHeight = Util().extractFieldValue(eventData.result[Util().extractValue(instance.newOptions().imageheightf, "imageHeight")], instance.newOptions().imageheight);
            
            if (instance.ContentNode !== null && instance.ContentNode !== undefined) {

                instance.ContentNode.innerHTML = instance.presentView();

            } else {
                
                if (instance.getObserverInterface().getType() === "ListObserver" ||
                        instance.getObserverInterface().getType() === "ListKNObserver") {

                    instance.getObserverInterface().displaySuccessActivity();
                    instance.getObserverInterface().updateItem({'object': instance});

                } else if (instance.getObserverInterface() !== null
                        && instance.getObserverInterface() !== undefined) {

                    if (instance.getObserverInterface().getType() === "ObjectObserver" ||
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