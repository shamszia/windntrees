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
 * Interface definition to concrete find observers. It provides independent 
 * (or generic) interface to underlying concrete observers.
 * 
 * data.observer - instance reference to interface / concrete observer.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function SearchObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.observer !== null && options.observer !== undefined) {

        if (typeof (options.observer) === "string") {
            
            //select and initializes observer.
            if (options.observer === "kn") {
                instance.Observer = new SearchKNObserver(options);
            }

        } else {
            
            //if observer is provided it is selected.
            instance.Observer = options.observer;
        }
    } else {
        
        //if observer is not provided a default observer is initialized and selected.
        instance.Observer = new SearchKNObserver(options);
    }
    
    var activityOptions = Object.create(options);
    activityOptions.instance = instance;
    activityOptions.observer = instance.Observer;
    
    instance = ActivityObserver(activityOptions);
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'newparameter': instance.Observer, 'options': options});
    }
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "SearchObserver";
    };
    
    /**
     * Sets record.
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
     * Set observer records list with array object.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setRecords = function(data) {
        instance.getObserver().setRecords(data);
    };
    
    /**
     * Get records list from observer records.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getRecords = function() {
        return instance.getObserver().getRecords();
    };
    
    /**
     * Get records list from observer records.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getObservableRecords = function() {
        return instance.getObserver().getObservableRecords();
    };
    
    /**
     * Sets record count.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setRecordCount = function(data) {
        instance.getObserver().setRecordCount(data);
    };
    
    /**
     * Gets record count.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getRecordCount = function() {
        return instance.getObserver().getRecordCount();
    };
    
    /**
     * Gets record count.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableRecordCount = function() {
        return instance.getObserver().getObservableRecordCount();
    };
    
    /**
     * Sets selected record in detail observer.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setSelectedRecord = function (data) {
        instance.getObserver().setSelectedRecord(data);
    };
    
    /**
     * Gets selected record from detail observer.
     * 
     * @returns {unresolved}
     */
    instance.getSelectedRecord = function () {
        return instance.getObserver().getSelectedRecord();
    };
    
    /**
     * Gets observable selected record.
     * 
     * @returns {unresolved}
     */
    instance.getObservableSelectedRecord = function () {
        return instance.getObserver().getObservableSelectedRecord();
    };
    
    /**
     * Sets grid / list item current index.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setSelectedRecordIndex = function(data) {
        instance.getObserver().setSelectedRecordIndex(data);
    };
    
    /**
     * Gets grid / list item current index.
     * 
     * @returns {Number|indexValue}
     */
    instance.getSelectedRecordIndex = function () {
        return instance.getObserver().getSelectedRecordIndex();
    };
    
    /**
     * Gets observable selected record index.
     * 
     * @returns {Number|indexValue}
     */
    instance.getObservableSelectedRecordIndex = function () {
        return instance.getObserver().getObservableSelectedRecordIndex();
    };
    
    /**
     * Sets pagination view data object.
     * 
     * @param {type} navigator
     * @returns {undefined}
     */
    instance.setListNavigator = function (navigator) {
        instance.getObserver().setListNavigator(navigator);
    };
    
    /**
     * Gets grid / list pagination data view.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListNavigator = function () {
        return instance.getObserver().getListNavigator();
    };
    
    /**
     * Gets observable list navigator object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableListNavigator = function () {
        return instance.getObserver().getObservableListNavigator();
    };
    
    /**
     * Sets grid / list scroll size.
     * 
     * @param {type} data
     * @returns {undefined}
     */    
    instance.setListingScrollSize = function(data) {
        instance.getObserver().setListingScrollSize(data);
    };
    
    /**
     * Gets grid / list scroll size.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListingScrollSize = function () {
        return instance.getObserver().getListingScrollSize();
    };
    
    /**
     * Gets observable listing scroll size object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableListingScrollSize = function () {
        return instance.getObserver().getObservableListingScrollSize();
    };
    
    /**
     * Sets grid / list data page size.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setListSize = function(data) {
        instance.getObserver().setListSize(data);
    };
    
    /**
     * Gets grid / list data page size.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListSize = function () {
        return instance.getObserver().getListSize();
    };
    
    /**
     * Gets observable list size object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableListSize = function () {
        return instance.getObserver().getObservableListSize();
    };
    
    /**
     * Sets grid / list current page.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setCurrentList = function(data) {
        instance.getObserver().setCurrentList(data);
    };
    
    /**
     * Gets grid / list current page.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getCurrentList = function () {
        return instance.getObserver().getCurrentList();
    };

    /**
     * Sets list source.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setListSource = function (value) {
        instance.getObserver().setListSource(data);
    };

    /**
     * Gets list source.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListSource = function () {
        return instance.getObserver().getListSource();
    };
    
    /**
     * Gets observable current list object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableCurrentList = function () {
        return instance.getObserver().getObservableCurrentList();
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
    instance.getIndexedJSONObject = function(index) {
        return instance.getObserver().getIndexedJSONObject(index);
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @returns {unresolved}
     */
    instance.getSelectedStringifiedObject = function() {
        return instance.getObserver().getSelectedStringifiedObject();
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @returns {unresolved}
     */
    instance.getSelectedJSONObject = function() {
        return instance.getObserver().getSelectedJSONObject();
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @param {type} data
     * @returns {unresolved}
     */
    instance.getStringifiedObject = function(data) {
        return instance.getObserver().getStringifiedObject(data);
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @param {type} data
     * @returns {unresolved}
     */
    instance.getJSONObject = function(data) {
        return instance.getObserver().getJSONObject(data);
    };
    
    /**
     * Selects record.
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.selectRecord = function (options) {
        instance.getObserver().selectRecord(options);
    };

    /**
     * Resets list records, error list and record count views.
     * 
     * @returns {undefined}
     */
    instance.clearListRecordsView = function () {
        instance.getObserver().clearListRecordsView();
    };

    /**
     * Fills list records and associated views.
     * 
     * data.page - page number
     * data.responseData - response data
     * data.records - extracted records from response data
     * data.immediateRecords - immediate entity records
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.fillListRecordsView = function (data) {
        instance.getObserver().fillListRecordsView(data);
    };
    
    /**
     * Composes list navigator observable object based on records, total records
     * and current list.
     * 
     * options.responseData -
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.composeNavigator = function (options) {
        
        instance.getObserver().composeNavigator(options);
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
};


