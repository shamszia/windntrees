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
 * Interface definition to concrete entity observers. It provides independent 
 * (or generic) interface to underlying concrete observers.
 * 
 * data.observer - instance reference to interface / concrete observer.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function CRUDObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.observer !== null && options.observer !== undefined) {

        if (typeof (options.observer) === "string") {
            
            //select and initializes observer.
            if (options.observer === "kn") {
                instance.Observer = new CRUDKNObserver(options);
            }

        } else {
            
            //if observer is provided it is selected.
            instance.Observer = options.observer;
        }
    } else {
        
        //if observer is not provided a default observer is initialized and selected.
        instance.Observer = new CRUDKNObserver(options);
    }
    
    
    var findOptions = Object.create(options);
    findOptions.instance = instance;
    findOptions.observer = instance.Observer;
    instance = SearchObserver(findOptions);
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'newparameter': instance.Observer, 'options': options});
    }
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "CRUDObserver";
    };
    
    /**
     * Sets master key record in detail observer.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setMasterKeyRecord =  function(data) {
        instance.getObserver().setMasterKeyRecord(data);
    };
    
    /**
     * Gets master key record from detail observer.
     * 
     * @returns {unresolved}
     */
    instance.getMasterKeyRecord = function () {
        return instance.getObserver().getMasterKeyRecord();
    };
    
    /**
     * Gets observable master key record object.
     * 
     * @returns {unresolved}
     */
    instance.getObservableMasterKeyRecord = function () {
        return instance.getObserver().getObservableMasterKeyRecord();
    };
    
    /**
     * Sets form's edit mode (true / false). 
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setEditMode = function(data) {
        instance.getObserver().setEditMode(data);
    };
    
    /**
     * Gets form's edit mode.
     * 
     * @returns {unresolved}
     */
    instance.getEditMode = function() {
        return instance.getObserver().getEditMode();
    };
    
    /**
     * Gets observable edit mode object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableEditMode = function () {
        return instance.getObserver().getObservableEditMode();
    };
    
    /**
     * Sets form's new mode caption.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setNewModeCaption = function(data) {
        instance.getObserver().setNewModeCaption(data);
    };
    
    /**
     * Gets form's new mode caption.
     * 
     * @returns {unresolved}
     */
    instance.getNewModeCaption = function () {
        return instance.getObserver().getNewModeCaption();
    };
    
    /**
     * Gets observable new mode caption object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableNewModeCaption = function () {
        return instance.getObserver().getObservableNewModeCaption();
    };
    
    /**
     * Sets form's edit mode caption.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setEditModeCaption = function(data) {
        instance.getObserver().setEditModeCaption(data);
    };
    
    /**
     * Gets form's edit mode caption.
     * 
     * @returns {unresolved}
     */
    instance.getEditModeCaption = function () {
        return instance.getObserver().getEditModeCaption();
    };
    
    /**
     * Gets observable edit mode caption.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableEditModeCaption = function () {
        return instance.getObserver().getObservableEditModeCaption();
    };
    
    /**
     * Sets form observer object with optional original key.
     * 
     * data.content -  entity record
     * data.originalKey - original key.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setFormObject = function (data) {
        var record = null; var recordid = null; var recordtype = null;
        if (instance.getFormObject()._relatedrecord !== undefined) {
            record = instance.getFormObject()._relatedrecord;
        }
        if (instance.getFormObject()._relatedrecordid !== undefined) {
            recordid = instance.getFormObject()._relatedrecordid;
        }
        if (instance.getFormObject()._relatedrecordtype !== undefined) {
            recordtype = instance.getFormObject()._relatedrecordtype;
        }
        
        instance.getObserver().setFormObject(data);
        
        if (data.originalKey !== null && data.originalKey !== undefined) {
            instance.getObserver().getFormObject()._datakey = data.originalKey;
        }
        if (record !== null) {
            instance.getFormObject()._relatedrecord =  record;
        }
        if (recordid !== null) {
            instance.getFormObject()._relatedrecordid = recordid;
        }
        if (recordtype !== null) {
            instance.getFormObject()._relatedrecordtype = recordtype;
        }
    };
    
    /**
     * Gets form object.
     * 
     * @returns {unresolved}
     */
    instance.getFormObject = function() {
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
     * Gets form's JSON object.
     * 
     * @returns {unresolved}
     */
    instance.getFormStringifiedObject = function() {
        return instance.getObserver().getFormStringifiedObject();
    };
    
    /**
     * Gets form's JSON object.
     * 
     * @returns {unresolved}
     */
    instance.getFormJSONObject = function() {
        return instance.getObserver().getFormJSONObject();
    };
    
    /**
     * Resets selected record.
     * 
     * @returns {undefined}
     */
    instance.resetRecord = function () {
        instance.getObserver().setRecord(null);
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
     * @param {type} options 
     * 
     * @returns {undefined}
     */
    instance.resetForm = function (options) {
        var record = null; var recordid = null; var recordtype = null;
        if (instance.getFormObject()._relatedrecord !== undefined) {
            record = instance.getFormObject()._relatedrecord;
        }
        if (instance.getFormObject()._relatedrecordid !== undefined) {
            recordid = instance.getFormObject()._relatedrecordid;
        }
        if (instance.getFormObject()._relatedrecordtype !== undefined) {
            recordtype = instance.getFormObject()._relatedrecordtype;
        }

        instance.getObserver().resetForm(options);
        
        if (record !== null) {
            instance.getFormObject()._relatedrecord =  record;
        }
        if (recordid !== null) {
            instance.getFormObject()._relatedrecordid = recordid;
        }
        if (recordtype !== null) {
            instance.getFormObject()._relatedrecordtype = recordtype;
        }
    };

    /**
     * Resets form for editing based on the indexed record.
     * 
     * @param {type} index
     * @returns {undefined}
     */
    instance.resetFormForEditing = function (index) {
        var record = null; var recordid = null; var recordtype = null;
        if (instance.getFormObject()._relatedrecord !== undefined) {
            record = instance.getFormObject()._relatedrecord;
        }
        if (instance.getFormObject()._relatedrecordid !== undefined) {
            recordid = instance.getFormObject()._relatedrecordid;
        }
        if (instance.getFormObject()._relatedrecordtype !== undefined) {
            recordtype = instance.getFormObject()._relatedrecordtype;
        }
        
        instance.getObserver().resetFormForEditing(index);
        
        if (record !== null) {
            instance.getFormObject()._relatedrecord =  record;
        }
        if (recordid !== null) {
            instance.getFormObject()._relatedrecordid = recordid;
        }
        if (recordtype !== null) {
            instance.getFormObject()._relatedrecordtype = recordtype;
        }
    };

    /**
     * Resets form for editing based on the data record.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.resetFormForEditingByRecord = function (data) {
        var record = null; var recordid = null; var recordtype = null;
        if (instance.getFormObject()._relatedrecord !== undefined) {
            record = instance.getFormObject()._relatedrecord;
        }
        if (instance.getFormObject()._relatedrecordid !== undefined) {
            recordid = instance.getFormObject()._relatedrecordid;
        }
        if (instance.getFormObject()._relatedrecordtype !== undefined) {
            recordtype = instance.getFormObject()._relatedrecordtype;
        }
        
        instance.getObserver().resetFormForEditingByRecord(data);
        
        if (record !== null) {
            instance.getFormObject()._relatedrecord =  record;
        }
        if (recordid !== null) {
            instance.getFormObject()._relatedrecordid = recordid;
        }
        if (recordtype !== null) {
            instance.getFormObject()._relatedrecordtype = recordtype;
        }
    };

    /**
     * Updates new record and associated views.
     * 
     * data.record - entity records
     * data.order - 'first' or 'last'
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.updateNewRecordView = function (data) {
        instance.getObserver().updateNewRecordView(data);
    };

    /**
     * Updates existing record and associated views.
     * 
     * @param {type} record
     * @returns {undefined}
     */
    instance.updateExistingRecordView = function (record) {
        instance.getObserver().updateExistingRecordView(record);
    };

    /**
     * Updates deletion record and associated views.
     * 
     * @param {type} record
     * @returns {undefined}
     */
    instance.updateDeletionRecordView = function (record) {
        instance.getObserver().updateDeletionRecordView(record);
    };

    /**
     * Updates observer (data/views) with result record.
     * 
     * data.action - 'create', 'update' or 'delete'
     * data.responseError - response error (true / false)
     * data.responseErrorDetail - response error detail
     * data.inputError - input error (true / false)
     * data.inputErrors - list of input errors
     * data.resultRecord - resulted entity record
     * data.placement - 'first' or 'last'
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.updateView = function (data) {
        instance.getObserver().updateView(data);
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
};


