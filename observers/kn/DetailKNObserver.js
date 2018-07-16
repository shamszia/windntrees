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
 * Record detail observer that stores record and its detail item/list.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function DetailKNObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance , 'options': options});
    }

    instance.Record = ko.observable(options.record);
    instance.Detail = ko.observable(options.detail);
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "DetailKNObserver";
    };
    
    /**
     * Gets a new instance.
     * 
     * @returns {Function}
     */
    instance.newInstance = function() {
        return new (Object.getPrototypeOf(instance)).constructor(options);
    };

    /**
     * Sets record and makes it observable.
     * 
     * @param {type} record
     * @returns {undefined}
     */
    instance.setRecord = function (record) {
        instance.Record(record);
    };

    /**
     * Gets record.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getRecord = function () {
        return instance.Record();
    };

    /**
     * Gets observable record.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableRecord = function () {
        return instance.Record;
    };

    /**
     * Sets detail and makes it observable.
     * 
     * @param {type} detail
     * @returns {undefined}
     */
    instance.setDetail = function (detail) {
        instance.Detail(detail);
    };

    /**
     * Gets detail.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getDetail = function () {
        return instance.Detail();
    };

    /**
     * Gets observable detail.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableDetail = function () {
        return instance.Detail;
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}