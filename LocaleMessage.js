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
 * Locale message to represent localized messages in a key/value store.
 * 
 * @param {type} key
 * @param {type} value
 * @returns {undefined}
 */
function LocaleMessage(key, value) {
    var instance = this;
    
    instance.key = key;
    instance.value = value;
    
    /**
     * Gets the key.
     * 
     * @returns {Window.key|type}
     */
    instance.getKey = function () {
      return instance.key;  
    };
    
    /**
     * Sets the key.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setKey = function (data) {
        instance.key = data;
    };
    
    /**
     * Gets the value.
     * 
     * @returns {Window.value|type}
     */
    instance.getValue = function () {
        return instance.value;
    };
    
    /**
     * Sets the value.
     * 
     * @param {type} data
     * @returns {undefined}
     */
    instance.setValue = function (data) {
        instance.value = data;
    };
}