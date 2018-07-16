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
 * Locale messages repository to save locale messages.
 * 
 * @returns {undefined}
 */
function MessageRepository(options) {
    var instance = this;
    instance.Records = [];

    /**
     * Gets locale message (LocaleMessage) from repository based on key value.
     * 
     * @param {type} key
     * @returns {Window.Records.value|String}
     */
    instance.get = function (key) {
        if (key !== null && key !== undefined) {
            for (var i = 0; i < instance.Records.length; i++) {
                if (instance.Records[i].key === key) {
                    return instance.Records[i].value;
                }
            }
        } else {
            return key + " - no message found.";
        }
        return "key is not defined";
    };

    /**
     * Get all locale messages;
     * 
     * @returns {Array|Repository.Records}
     */
    instance.getAll = function () {
        return Records;
    };

    /**
     * Add locale message (LocaleMessage) to the repository. If message exists
     * its value will be replaced by provided message value.
     * 
     * @param {type} message
     * @returns {undefined}
     */
    instance.add = function (message) {
        if (message !== null && message !== undefined) {
            var record = null;
            for (var i = 0; i < instance.Records.length; i++) {
                record = instance.Records[i];
                if (record !== null && record !== undefined) {
                    if (message.getKey() === record.getKey()) {
                        record.setValue(message.getValue());
                        //instance.Records.splice(i,message);
                        return;
                    }
                }
            }
            instance.Records.push(message);
        }
    };

    /**
     * Removes locale message (LocaleMessage) from the repository.
     * 
     * @param {type} message
     * @returns {undefined}
     */
    instance.remove = function (message) {
        if (message !== null && message !== undefined) {
            var record = null;
            for (var i = 0; i < instance.Records.length; i++) {
                record = instance.Records[i];
                if (record !== null && record !== undefined) {
                    if (message.getKey() === record.getKey()) {
                        instance.Records.splice(i, 1);
                        return;
                    }
                }
            }
        }
    };

    /**
     * Clears the repository.
     * 
     * @returns {undefined}
     */
    instance.clean = function () {
        instance.Records = [];
    };

    instance.fill = function () {
        instance.add(new LocaleMessage("form.new.text", 'New'));
        instance.add(new LocaleMessage("form.edit.text", 'Edit'));
        instance.add(new LocaleMessage("form.noRecord.text", 'No record found.'));
        instance.add(new LocaleMessage("form.found.text", 'Found'));
        instance.add(new LocaleMessage("form.records.text", 'Record(s)'));
        instance.add(new LocaleMessage("form.saved.text", 'Save'));
        instance.add(new LocaleMessage("form.failed.text", 'Failed'));
        instance.add(new LocaleMessage("form.displayingPage.text", 'Displaying Page'));
        instance.add(new LocaleMessage("form.of.text", 'Of'));
        instance.add(new LocaleMessage("form.totalPages.text", ''));
        instance.add(new LocaleMessage("form.ok.text", 'Ok'));
        instance.add(new LocaleMessage("standard.alertSure.text", 'Are you sure to delete this record.'));
        instance.add(new LocaleMessage("standard.processing.text", 'Processing...'));
        instance.add(new LocaleMessage("standard.err.text", 'Requested operation failed, an error occured while processing your request.'));
        instance.add(new LocaleMessage("standard.ok.text", 'Request operation completed successfully.'));
        instance.add(new LocaleMessage("standard.listloadok.text", 'List loaded successfully.'));
        instance.add(new LocaleMessage("standard.listloaderr.text", 'List load failed.'));
    };

    if (options !== null && options !== undefined) {

        if (options.fill !== null && options.fill !== undefined) {

            if (options.fill) {

                instance.fill();
            }
        }
        else {

            instance.fill();
        }
    }
    else
    {
        instance.fill();
    }
}
