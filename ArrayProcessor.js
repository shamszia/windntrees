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
 * Processes array of objects.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function ArrayProcessor(options) {
    var instance = this;
    
    if (options.field !== null && options.field !== undefined) {
        if (options.value !== null && options.value !== undefined) {
            
            instance[options.field] = options.value;
        }
    } else {
        
        instance.Objects = options.objects;
    }
    
    /**
     * Gets the type of function construct.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "ArrayProcessor";
    };
    
    /**
     * Gets array of objects.
     * 
     * @returns {type.objects|ArrayProcessor|ArrayProcessor.instance}
     */
    instance.getObjects = function () {
        
        if (options.field !== null && options.field !== undefined) {
            
            return instance[options.field];
        }
        return instance.Objects;
    };
    
    /**
     * Gets Object from Objects list based on key value.
     * 
     * @param {type} key
     * @returns {unresolved}
     */
    instance.get = function (key) {

        if (key !== null && key !== undefined) {

            if (instance.getObjects() !== null && instance.getObjects() !== undefined) {
                
                for (var i = 0; i < instance.getObjects().length; i++) {
                    if (instance.getObjects()[i].key === key) {
                        return instance.getObjects()[i].value;
                    }
                }
            }
        }
        return null;
    };
    
    /**
     * Add object in objects repository. If object exists
     * its value will be replaced by provided object.
     * 
     * @param {type} object
     * @returns {undefined}
     */
    instance.add = function (object) {
        
        if (object !== null && object !== undefined) {
            
            if (instance.getObjects() !== null && instance.getObjects() !== undefined) {
                
                for (var i = 0; i < instance.getObjects().length; i++) {
                    var item = instance.getObjects()[i];
                    if (item.getKey() === object.getKey()) {
                        item.setValue(object.getValue());
                        return;
                    }
                }
                instance.getObjects().push(object);
            }
        }
    };
    
    /**
     * Removes an object from the objects repository.
     * 
     * @param {type} object
     * @returns {undefined}
     */
    instance.remove = function (object) {
        
        if (object !== null && object !== undefined) {
            
            if (instance.getObjects() !== null && instance.getObjects() !== undefined) {
                
                for (var i = 0; i < instance.getObjects().length; i++) {
                    var item = instance.getObjects()[i];
                    if (item.getKey() === object.getKey()) {
                        instance.getObjects().splice(i, 1);
                        return;
                    }
                }
            }
        }
    };
    
    /**
     * 
     * 
     * @returns {Boolean}
     */
    instance.hasArrayProcessor = function () {
        return true;
    };
};