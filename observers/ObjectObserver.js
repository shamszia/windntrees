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
 * ObjectObserver provides concrete observer independent data, statuses, messages 
 * and view synchronization functionality for a particular object source. 
 * 
 * @param {type} options
 * @returns {undefined}
 */
function ObjectObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    instance = extender.extendFieldObserver({ 'instance': instance, 'field': 'InputObject', 'observer': options.observer });
    instance = extender.extendFieldObserver({ 'instance': instance, 'field': 'OutputObject', 'observer': options.observer });
    
    if (options.observer !== null && options.observer !== undefined) {

        if (typeof (options.observer) === "string") {

            //select and initializes observer.
            if (options.observer === "kn") {
                
                instance.Observer = new ObjectKNObserver(options);
            }

        } else {

            //if observer is provided it is selected.
            instance.Observer = options.observer;
        }
    } else {
        
        //if observer is not provided a default observer is initialized and selected.
        instance.Observer = new ObjectKNObserver(options);
    }
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'newparameter': instance.Observer, 'options': options});
    }
    
    instance = extender.extendContentObserver({'instance': instance,
        'observer': instance.Observer
    });

    instance = extender.extendObserverInterface({'instance': instance,
        'observer': instance.Observer
    });
    
    //extend from activity observer
    instance = ActivityObserver({'instance': instance, 'observer': instance.Observer});
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "ObjectObserver";
    };

    /**
     * Sets form observer object with optional original key.
     * 
     * data.content
     * data.originalKey
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setFormObject = function (data) {

        instance.getObserver().setFormObject(data);
    };

    /**
     * Gets form object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getFormObject = function () {

        return instance.getObserver().getFormObject();
    };

    /**
     * Gets observable form object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableFormObject = function () {

        return instance.getObserver().getObservableFormObject();
    };

    /**
     * Gets form's stringified JSON object.
     * 
     * @returns {unresolved}
     */
    instance.getFormStringifiedObject = function () {

        return instance.getObserver().getFormStringifiedObject();
    };

    /**
     * Gets form's JSON object.
     * 
     * @returns {unresolved}
     */
    instance.getFormJSONObject = function () {

        return instance.getObserver().getFormJSONObject();
    };

    /**
     * Validate form object.
     * 
     * @returns {undefined}
     */
    instance.validateFormObject = function () {

        return instance.getObserver().validateFormObject();
    };

    /**
     * Resets form object and view mode.
     * 
     * @returns {undefined}
     */
    instance.resetForm = function () {

        instance.getObserver().resetForm();
    };

    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }

    return instance;
}