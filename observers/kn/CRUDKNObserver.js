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
 * Concrete CRUD KO Observer that provide data and view synchronization based on
 * the provided entity object.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function CRUDKNObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance , 'options': options});
    }
    
    var findOptions = Object.create(options);
    findOptions.instance = instance;
    instance = SearchKNObserver(findOptions);
    
    instance.NewModeCaption = ko.observable(instance.getMessageRepository().get("form.new.text"));
    instance.EditModeCaption = ko.observable(instance.getMessageRepository().get("form.edit.text"));
    instance.EditMode = ko.observable(false);
    instance.FormObject = ko.observable(new (Object.getPrototypeOf(instance.ContentType)).constructor({}));
    instance.MasterKeyRecord = ko.observable(null);

    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "CRUDKNObserver";
    };

    /**
     * Sets master key record in detail observer.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setMasterKeyRecord = function (data) {
        instance.MasterKeyRecord(data);
    };

    /**
     * Gets master key record from detail observer.
     * 
     * @returns {unresolved}
     */
    instance.getMasterKeyRecord = function () {
        return instance.MasterKeyRecord();
    };
    
    /**
     * Gets observable master key record object.
     * 
     * @returns {unresolved}
     */
    instance.getObservableMasterKeyRecord = function () {
        return instance.MasterKeyRecord;
    };
    
    /**
     * Sets form's edit mode (true / false). 
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setEditMode = function (data) {
        instance.EditMode(data);
    };

    /**
     * Gets form's edit mode.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getEditMode = function () {
        return instance.EditMode();
    };
    
    /**
     * Gets observable edit mode object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableEditMode = function () {
        return instance.EditMode;
    };

    /**
     * Sets form's new mode caption.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setNewModeCaption = function (data) {
        instance.NewModeCaption(data);
    };

    /**
     * Gets form's new mode caption.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getNewModeCaption = function () {
        return instance.NewModeCaption();
    };
    
    /**
     * Gets observable new mode caption object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableNewModeCaption = function () {
        return instance.NewModeCaption;
    };

    /**
     * Sets form's edit mode caption.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setEditModeCaption = function (data) {
        instance.EditModeCaption(data);
    };

    /**
     * Gets form's edit mode caption.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getEditModeCaption = function () {
        return instance.EditModeCaption();
    };
    
    /**
     * Gets observable edit mode caption.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableEditModeCaption = function () {
        return instance.EditModeCaption;
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
        var newObject = (data.content !== null && data.content !== undefined) ? data.content : data;
        instance.FormObject(newObject);
    };

    /**
     * Gets form object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getFormObject = function () {
        return instance.FormObject();
    };
    
    /**
     * Gets observable form object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableFormObject = function () {
        return instance.FormObject;
    };

    /**
     * Gets form's stringified JSON object.
     * 
     * @returns {unresolved}
     */
    instance.getFormStringifiedObject = function () {
        return ko.toJSON(instance.FormObject());
    };

    /**
     * Gets form's JSON object.
     * 
     * @returns {unresolved}
     */
    instance.getFormJSONObject = function () {
        return JSON.parse(ko.toJSON(instance.FormObject()));
    };
    
    /**
     * Resets selected record value.
     * 
     * @returns {undefined}
     */
    instance.resetRecord = function () {
        instance.setRecord(null);
    };

    /**
     * Validate form object.
     * 
     * @returns {undefined}
     */
    instance.validateFormObject = function () {
        var errors = ko.validation.group(instance.FormObject(), {deep: true});
        errors.showAllMessages();
        if (errors().length > 0) {
            alert(instance.getMessageRepository().get("standard.err.text"));
            return false;
        }
        return true;
    };

    /**
     * Synchronizes observer with view.
     * @param {type} options 
     * 
     * @returns {undefined}
     */
    instance.synchronizeView = function (options) {

        options = options === null || options === undefined ? {} : options;

        //set or define options.donotsync value to avoid observer / view synchronization
        if (options.donotsync === null || options.donotsync === undefined) {

            //select connected view
            var view = null;

            //if view is provided as part of synchronizing options then override with provided view
            if (options.view !== null && options.view !== undefined) {
                view = options.view;
            } else {
                view = instance.getView();
            }

            //check if observer is integrated with view
            if (view !== null && view !== undefined) {

                //check if view has key field value
                if (view.getObjectKey() !== null && view.getObjectKey() !== undefined) {

                    //if key object key (or referential key) exists then always extend form object with __referencekey field.
                    instance.FormObject()["__referencekey"] = view.getObjectKey();

                    //check if view has a key field
                    if (view.getKeyField() !== null && view.getKeyField() !== undefined) {

                        //if view has key field and related value information then check if the contentType form object supports view field

                        //if key field is a function then its observable and provide value as function argument.
                        if (typeof (instance.FormObject()[view.getKeyField()]) === "function") {

                            (instance.FormObject()[view.getKeyField()])(view.getObjectKey());

                        } else {

                            //if it is supported then update form field with object key value.
                            instance.FormObject()[view.getKeyField()] = view.getObjectKey();
                        }

                        var uploadForm = (options.form !== null && options.form !== undefined) ? options.form : "__uploadform";

                        if (document.forms[uploadForm] !== null && document.forms[uploadForm] !== undefined) {

                            if (document.forms[uploadForm][view.getKeyField()] !== null && document.forms[uploadForm][view.getKeyField()] !== undefined) {

                                document.forms[uploadForm][view.getKeyField()].value = view.getObjectKey();
                            }
                        }
                    }
                }
                
                if (view.getObjects() !== null && view.getObjects() !== undefined) {
                    
                    if (Array.isArray(view.getObjects())) {
                        
                        for (var i = 0; i < view.getObjects().length; i++) {
                            
                            var obj = view.getObjects()[i];
                            if (obj.field !== null && obj.field !== undefined) {
                                
                                //if object field is a function then its observable and provide value as function argument.
                                if (typeof (instance.FormObject()[obj.field]) === "function") {

                                    (instance.FormObject()[obj.field])(obj.object);

                                } else {

                                    //if it is not a function then set the value;
                                    instance.FormObject()[obj.field] = obj.object;
                                }
                            }
                        }
                        
                    } else {
                        
                        var obj = view.getObjects();
                        if (obj.field !== null && obj.field !== undefined) {

                            //if object field is a function then its observable and provide value as function argument.
                            if (typeof (instance.FormObject()[obj.field]) === "function") {

                                (instance.FormObject()[obj.field])(obj.object);

                            } else {

                                //if it is not a function then set the value;
                                instance.FormObject()[obj.field] = obj.object;
                            }
                        }
                    }
                }
            }
        }
    };

    /**
     * Resets form object and view mode.
     * 
     * @param {type} options
     * 
     * @returns {undefined}
     */
    instance.resetForm = function (options) {
        instance.displayFormClearActivity();
        instance.EditMode(false);
        instance.FormObject(new (instance.getContentTypeObjectPrototype()).constructor({}));
        
        if (options !== null && options !== undefined) {
            if (options.callback !== null && options.callback !== undefined) {

                if (typeof (options.callback) === "function") {

                    options.callback(options.callbackparams);
                }
            }
        }

        instance.synchronizeView(options);
    };

    /**
     * Resets form for editing based on the indexed record.
     * 
     * @param {type} index
     * @returns {undefined}
     */
    instance.resetFormForEditing = function (index) {
        instance.displayFormClearActivity();
        
        instance.EditMode(true);
        var indexValue = index();
        instance.SelectedRecordIndex = indexValue;

        var record = instance.Records()[indexValue];

        try {
            if (record.getType() === 'DetailObserver' ||
                    record.getType() === 'DetailKNObserver') {
                record = record.getRecord();
            }
        } catch (e) {
        }
        
        instance.FormObject(new (instance.getContentTypeObjectPrototype()).constructor(JSON.parse(ko.toJSON(record))));
    };

    /**
     * Resets form for editing based on the data record.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.resetFormForEditingByRecord = function (data) {
        instance.displayFormClearActivity();
        
        instance.EditMode(true);

        var record = data;

        try {

            if (data.getType() === 'DetailObserver' ||
                    data.getType() === 'DetailKNObserver') {
                record = record.getRecord();
            }

        } catch (e) {
        }

        instance.FormObject(new (instance.getContentTypeObjectPrototype()).constructor(JSON.parse(ko.toJSON(record))));
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
        
        if (data !== null && data !== undefined) {
            //if newly created record has request input infomration
            if (data.requestData !== null && data.requestData !== undefined) {
                // then reform form options with request input form information.
                // this information is important for reference key synchronization during 
                // a referential content form submission and preparing for new submission.
                data.form = data.requestData.form;
            }
        }

        instance.resetForm(data);

        if (data.record !== null && data.record !== undefined) {

            var newRecord = null;
            try {

                if (data.record.getType() === 'DetailObserver' ||
                        data.record.getType() === 'DetailKNObserver') {

                    newRecord = data.record;
                } else {
                    newRecord = new (instance.getContentTypeObjectPrototype()).constructor(JSON.parse(ko.toJSON(data.record)));
                }
            } catch (e) {
                newRecord = new (instance.getContentTypeObjectPrototype()).constructor(JSON.parse(ko.toJSON(data.record)));
            }

            if (data.order !== null && data.order !== undefined) {
                if (data.order === 'first') {
                    var oldRecords = instance.Records();
                    instance.Records([]);
                    instance.Records.push(newRecord);
                    for (var i = 0; i < oldRecords.length; i++) {
                        instance.Records.push(oldRecords[i]);
                    }
                } else {
                    instance.Records.push(newRecord);
                }
            } else {
                instance.Records.push(newRecord);
            }
        }

        instance.performRefObjectAction(data);
        $('.modal').trigger('apply-form-locale');
    };

    /**
     * Updates existing record and associated views.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.updateExistingRecordView = function (data) {
        instance.displaySuccessActivity();

        if (data.record !== null && data.record !== undefined) {

            data.record = new (instance.getContentTypeObjectPrototype()).constructor(JSON.parse(ko.toJSON(data.record)));

            for (var i = 0; i < instance.Records().length; i++) {
                var item = instance.Records()[i];
                var itemRecord = item;

                try {

                    if (itemRecord.getType() === 'DetailKNObserver' ||
                            itemRecord.getType() === 'DetailObserver') {

                        itemRecord = itemRecord.getRecord();

                        if (itemRecord.getKey() === data.record.getKey()) {

                            item.setRecord(data.record);
                        }

                    } else {
                        if (itemRecord.getKey() === data.record.getKey()) {
                            instance.Records.replace(item, data.record);
                        }

                    }

                } catch (e) {
                    if (itemRecord.getKey() === data.record.getKey()) {
                        instance.Records.replace(item, data.record);
                    }

                }
            }
        }
        
        if (data.resetForm !== null && data.resetForm !== undefined) {
            if (data.resetForm) {
                instance.FormObject(new (instance.getContentTypeObjectPrototype()).constructor({}));
                instance.EditMode(false);
                instance.displaySuccessActivity();
            }
        }
        
        instance.performRefObjectAction(data);

        $('.modal').trigger('apply-form-locale');
    };

    /**
     * Updates deletion record and associated views.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.updateDeletionRecordView = function (data) {
        instance.displaySuccessActivity();

        if (data.record !== null && data.record !== undefined) {

            var deletedRecord = new (instance.getContentTypeObjectPrototype()).constructor(JSON.parse(ko.toJSON(data.record)));

            for (var i = 0; i < instance.Records().length; i++) {
                var item = instance.Records()[i];
                var itemRecord = item;

                try {

                    if (itemRecord.getType() === 'DetailKNObserver' ||
                            itemRecord.getType() === 'DetailObserver') {

                        itemRecord = itemRecord.getRecord();
                    }

                } catch (e) {
                }

                if (itemRecord.getKey() === deletedRecord.getKey()) {
                    instance.Records.remove(item);
                }
            }
        }
        
        instance.performRefObjectAction(data);
    };
    
    /**
     * Performs a reference action with reference input on a reference object.
     * 
     * @param {type} options
     * @returns {undefined}
     */
    instance.performRefObjectAction = function (options) {
        if (options.refActions !== null && options.refActions !== undefined) {
            if (options.refObject !== null && options.refObject !== undefined) {

                if (Array.isArray(options.refActions)) {

                    for (var i = 0; i < options.refActions.length; i++) {
                        
                        var refInput = undefined;
                        if (options.refInputs !== null && options.refInputs !== undefined) {
                            
                            if (Array.isArray(options.refInputs)) {
                                refInput = options.refInputs[i];
                            } else {
                                refInput = options.refInputs;
                            }
                        }
                        options.refObject[options.refActions[i]](refInput);
                    }

                } else {
                    options.refObject[options.refActions](options.refInputs);
                }
            }
        }
    };

    /**
     * Updates observer (data/views) with result record.
     * 
     * data.action - create / update / delete
     * data.resultRecord - Return result (usually entity object)
     * data.inputErrors - list of input errors
     * data.placement - placement
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.updateView = function (data) {
        instance.displayProcessing(false);
        instance.displayGridSuccessActivity();
        if (data.action === undefined) {
            if (data.placement !== null && data.placement !== undefined) {
                instance.updateNewRecordView({
                    'requestData': data.requestData,
                    'refObject': data.refObject,
                    'refActions': data.refActions,
                    'refInputs': data.refInputs,
                    'record': data.resultRecord,
                    'order': data.placement
                });
            } else {
                instance.updateNewRecordView({
                    'requestData': data.requestData,
                    'refObject': data.refObject,
                    'refActions': data.refActions,
                    'refInputs': data.refInputs,
                    'record': data.resultRecord,
                    'order': 'first'
                });
            }
        } else {
            if (data.action === 'create') {
                if (data.placement !== null && data.placement !== undefined) {
                    instance.updateNewRecordView({
                        'requestData': data.requestData,
                        'refObject': data.refObject,
                        'refActions': data.refActions,
                        'refInputs': data.refInputs,
                        'record': data.resultRecord,
                        'order': data.placement
                    });
                } else {
                    instance.updateNewRecordView({
                        'requestData': data.requestData,
                        'refObject': data.refObject,
                        'refActions': data.refActions,
                        'refInputs': data.refInputs,
                        'record': data.resultRecord,
                        'order': 'first'
                    });
                }
            } else if (data.action === 'update') {
                instance.updateExistingRecordView({
                    'requestData': data.requestData,
                    'refObject': data.refObject,
                    'refActions': data.refActions,
                    'refInputs': data.refInputs,
                    'record': data.resultRecord,
                    'resetForm': data.resetForm
                });
            } else if (data.action === 'delete') {
                instance.updateDeletionRecordView({
                    'requestData': data.requestData,
                    'refObject': data.refObject,
                    'refActions': data.refActions,
                    'refInputs': data.refInputs,
                    'record': data.resultRecord
                });
            }
        }
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}