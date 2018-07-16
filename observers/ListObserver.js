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
 * ListObserver provides concrete observer independent list objects, source and 
 * target view synchronization functionality for a particular list source.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function ListObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.observer !== null && options.observer !== undefined) {

        if (typeof (options.observer) === "string") {

            //select and initializes observer.
            if (options.observer === "kn") {
                
                instance.Observer = new ListKNObserver(options);
            }

        } else {

            //if observer is provided it is selected.
            instance.Observer = options.observer;
        }
    } else {
        
        //if observer is not provided a default observer is initialized and selected.
        instance.Observer = new ListKNObserver(options);
    }
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'newparameter': instance.Observer, 'options': options});
    }
    
    instance = extender.extendFieldObserver({ 'instance': instance,
        'field': 'List',
        'observer': instance.Observer });
    
    instance = extender.extendObserverInterface({'instance': instance,
        'observer': instance.Observer });
    
    //extend from activity observer
    instance = ActivityObserver({'instance': instance, 'observer': instance.Observer });
    
    /**
     * Gets the observer object.
     * 
     * @returns {type}
     */
    instance.getObserver = function () {
        return instance.Observer;
    };
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getObserverType = function () {
        return instance.getObserver().getType();
    };
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "ListObserver";
    };

    /**
     * Gets entity object.
     * 
     * @returns {Window.EntityObject|CRUDKNObserver.EntityObject}
     */
    instance.getListObject = function () {
        return instance.getObserver().getListObject();
    };

    /**
     * Gets entity object prototype.
     * 
     * @returns {type}
     */
    instance.getListObjectPrototype = function () {
        return instance.getObserver().getListObjectPrototype();
    };

    /**
     * Gets indexed stringified JSON object.
     * 
     * @param {type} index 
     * @returns {unresolved}
     */
    instance.getIndexedStringifiedObject = function (index) {
        return instance.getObserver().getIndexedStringifiedObject(index);
    };

    /**
     * Gets indexed JSON object.
     * 
     * @param {type} index 
     * @returns {unresolved}
     */
    instance.getIndexedJSONObject = function (index) {
        return instance.getObserver().getIndexedJSONObject(index);
    };

    /**
     * Empty/Clears the list.
     * 
     * @returns {undefined}
     */
    instance.clearList = function (readyStatus) {
        instance.getObserver().clearList(readyStatus);
    };

    /**
     * Fill list records.
     * 
     * data.objects - 
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.fillList = function (data, readyStatus) {
        instance.getObserver().fillList(data, readyStatus);
    };

    /**
     * Gets list ready status.
     * 
     * @returns {undefined}
     */
    instance.isListReady = function () {

        return instance.getObserver().isListReady();
    };

    /**
     * Sets list fill status to ready.
     * 
     * @returns {undefined}
     */
    instance.setListReady = function (status) {

        instance.getObserver().setListReady(status);
    };

    /**
     * Gets list item.
     * 
     * @param {type} key
     * 
     * @returns {undefined}
     */
    instance.getItem = function (key) {
        return instance.getObserver().getItem(key);
    };

    /**
     * Add new object item in list.
     * 
     * data.object - entity records
     * data.order - 'first' or 'last'
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.newItem = function (data) {
        instance.getObserver().newItem(data);
    };

    /**
     * Update existing list object.
     * 
     * @param {type} listObject
     * @returns {undefined}
     */
    instance.updateItem = function (listObject) {
        instance.getObserver().updateItem(listObject);
    };

    /**
     * Removes list object.
     * 
     * @param {type} listObject
     * @returns {undefined}
     */
    instance.removeItem = function (listObject) {
        instance.getObserver().removeItem(listObject);
    };

    /**
     * Updates list by adding, updating and removing list objects.
     * 
     * data.action - create / update / delete
     * data.objectItem - Return result (usually entity object)
     * data.placement - placement
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.update = function (data) {
        instance.getObserver().update(data);
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}