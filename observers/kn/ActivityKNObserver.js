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
 * ActivityKNObserver observer provides statuses and messages synchronization
 * with related target objects.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function ActivityKNObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'options': options });
    }
    
    instance = extender.extendContentTypeObject({'instance': instance, 'contentType': options.contentType });

    instance.Key = options.key;
    instance.Keyword = ko.observable(options.keyword);
    instance.MessageRepository = options.messages;
    instance.Errors = ko.observableArray([]);
    instance.SharedObject = ko.observable(null);
    instance.Processing = ko.observable(false);
    instance.ResultMessage = ko.observable("");
    instance.FormProcessing = ko.observable(false);
    instance.FormResultMessage = ko.observable("");
    instance.RequestProgress = ko.observable(0);
    instance.PrintReady = ko.observable(false);
    instance.ViewScope = ko.observable((options.viewscope !== null && options.viewscope !== undefined) ? options.viewscope : "view" );
    
    //utility functions
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "ActivityKNObserver";
    };

    /**
     * Gets observer instance key value.
     * 
     * @returns {String}
     */
    instance.getKey = function () {

        return instance.Key;
    };

    /**
     * Sets observer view scope.
     * 
     * @param {type} value
     */
    instance.setViewScope = function (value) {

        instance.ViewScope(value);
    };

    /**
     * Gets observer view scope.
     * 
     * @returns {String}
     */
    instance.getViewScope = function () {

        return instance.ViewScope();
    };

    /**
     * Get observers group type.
     * 
     * @returns {String}
     */
    instance.getObserversGroup = function () {
        return "KN";
    };
    
    /**
     * Check if the keyword has been entered.
     * 
     * @returns {undefined}
     */
    instance.isKeywordAvailable = function () {
        if (instance.Keyword() !== null && instance.Keyword() !== undefined) {
            if (instance.Keyword().length > 0) {
                return true;
            }
        }
        return false;
    };
    
    /**
     * Sets keyword message.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setKeyword = function (data) {
        instance.Keyword(data);
    };
    
    /**
     * Gets keyword message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getKeyword = function() {
        return instance.Keyword();
    };
    
    /**
     * Gets observable keyword message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableKeyword = function() {
        return instance.Keyword;
    };
    
    /**
     * Gets message repository attached to observer.
     * 
     * @returns {type.messages}
     */
    instance.getMessageRepository = function() {
        return instance.MessageRepository;
    };
    
    /**
     * Sets shared observer object.
     * 
     * @param {type} object
     * @returns {undefined}
     */
    instance.setSharedObject = function (object) {
        instance.SharedObject(object);
    };

    /**
     * Gets shared object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getSharedObject = function () {
        return instance.SharedObject();
    };
    
    /**
     * Gets observable shared object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableSharedObject = function () {
        return instance.SharedObject;
    };
    
    /**
     * Gets stringified JSON object from provided immediate data object.
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
    
    //status functions
    
    /**
     * Set errors into errors observer list.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setErrors = function(data) {
        instance.Errors(data);
    };
    
    /**
     * Get errors from the observer errors list.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getErrors = function() {
        return instance.Errors();
    };
    
    /**
     * Gets observerable errors list.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getObservableErrors = function() {
        return instance.Errors;
    };
    
    /**
     * Sets processing status (true/false).
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setProcessing = function(data) {
        instance.Processing(data);
    };
    
    /**
     * Gets processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getProcessing = function() {
        return instance.Processing();
    };
    
    /**
     * Gets observable processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableProcessing = function() {
        return instance.Processing;
    };
    
    /**
     * Sets result message.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setResultMessage = function (data) {
        instance.ResultMessage(data);
    };
    
    /**
     * Gets result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getResultMessage = function () {
        return instance.ResultMessage();
    };
    
    /**
     * Gets observable result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableResultMessage = function () {
        return instance.ResultMessage;
    };
    
    /**
     * Sets form processing status (true/false).
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setFormProcessing = function(data) {
        instance.FormProcessing(data);
    };
    
    /**
     * Gets form processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getFormProcessing = function() {
        return instance.FormProcessing();
    };
    
    /**
     * Gets observable form processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableFormProcessing = function() {
        return instance.FormProcessing;
    };
    
    /**
     * Sets form result message.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setFormResultMessage = function (data) {
        instance.FormResultMessage(data);
    };
    
    /**
     * Gets form result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getFormResultMessage = function () {
        return instance.FormResultMessage();
    };
    
    /**
     * Gets observable form result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableFormResultMessage = function () {
        return instance.FormResultMessage;
    };

    /**
     * Sets request progress.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setRequestProgress = function (value) {
        instance.RequestProgress(value);
    };

    /**
     * Gets request progress.
     * 
     * @returns {undefined}
     */
    instance.getRequestProgress = function () {
        return instance.RequestProgress();
    };

    /**
     * Sets print ready status.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setPrintReady = function (value) {
        instance.PrintReady(value);
    };

    /**
     * Gets print request status.
     * 
     * @returns {undefined}
     */
    instance.isPrintReady = function () {
        return instance.PrintReady();
    };

    /**
     * Display processing indicators.
     * 
     * @param {type} status
     * @returns {undefined}
     */
    instance.displayProcessing = function (status) {
        instance.Processing(status);
    };

    /**
     * Displays view's saved activity.
     * 
     * @returns {undefined}
     */
    instance.displaySaved = function () {
        instance.ResultMessage(instance.getMessageRepository().get("form.saved.text"));
        instance.FormResultMessage(instance.getMessageRepository().get("form.saved.text"));
        instance.Processing(false);
        instance.FormProcessing(false);
    };

    /**
     * Displays view's failed activity.
     * 
     * @returns {undefined}
     */
    instance.displayFailed = function () {
        instance.ResultMessage(instance.getMessageRepository().get("form.failed.text"));
        instance.FormResultMessage(instance.getMessageRepository().get("form.failed.text"));
        instance.Processing(false);
        instance.FormProcessing(false);
    };
    
    /**
     * Displays view's processing activity.
     * 
     * @returns {undefined}
     */
    instance.displayProcessingActivity = function () {
        instance.ResultMessage(instance.getMessageRepository().get("standard.processing.text"));
        instance.Processing(true);
    };
    
    /**
     * Displays clear activity.
     * 
     * @returns {undefined}
     */
    instance.displayClearActivity = function () {
        instance.ResultMessage("");
        instance.Processing(false);
    };
    
    /**
     * Displays no record activity.
     * 
     * @returns {undefined}
     */
    instance.displayNoRecordActivity = function () {
        instance.ResultMessage(instance.getMessageRepository().get("form.noRecord.text"));
        instance.Processing(false);
    };
    
    /**
     * Displays view's successful activity.
     * 
     * @returns {undefined}
     */
    instance.displaySuccessActivity = function () {
        instance.ResultMessage(instance.getMessageRepository().get("standard.ok.text"));
        instance.Processing(false);
    };
    
    /**
     * Displays view's failure activity.
     * 
     * @returns {undefined}
     */
    instance.displayFailureActivity = function () {
        instance.ResultMessage(instance.getMessageRepository().get("standard.err.text"));
        instance.Processing(false);
    };
    
    /**
     * Display form processing status.
     * 
     * @param {type} status
     * @returns {undefined}
     */
    instance.displayFormProcessing = function (status) {
        instance.FormProcessing(status);
    };
    
    /**
     * Displays form processing activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormProcessingActivity = function () {
        instance.FormResultMessage(instance.getMessageRepository().get("standard.processing.text"));
        instance.FormProcessing(true);
    };
    
    /**
     * Displays form clear activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormClearActivity = function () {
        instance.FormResultMessage("");
        instance.FormProcessing(false);
    };
    
    /**
     * Displays form no record activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormNoRecordActivity = function () {
        instance.FormResultMessage(instance.getMessageRepository().get("form.noRecord.text"));
        instance.FormProcessing(false);
    };
    
    /**
     * Displays form successful activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormSuccessActivity = function () {
        instance.FormResultMessage(instance.getMessageRepository().get("standard.ok.text"));
        instance.FormProcessing(false);
    };
    
    /**
     * Displays form failure activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormFailureActivity = function () {
        instance.FormResultMessage(instance.getMessageRepository().get("standard.err.text"));
        instance.FormProcessing(false);
    };
    
    /**
     * Display processing indicators.
     * 
     * @param {type} status
     * @returns {undefined}
     */
    instance.displayGridProcessing = function (status) {
        instance.Processing(status);
    };
    
    /**
     * Displays grid's processing activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridProcessingActivity = function () {
        instance.ResultMessage(instance.getMessageRepository().get("standard.processing.text"));
        instance.Processing(true);
    };
    
    /**
     * Displays grid's successful activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridSuccessActivity = function () {
        instance.ResultMessage(instance.getMessageRepository().get("standard.ok.text"));
        instance.Processing(false);
    };
    
    /**
     * Displays grid's failure activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridFailureActivity = function () {
        instance.ResultMessage(instance.getMessageRepository().get("standard.err.text"));
        instance.Processing(false);
    };
    
    /**
     * Displays grid clear activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridClearActivity = function () {
        instance.ResultMessage("");
        instance.Processing(false);
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}
