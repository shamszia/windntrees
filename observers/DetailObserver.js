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
 * Generic and actual observer independent record detail observer that stores 
 * record and its detail item/list.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function DetailObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance , 'options': options});
    }
    
    if (options.observer !== null && options.observer !== undefined) {

        if (typeof (options.observer) === "string") {

            //select and initializes observer.
            if (options.observer === "kn") {
                
                instance.Observer = new DetailKNObserver(options);
            }

        } else {

            //if observer is provided it is selected.
            instance.Observer = options.observer;
        }
    } else {
        
        //if observer is not provided a default observer is initialized and selected.
        instance.Observer = new DetailKNObserver(options);
    }
    
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
        return "DetailObserver";
    };
    
    /**
     * Gets a new instance.
     * 
     * @returns {Function}
     */
    instance.newInstance = function() {
        return new (Object.getPrototypeOf(instance)).constructor(instance.getObserver().newInstance());
    };

    /**
     * Sets record and makes it observable.
     * 
     * @param {type} record
     * @returns {undefined}
     */
    instance.setRecord = function (record) {
        instance.getObserver().setRecord(record);
    };

    /**
     * Gets record.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getRecord = function () {
        return instance.getObserver().getRecord();
    };

    /**
     * Gets observable record.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableRecord = function () {
        return instance.getObserver().getObservableRecord();
    };

    /**
     * Sets detail and makes it observable.
     * 
     * @param {type} detail
     * @returns {undefined}
     */
    instance.setDetail = function (detail) {
        instance.getObserver().setDetail(detail);
    };

    /**
     * Gets detail.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getDetail = function () {
        return instance.getObserver().getDetail();
    };

    /**
     * Gets observable detail.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableDetail = function () {
        return instance.getObserver().getObservableDetail();
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}