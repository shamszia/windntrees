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
 * SearchList is a flexible list of lists composed of (search or crud) views that
 * can load related or non-related list contents at run time.
 * 
 * options.uri
 * options.view - inheriting view
 * options.list - array of same level inner lists
 * 
 * @param {type} options
 * @returns {undefined}
 */
function SearchList(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'options': options});
    }
    
    /**
     * Inherits view functionlity based on the nature of view prodived. 
     * 
     * For example
     * 
     * CRUDView 
     * will inherit Find, Create, Update and Delete functions
     * 
     * while
     * 
     * SearchView 
     * will only inherit Find (Load/Fetch) functionality.
     */
    if (options.view !== null && options.view !== undefined) {
        instance = Object.create(options.view);
        instance.unSubscribeEvents();
    }
    
    /**
     * Sub-list views that will be used in runtime lists and their views 
     * construction in order.
     */
    instance.SubListViews = (options.sublistviews !== null && options.sublistviews !== undefined) ? options.sublistviews : [];

    instance.LoadState = true;
    
    /**
     * Gets the type of view.
     * 
     * @returns {undefined}
     */
    instance.getType = function () {
        
        if (options.view.getType() === 'CRUDView') {
            return 'CRUDList';
        } else if (options.view.getType() === 'SearchView') {
            return 'SearchList';
        }
    };
    
    /**
     * Gets sublists reference object.
     * 
     * @returns {Array|type.sublistviews}
     */
    instance.getSubListViews = function () {
        return instance.SubListViews;
    };
    
    /**
     * Creates new record based on form view object.
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
        var listView = null;
        var subViews = [];
        
        if (instance.SubListViews !== null && instance.SubListViews !== undefined) {
            if (instance.SubListViews.length > 0) {
                listView = instance.SubListViews[0];

                if (instance.SubListViews.length > 1) {                    
                    subViews = instance.SubListViews.slice(1,instance.SubListViews.length);
                }
            }
        }
        
        var newObserver = listView.getObserverInterface().newInstance();
        var newOptions =  { 'key': listView.Key,
            'uri': listView.URI,
            'observer': newObserver
        };
        
        var newRecord = instance.getObserverInterface().getFormStringifiedObject();
        var detailListObject = new SearchList({'view': listView.newInstance(newOptions), 'sublistviews': subViews});
        var detailObserver = new DetailObserver({'record': newRecord, 'detail': detailListObject});
        
        if (options === null || 
                options === undefined) {
            options = {'detailEntity': detailObserver};
        } else {
            options.detailEntity = detailObserver;
        }
        
        Object.getPrototypeOf(instance).create(options);
    };
    
    /**
    * Adds detail item in records list.
    * 
    * options.name - items or subitems array name within an entity 
    * object graph
    * 
    * options.data - new item to insert
    * options.order - 'first' or 'last'
    * 
    * @param {type} options 
    */
    instance.addDetailItem = function (options) {

        var parentObserverObject = instance.getObserverInterface().getSharedObject();
        var selectedRecord = parentObserverObject.getSelectedRecord();

        var newDetailRecord = instance.getObserverInterface().getContentTypeObject().newObject(instance.getObserverInterface().getFormJSONObject());

        var subitems = selectedRecord.get(options.subitems);

        if (subitems !== null && subitems !== undefined) {
            if (Array.isArray(subitems)) {
                if (options.order !== null && options.order !== undefined) {
                    if (options.order === 'first') {
                        subitems.splice(0, 0, newDetailRecord);
                    } else {
                        subitems.push(newDetailRecord);
                    }
                } else {
                    subitems.splice(0, 0, newDetailRecord);
                }
            }
        }

        selectedRecord[options.subitems](subitems);
        parentObserverObject.update({'content': selectedRecord, 'validate': true, 'resetForm': false, 'refObject': instance.getObserverObject(), 'refActions': ['resetForm', 'displayFormSuccessActivity']});
    };
    
    /**
     * Unloads the contents of list.
     * 
     * @returns {undefined}
     */
    instance.unload = function () {
        instance.getObserverInterface().setRecords([]);
        instance.getObserverInterface().displayClearActivity();
    };
    
    /**
     * Loads sublist for the selected record.
     * 
     * options.keyword
     * options.source
     * options.referencekey 
     * options.page
     * options.size
     * 
     * @param {type} options   
     * @returns {undefined}
     */
    instance.loadDetail = function (options) {
        
        if (options.index !== null && options.index !== undefined) {
            
            var recordIndex = 0;
            if (typeof(options.index) ===  'function') {
                recordIndex = options.index();
            } else {
                recordIndex = options.index;
            }
            
            var detailRecord = instance.getObserverInterface().getRecords()[recordIndex];
            
            detailRecord.getDetail().load(options);
        }
    };
    
    /**
     * Loads sublist for the selected record.
     * 
     * options.keyword
     * options.source
     * options.referencekey 
     * options.page
     * options.size
     * 
     * @param {type} options   
     * @returns {undefined}
     */
    instance.unloadDetail = function (options) {
        
        if (options.index !== null && options.index !== undefined) {
            
            var recordIndex = 0;
            if (typeof(options.index) ===  'function') {
                recordIndex = options.index();
            } else {
                recordIndex = options.index;
            }
            
            var detailRecord = instance.getObserverInterface().getRecords()[recordIndex];
            
            detailRecord.getDetail().unload();
        }
    };
    
    /**
     * Toggles between contents of a list from a list source.
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.toggleDetail = function (options) {

        if (options.index !== null && options.index !== undefined) {

            var recordIndex = 0;
            if (typeof (options.index) === 'function') {
                recordIndex = options.index();
            } else {
                recordIndex = options.index;
            }

            var detailRecord = instance.getObserverInterface().getRecords()[recordIndex];
            
            if (options.index !== null && options.index !== undefined) {
                instance.getObserverInterface().selectRecord({'index': options.index});
            }
            
            if (detailRecord.getDetail().LoadState) {
                options.keyword = instance.getObserverInterface().getKeyword();
                detailRecord.getDetail().list(options);
            } else {
                detailRecord.getDetail().unload();
            }

            detailRecord.getDetail().LoadState = !(detailRecord.getDetail().LoadState);
        }
    };
    
    /**
     * Compose record and detail file list objects.
     * 
     * @param {type} records
     * @returns {undefined}
     */
    instance.getRecordDetailList = function (records) {

        var recordLists = [];
        var listView = null;
        var subViews = [];

        if (instance.SubListViews !== null && instance.SubListViews !== undefined) {

            if (instance.SubListViews.length > 0) {
                listView = instance.SubListViews[0];

                if (instance.SubListViews.length > 1) {                    
                    subViews = instance.SubListViews.slice(1,instance.SubListViews.length);
                }
            }
        }

        if (records !== null && records !== undefined) {
            
            for (var i = 0; i < records.length; i++) {
                
                var newObserver = listView.getObserverInterface().newInstance();
                var newOptions =  { 
                    'key': listView.Key,
                    'uri': listView.URI,
                    'observer': newObserver,
                    'contextpath': listView.CRUDContextPath
                };
                
                var detailListObject = new SearchList({'view': listView.newInstance(newOptions), 'sublistviews': subViews});
                recordLists[i] = new DetailObserver({'record': records[i], 'detail': detailListObject});
            }
        }

        return recordLists;
    };
    
    if (instance.getObserverInterface() !== null &&
            instance.getObserverInterface() !== undefined) {
        
        /**
         * Gets view reference object.
         * 
         * @returns {SearchList}
         */
        instance.getObserverInterface().getView = function () {
            return instance;
        };
        
        /**
         * Gets sublists reference object.
         * 
         * @returns {Array|type.sublistviews}
         */
        instance.getObserverInterface().getSubListViews = function () {
            return instance.getSubListViews();
        };
        
        /**
         * Observer create function definition.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverInterface().create = function (options) {
            instance.create(options);
        };
        
        /**
         * Observer addDetailItem function definition.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverInterface().addDetailItem = function (options) {
            instance.addDetailItem(options);
        };
        
        /** 
         * Observer find function definition.
         * 
         * @param {type} page
         * @returns {undefined}
         */
        instance.getObserverInterface().list = function (page,fill) {
            instance.list(page,fill);
        };
        
        /**
         * Loads sublist for the selected record.
         * 
         * options.keyword
         * options.source
         * options.referencekey 
         * options.page
         * options.size
         * 
         * @param {type} options   
         * @returns {undefined}
         */
        instance.getObserverInterface().loadDetail = function (options) {
            instance.loadDetail(options);
        };
        
        /**
         * Unload/deselect records.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverInterface().unloadDetail = function (options) {
            instance.unloadDetail(options);
        };
        
        /**
         * Load/Unload or Select/Deselect detail list records.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverInterface().toggleDetail = function (options) {
            instance.toggleDetail(options);
        };
        
    }
    
    if (instance.getObserverObject() !== null &&
            instance.getObserverObject() !== undefined) {
        
        /**
         * Gets the find list view.
         * 
         * @returns {SearchList}
         */
        instance.getObserverObject().getView = function () {
            return instance;
        };
        
        /**
         * Gets sublists reference object.
         * 
         * @returns {Array|type.sublistviews}
         */
        instance.getObserverObject().getSubListViews = function () {
            return instance.getSubListViews();
        };
        
        /**
         * Observer create function definition.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverObject().create = function (options) {
            instance.create(options);
        };
        
        /**
         * Observer addDetailItem function definition.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverObject().addDetailItem = function (options) {
            instance.addDetailItem(options);
        };
        
        /** 
         * Observer find function definition.
         * 
         * @param {type} page
         * @returns {undefined}
         */
        instance.getObserverObject().list = function (page,fill) {
            instance.list(page,fill);
        };
        
        
        /**
         * Loads sublist for the selected record.
         * 
         * options.keyword
         * options.source
         * options.referencekey 
         * options.page
         * options.size
         * 
         * @param {type} options   
         * @returns {undefined}
         */
        instance.getObserverObject().loadDetail = function (options) {
            instance.loadDetail(options);
        };
        
        /**
         * Unload/deselect records.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverObject().unloadDetail = function (options) {
            instance.unloadDetail(options);
        };
        
        /**
         * Load/Unload or Select/Deselect detail list records.
         * 
         * @param {type} options 
         * @returns {undefined}
         */
        instance.getObserverObject().toggleDetail = function (options) {
            instance.toggleDetail(options);
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
            instance.getObserverInterface().displayClearActivity();
            instance.getObserverInterface().setErrors(instance.getErrors());
        }
    };

    /**
     * Multiple records processing and presenting event subscription.
     * 
     * @param {type} event
     * @param {type} eventData
     * @returns {undefined}
     */
    instance.presentRecords = function (event, eventData) {

        if (eventData.data.callback !== null &&
                eventData.data.callback !== undefined) {

            eventData.data.callback(eventData.result);
        } else {
            
            instance.getObserverInterface().displayProcessing(false);
            instance.getObserverInterface().displaySuccessActivity();
            
            if (eventData.data.fill !== null && eventData.data.fill !== undefined) {

                if (eventData.data.fill === 'continue') {
                    var currentList = instance.getObserverInterface().getCurrentList();
                    var existingRecords = instance.getObserverInterface().getRecords();
                    var newRecords = instance.getRecordDetailList(eventData.result);                    

                    if (eventData.data.page <= currentList) {
                        var listSize = instance.getObserverInterface().getListSize();
                        var listCount = instance.getObserverInterface().getRecords().length;

                        var startIndex = listSize * (eventData.data.page - 1);
                        startIndex = startIndex < 0 ? 0 : startIndex;
                        
                        var deleteCount = listCount - startIndex;
                        deleteCount = deleteCount < 0 ? 0 : deleteCount;

                        existingRecords.splice(startIndex, deleteCount);
                    }

                    for (var i = 0; i < newRecords.length; i++) {
                        existingRecords.push(newRecords[i]);
                    }

                    instance.getObserverInterface().setRecords(existingRecords);

                } else {
                    instance.getObserverInterface().setRecords(instance.getRecordDetailList(eventData.result));
                }

            } else {
                instance.getObserverInterface().setRecords(instance.getRecordDetailList(eventData.result));                
            }
            
            instance.getObserverInterface().composeNavigator({
                'currentList': eventData.data.page,
                'responseData': instance.getCRUDProcessor().responseData()
            });
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
            
            instance.getObserverInterface().displayFailureActivity();
        }
    };
    
    if (options.events !== null && options.events !== undefined) {
        if (options.events) {
            instance.subscribeEvents(instance);
        }
    } else {
        instance.subscribeEvents(instance);
    }
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}