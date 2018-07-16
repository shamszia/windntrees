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
 * Alternates between objects / concepts.
 * 
 * @param {type} options
 * @returns {undefined}
 */
function Alternator(options) {
    var instance = this;
    var extender = new InstanceExtender();
    instance = extender.extendObjectInterface({'instance': instance, 'field': 'Current'});
    
    /**
     * Represents Zero object / concept.
     */
    instance.Zero = options.zero;
    /**
     * Represents One object / concept.
     */
    instance.One = options.one;
    /**
     * Represents Current object (One / Zero).
     */
    
    //new ObjectKNObserver({'object': options.zero})
    if (options.observer !== null && options.observer !== undefined) {
        if (options.object !== null && options.object !== undefined) {
            options.observer.setObject(options.object);
        } else {
            options.observer.setObject(options.zero);
        }
    }
    
    instance.Current = options.observer;
    
    /**
     * Gets type information.
     * 
     * @returns {String}
     */
    instance.getType = function () {
        return "Alternator";
    };

    /**
     * Gets zero object.
     * 
     * @returns {unresolved}
     */
    instance.getZero = function () {
        return instance.Zero;
    };

    /**
     * Gets one object.
     * 
     * @returns {unresolved}
     */
    instance.getOne = function () {
        return instance.One;
    };

    /**
     * Alternates an object with other object.
     * 
     * @param {type} object
     * @returns {undefined}
     */
    instance.alternate = function (object) {

        if (object !== null && object !== undefined) {
            instance.Current = object;
        }

        if (instance.Current.getObject() === instance.Zero) {
            instance.Current.setObject(instance.One);
        } else {
            instance.Current.setObject(instance.Zero);
        }
        
        return instance.Current;
    };

    /**
     * Gets the currently selected object.
     * 
     * @returns {unresolved}
     */
    instance.getCurrent = function () {
        return instance.Current;
    };
    
    return instance;
}
