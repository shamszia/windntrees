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
 * NewView provides observer independent data handling and communication 
 * capability using get (GET), post (POST) and new (POST) calls to a hosted 
 * web service or web API and is able to produce typed objects (contents) 
 * based on provided content object. NewView extends functionality from 
 * ObjectView.
 * 
 * options.uri - defines the address (unique resource identifier).
 * options.observer - view's own observer instance.
 * 
 * @param {type} options 
 * @returns {undefined}
 */
function NewView(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'options': options});
    }
    
    //extend from object view
    var extOptions = Object.create(options);
    extOptions.instance = instance;
    instance = ObjectView(extOptions);
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "NewView";
    };
    
    /**
     * Sends new content request to the designated URI.
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
    instance.create = function (options) {
        options = (options === null || options === undefined) ? {} : options;
        options.action = 'create';

        //options.content = (options.content === null || options.content === undefined) ? (instance.getObserverInterface().getFormStringifiedObject()) : instance.getObserverInterface().getStringifiedObject(options.content);
        options.content = instance.formatContent(options);
        
        options.validate = (options.validate === null || options.validate === undefined) ? true : options.validate;
        options.placement = (options.placement === null || options.placement === undefined) ? 'first' : options.placement;
        instance.createOrUpdateOrDelete(options);
    };
    
    if (instance.getObserverInterface() !== null &&
            instance.getObserverInterface() !== undefined) {
        
        /** 
         * Observer create function definition.
         * 
         * @param {type} options
         * @returns {undefined}
         */
        instance.getObserverInterface().create = function (options) {
            instance.create(options);
        };
    }
    
    if (instance.getObserverObject() !== null &&
            instance.getObserverObject() !== undefined) {
        
        /** 
         * Observer create function definition.
         * 
         * @param {type} options
         * @returns {undefined}
         */
        instance.getObserverObject().create = function (options) {
            instance.create(options);
        };
    }
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}