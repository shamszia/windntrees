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
 * Concrete CRUD KO Observer that provide data and view synchronization based on
 * the provided entity object.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function SearchKNObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'options': options });
    }
    
    var activityOptions = Object.create(options);
    activityOptions.instance = instance;
    instance = ActivityKNObserver(activityOptions);
    
    //listactivity
    instance.Record = ko.observable(null);
    instance.Records = ko.observableArray([]);
    instance.RecordCount = ko.observable(0);
    instance.SelectedRecord = ko.observable(null);
    instance.SelectedRecordIndex = -1;

    instance.ListNavigator = ko.observable(new ListNavigator({ 'currentList': 1, 'listSize': 1, 'totalRecords': 0, 'scrollSize': 1, 'listsource': instance.ListSource }));
    instance.ListingScrollSize = ko.observable(5);
    instance.ListSize = ko.observable(10);
    instance.CurrentList = ko.observable(1);
    instance.ListSource = options.listsource;
    
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "SearchKNObserver";
    };
    
    /**
     * Sets record.
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
     * Set observer records list with array object.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setRecords = function(data) {
        instance.Records(data);
    };
    
    /**
     * Get records list from observer records.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getRecords = function() {
        return instance.Records();
    };
    
    /**
     * Get records list from observer records.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getObservableRecords = function() {
        return instance.Records;
    };
    
    /**
     * Sets record count.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setRecordCount = function(data) {
        instance.RecordCount(data);
    };
    
    /**
     * Gets record count.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getRecordCount = function() {
        return instance.RecordCount();
    };
    
    /**
     * Gets record count.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableRecordCount = function() {
        return instance.RecordCount;
    };
    
    /**
     * Sets selected record in detail observer.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setSelectedRecord = function (data) {
        instance.SelectedRecord(data);
    };
    
    /**
     * Gets selected record from detail observer.
     * 
     * @returns {unresolved}
     */
    instance.getSelectedRecord = function () {
        return instance.SelectedRecord();
    };
    
    /**
     * Gets observable selected record.
     * 
     * @returns {unresolved}
     */
    instance.getObservableSelectedRecord = function () {
        return instance.SelectedRecord;
    };
    
    /**
     * Sets grid / list item current index.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setSelectedRecordIndex = function(data) {
        instance.SelectedRecordIndex(data);
    };
    
    /**
     * Gets grid / list item current index.
     * 
     * @returns {Number|indexValue}
     */
    instance.getSelectedRecordIndex = function () {
        return instance.SelectedRecordIndex();
    };
    
    /**
     * Gets observable selected record index.
     * 
     * @returns {Number|indexValue}
     */
    instance.getObservableSelectedRecordIndex = function () {
        return instance.SelectedRecordIndex;
    };
    
    /**
     * Sets pagination view data object.
     * 
     * @param {type} navigator
     * @returns {undefined}
     */
    instance.setListNavigator = function (navigator) {
        instance.ListNavigator(navigator);
    };
    
    /**
     * Gets grid / list pagination data view.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListNavigator = function () {
        return instance.ListNavigator();
    };
    
    /**
     * Gets observable list navigator object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableListNavigator = function () {
        return instance.ListNavigator;
    };
    
    /**
     * Sets grid / list scroll size.
     * 
     * @param {type} data
     * @returns {undefined}
     */    
    instance.setListingScrollSize = function(data) {
        instance.ListingScrollSize(data);
    };
    
    /**
     * Gets grid / list scroll size.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListingScrollSize = function () {
        return instance.ListingScrollSize();
    };
    
    /**
     * Gets observable listing scroll size object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableListingScrollSize = function () {
        return instance.ListingScrollSize;
    };
    
    /**
     * Sets grid / list data page size.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setListSize = function(data) {
        instance.ListSize(data);
    };
    
    /**
     * Gets grid / list data page size.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListSize = function () {
        return instance.ListSize();
    };
    
    /**
     * Gets observable list size object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableListSize = function () {
        return instance.ListSize;
    };
    
    /**
     * Sets grid / list current page.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setCurrentList = function(data) {
        instance.CurrentList(data);
    };
    
    /**
     * Gets grid / list current page.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getCurrentList = function () {
        return instance.CurrentList();
    };

    /**
     * Sets list source.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setListSource = function (value) {
        instance.ListSource = value;
    };

    /**
     * Gets list source.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getListSource = function () {
        return instance.ListSource;
    };
    
    /**
     * Gets observable current list object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableCurrentList = function () {
        return instance.CurrentList;
    };
    
    /**
     * Gets indexed stringified JSON object.
     * 
     * @param {type} index 
     * @returns {unresolved}
     */
    instance.getIndexedStringifiedObject = function (index) {
        if (index === undefined) {
            if (instance.SelectedRecordIndex >= 0) {
                return ko.toJSON(instance.Records[instance.SelectedRecordIndex]);
            }
        } else {
            if (index >= 0) {
                return ko.toJSON(instance.Records[index]);
            }
        }
    };
    
    /**
     * Gets indexed JSON object.
     * 
     * @param {type} index 
     * @returns {unresolved}
     */
    instance.getIndexedJSONObject = function(index) {
        return JSON.parse(instance.getIndexedStringifiedObject(index));
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @returns {unresolved}
     */
    instance.getSelectedStringifiedObject = function() {
        return ko.toJSON(instance.SelectedRecord());
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @returns {unresolved}
     */
    instance.getSelectedJSONObject = function() {
        return JSON.parse(ko.toJSON(instance.SelectedRecord()));
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @param {type} data
     * @returns {unresolved}
     */
    instance.getStringifiedObject = function(data) {
        return ko.toJSON(data);
    };
    
    /**
     * Gets JSON object from provided immediate data object.
     * 
     * @param {type} data
     * @returns {unresolved}
     */
    instance.getJSONObject = function(data) {
        return JSON.parse(ko.toJSON(data));
    };
    
    /**
     * Select a record based on index value.
     * 
     * @param {type} options 
     * @returns {undefined}
     */
    instance.selectRecord = function (options) {
        
        var selectedRecord = null;
        if (options.index !== null && options.index !== undefined) {
            selectedRecord = instance.Records()[options.index];
        } else if (options.record !== null && options.record !== undefined) {
            selectedRecord = options.record;
        }
        
        if (selectedRecord.getType() === 'DetailKNObserver'
                || selectedRecord.getType() === 'DetailObserver') {
            
            instance.setRecord(selectedRecord.getRecord());
        } else {
            
            instance.setRecord(selectedRecord);
        }
    };
    
    /**
     * Resets list records, error list and record count views.
     * 
     * @returns {undefined}
     */
    instance.clearListRecordsView = function () {
        instance.Records([]);
        instance.Errors([]);
        instance.RecordCount(0);
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

        if (data.clearRecords !== null && data.clearRecords !== undefined) {
            if (data.clearRecords) {
                instance.clearListRecordsView();
            }
        } else {
            instance.clearListRecordsView();
        }
        
        if (data.records !== null && data.records !== undefined) {

            instance.Records(data.records);
        }

        if (data.immediateRecords !== null && data.immediateRecords !== undefined) {
            if (data.immediateRecords) {
                if (data.records !== null && data.records !== undefined) {
                    instance.RecordCount(data.records.length);
                    var pagesNavigator = new ListNavigator({ 'currentList': instance.CurrentList(), 'listSize': instance.ListSize(), 'totalRecords': data.records.length, 'scrollSize': instance.ListingScrollSize(), 'listsource': instance.ListSource });
                    instance.ListNavigator(pagesNavigator);
                    instance.CurrentList(data.page);

                    if (data.messageType !== null &&
                        data.messageType !== undefined) {

                        if (data.messageType === 'brief') {

                            instance.displaySaved();

                        } else {

                            instance.ResultMessage(instance.getMessageRepository().get("form.found.text") + " " + data.records.length + " " + instance.getMessageRepository().get("form.records.text") + " " + instance.getMessageRepository().get("form.displayingPage.text") + " " + instance.CurrentList() + " " + instance.getMessageRepository().get("form.of.text") + " " + instance.ListNavigator().calculateTotalPages() + " " + instance.getMessageRepository().get("form.totalPages.text"));
                        }
                    } else {

                        instance.ResultMessage(instance.getMessageRepository().get("form.found.text") + " " + data.records.length + " " + instance.getMessageRepository().get("form.records.text") + " " + instance.getMessageRepository().get("form.displayingPage.text") + " " + instance.CurrentList() + " " + instance.getMessageRepository().get("form.of.text") + " " + instance.ListNavigator().calculateTotalPages() + " " + instance.getMessageRepository().get("form.totalPages.text"));
                    }
                }
            }
        } else {
            
            //total, currentList, listSize
            data.responseData = typeof (data.responseData) === "string" ? JSON.parse(data.responseData) : data.responseData;

            if (data.responseData !== null && data.responseData !== undefined) {

                if (data.responseData.contents !== null && data.responseData.contents !== undefined) {

                    instance.RecordCount(data.responseData.total);
                    var pagesNavigator = new ListNavigator({ 'currentList': instance.CurrentList(), 'listSize': instance.ListSize(), 'totalRecords': data.responseData.total, 'scrollSize': instance.ListingScrollSize(), 'listsource': instance.ListSource});
                    instance.ListNavigator(pagesNavigator);
                    instance.CurrentList(data.page);

                    if (data.messageType !== null &&
                        data.messageType !== undefined) {

                        if (data.messageType === 'brief') {

                            instance.displaySaved();

                        } else {

                            instance.ResultMessage(instance.getMessageRepository().get("form.found.text") + " " + data.responseData.total + " " + instance.getMessageRepository().get("form.records.text") + " " + instance.getMessageRepository().get("form.displayingPage.text") + " " + instance.CurrentList() + " " + instance.getMessageRepository().get("form.of.text") + " " + instance.ListNavigator().calculateTotalPages() + " " + instance.getMessageRepository().get("form.totalPages.text"));
                        }
                    } else {

                        instance.ResultMessage(instance.getMessageRepository().get("form.found.text") + " " + data.responseData.total + " " + instance.getMessageRepository().get("form.records.text") + " " + instance.getMessageRepository().get("form.displayingPage.text") + " " + instance.CurrentList() + " " + instance.getMessageRepository().get("form.of.text") + " " + instance.ListNavigator().calculateTotalPages() + " " + instance.getMessageRepository().get("form.totalPages.text"));
                    }
                }
            }
        }
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
        
        if (options.responseData !== null && options.responseData !== undefined) {
            if (options.responseData.contents !== null && options.responseData.contents !== undefined) {
                
                instance.CurrentList(options.currentList);
                instance.RecordCount(options.responseData.total);

                var pagesNavigator = new ListNavigator({ 'currentList': instance.CurrentList(), 'listSize': instance.ListSize(), 'totalRecords': options.responseData.total, 'scrollSize': instance.ListingScrollSize(), 'listsource': instance.ListSource });
                instance.ListNavigator(pagesNavigator);
                instance.ResultMessage(instance.getMessageRepository().get("form.found.text") + " " + options.responseData.total + " " + instance.getMessageRepository().get("form.records.text") + " " + instance.getMessageRepository().get("form.displayingPage.text") + " " + instance.CurrentList() + " " + instance.getMessageRepository().get("form.of.text") + " " + instance.ListNavigator().calculateTotalPages() + " " + instance.getMessageRepository().get("form.totalPages.text"));
            }
        }
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
};


