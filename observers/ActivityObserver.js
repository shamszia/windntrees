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
 * ActivityObserver provides concrete observer independent statuses and messages 
 * synchronization with related target objects.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function ActivityObserver(options) {
    var instance = (options.instance !== null && options.instance !== undefined) ? options.instance : this;
    var extender = new InstanceExtender();
    
    if (options.observer !== null && options.observer !== undefined) {

        if (typeof (options.observer) === "string") {
            
            //select and initializes observer.
            if (options.observer === "kn") {
                instance.Observer = new ActivityKNObserver(options);
            }

        } else {
            
            //if observer is provided it is selected.
            instance.Observer = options.observer;
        }
    } else {
        
        //if observer is not provided a default observer is initialized and selected.
        instance.Observer = new ActivityKNObserver(options);
    }
    
    if (options.instance === null || options.instance === undefined) {
        instance = extender.extendNewInstance({ 'instance': instance, 'newparameter': instance.Observer, 'options': options});
    }
    
    instance = extender.extendContentObserver({'instance': instance,
            'observer': instance.Observer
        });
    
    //utility functions
    
    /**
     * Gets the type of the function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "ActivityObserver";
    };

    /**
     * Gets observer instance key value.
     * 
     * @returns {String}
     */
    instance.getKey = function () {

        return instance.getObserver().getKey();
    };

    /**
     * Sets observer view scope.
     * 
     * @param {type} value
     */
    instance.setViewScope = function (value) {

        instance.getObserver().setViewScope(value);
    };

    /**
     * Gets observer view scope.
     * 
     * @returns {String}
     */
    instance.getViewScope = function () {

        return instance.getObserver().getViewScope();
    };

    /**
     * Gets observers group type.
     * 
     * @returns {String}
     */
    instance.getObserversGroup = function () {
        return instance.getObserver().getObserversGroup();
    }
    
    /**
     * Gets the type of internal observer.
     * 
     * @returns {String}
     */
    instance.getObserverType = function () {
        return instance.getObserver().getType();
    };
    
    /**
     * Gets the observer object.
     * 
     * @returns {type}
     */
    instance.getObserver = function () {
        return instance.Observer;
    };
    
    /**
     * Sets keyword message.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setKeyword = function (data) {
        instance.getObserver().setKeyword(data);
    };
    
    /**
     * Gets keyword message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getKeyword = function() {
        return instance.getObserver().getKeyword();
    };
    
    /**
     * Check if the keyword has been entered.
     * 
     * @returns {undefined}
     */
    instance.isKeywordAvailable = function () {
        return instance.getObserver().isKeywordAvailable();
    };
    
    /**
     * Gets observable keyword message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableKeyword = function() {
        return instance.getObserver().getObservableKeyword();
    };
    
    /**
     * Gets internal observer message repository.
     * 
     * @returns {type.messages}
     */
    instance.getMessageRepository = function() {
        return instance.getObserver().getMessageRepository();
    };
    
    /**
     * Sets internal observer's shared observer object.
     * 
     * @param {type} object
     * @returns {undefined}
     */
    instance.setSharedObject = function (object) {
        instance.getObserver().setSharedObject(object);
    };

    /**
     * Gets internal observers shared object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getSharedObject = function () {
        return instance.getObserver().getSharedObject();
    };
    
    /**
     * Gets observable shared object.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableSharedObject = function () {
        return instance.getObserver().getObservableSharedObject();
    };
    
    /**
     * Gets internal observers stringified JSON object from provided immediate data object.
     * 
     * @param {type} data
     * @returns {unresolved}
     */
    instance.getStringifiedObject = function(data) {
        return instance.getObserver().getStringifiedObject(data);
    };
    
    /**
     * Gets internal observer's JSON object from provided immediate data object.
     * 
     * @param {type} data
     * @returns {unresolved}
     */
    instance.getJSONObject = function(data) {
        return instance.getObserver().getJSONObject(data);
    };
    
    //status functions
    
    /**
     * Sets internal observer errors into errors observerable list.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setErrors = function(data) {
        instance.getObserver().setErrors(data);
    };
    
    /**
     * Gets internal observer errors list.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getErrors = function() {
        return instance.getObserver().getErrors();
    };
    
    /**
     * Gets observerable errors list.
     * 
     * @returns {ko.observableArray.result}
     */
    instance.getObservableErrors = function() {
        return instance.getObserver().getObservableErrors();
    };
    
    /**
     * Sets internal observers processing status (true/false).
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setProcessing = function(data) {
        instance.getObserver().setProcessing(data);
    };
    
    /**
     * Gets internal observers processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getProcessing = function() {
        return instance.getObserver().getProcessing();
    };
    
    /**
     * Gets observable processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableProcessing = function() {
        return instance.getObserver().getObservableProcessing();
    };
    
    /**
     * Sets internal observers result message.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setResultMessage = function (data) {
        instance.getObserver().setResultMessage(data);
    };
    
    /**
     * Gets internal observer's result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getResultMessage = function () {
        return instance.getObserver().getResultMessage();
    };
    
    /**
     * Gets observable result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableResultMessage = function () {
        return instance.getObserver().getObservableResultMessage();
    };
    
    /**
     * Sets form processing status (true/false).
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setFormProcessing = function(data) {
        instance.getObserver().setFormProcessing(data);
    };
    
    /**
     * Gets form processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getFormProcessing = function() {
        return instance.getObserver().getFormProcessing();
    };
    
    /**
     * Gets observable processing status.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableFormProcessing = function() {
        return instance.getObserver().getObservableFormProcessing();
    };
    
    /**
     * Sets form result message.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setFormResultMessage = function (data) {
        instance.getObserver().setFormResultMessage(data);
    };
    
    /**
     * Gets form result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getFormResultMessage = function () {
        return instance.getObserver().getFormResultMessage();
    };
    
    /**
     * Gets form observable result message.
     * 
     * @returns {ko.observable.observable}
     */
    instance.getObservableFormResultMessage = function () {
        return instance.getObserver().getObservableFormResultMessage();
    };

    /**
     * Sets request progress.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setRequestProgress = function (value) {
        instance.getObserver().setRequestProgress(value);
    };

    /**
     * Gets request progress.
     * 
     * @returns {undefined}
     */
    instance.getRequestProgress = function () {
        return instance.getObserver().getRequestProgress();
    };

    /**
     * Sets print ready status.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setPrintReady = function (value) {
        instance.getObserver().setPrintReady(value);
    };

    /**
     * Gets print request status.
     * 
     * @returns {undefined}
     */
    instance.isPrintReady = function () {
        return instance.getObserver().isPrintReady();
    };

    /**
     * Display processing indicators.
     * 
     * @param {type} status
     * @returns {undefined}
     */
    instance.displayProcessing = function (status) {
        instance.getObserver().displayProcessing(status);
    };

    /**
     * Displays view's saved activity.
     * 
     * @returns {undefined}
     */
    instance.displaySaved = function () {
        instance.getObserver().displaySaved();
    };

    /**
     * Displays view's failed activity.
     * 
     * @returns {undefined}
     */
    instance.displayFailed = function () {
        instance.getObserver().displayFailed();
    };
    
    /**
     * Displays view's processing activity.
     * 
     * @returns {undefined}
     */
    instance.displayProcessingActivity = function () {
        instance.getObserver().displayProcessingActivity();
    };
    
    /**
     * Displays clear activity.
     * 
     * @returns {undefined}
     */
    instance.displayClearActivity = function () {
        instance.getObserver().displayClearActivity();
    };
    
    /**
     * Displays no record activity.
     * 
     * @returns {undefined}
     */
    instance.displayNoRecordActivity = function () {
        instance.getObserver().displayNoRecordActivity();
    };
    
    /**
     * Displays view's successful activity.
     * 
     * @returns {undefined}
     */
    instance.displaySuccessActivity = function () {
        instance.getObserver().displaySuccessActivity();
    };
    
    /**
     * Displays view's failure activity.
     * 
     * @returns {undefined}
     */
    instance.displayFailureActivity = function () {
        instance.getObserver().displayFailureActivity();
    };
    
    /**
     * Display form processing status.
     * 
     * @param {type} status
     * @returns {undefined}
     */
    instance.displayFormProcessing = function (status) {
        instance.getObserver().displayFormProcessing(status);
    };
    
    /**
     * Displays form processing activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormProcessingActivity = function () {
        instance.getObserver().displayFormProcessingActivity();
    };
    
    /**
     * Displays form clear activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormClearActivity = function () {
        instance.getObserver().displayFormClearActivity();
    };
    
    /**
     * Displays form no record activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormNoRecordActivity = function () {
        instance.getObserver().displayFormNoRecordActivity();
    };
    
    /**
     * Displays form successful activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormSuccessActivity = function () {
        instance.getObserver().displayFormSuccessActivity();
    };
    
    /**
     * Displays form failure activity.
     * 
     * @returns {undefined}
     */
    instance.displayFormFailureActivity = function () {
        instance.getObserver().displayFormFailureActivity();
    };
    
    /**
     * Display processing indicators.
     * 
     * @param {type} status
     * @returns {undefined}
     */
    instance.displayGridProcessing = function (status) {
        instance.getObserver().displayGridProcessing(status);
    };
    
    /**
     * Displays grid's processing activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridProcessingActivity = function () {
        instance.getObserver().displayGridProcessingActivity();
    };
    
    /**
     * Displays grid's successful activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridSuccessActivity = function () {
        instance.getObserver().displayGridSuccessActivity();
    };
    
    /**
     * Displays grid's failure activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridFailureActivity = function () {
        instance.getObserver().displayGridFailureActivity();
    };
    
    /**
     * Displays grid clear activity.
     * 
     * @returns {undefined}
     */
    instance.displayGridClearActivity = function () {
        instance.getObserver().displayGridClearActivity();
    };
    
    if (options.instance !== null && options.instance !== undefined) {
        return Object.create(instance);
    }
    
    return instance;
}