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
 * Represents page navigation hyper link.
 * 
 * @param {type} number
 * @returns {undefined}
 */
function NavLink(number, listsource) {
    var instance = this;
    instance.ListSource = listsource;
    instance.Number = number;

    //Data source dependent search functions.
    ////////////////////////////////////////////////////////////////////////////////////////////
    instance.find = function (options, fill) {

        if (instance.ListSource !== null && instance.ListSource !== undefined) {

            return instance.ListSource.find(options, fill);
        }
    };

    instance.list = function (options, fill) {

        if (instance.ListSource !== null && instance.ListSource !== undefined) {

            return instance.ListSource.list(options, fill);
        }
    };

    instance.select = function (options, fill) {

        if (instance.ListSource !== null && instance.ListSource !== undefined) {

            return instance.ListSource.select(options, fill);
        }
    };

    instance.selectList = function (options, fill) {

        if (instance.ListSource !== null && instance.ListSource !== undefined) {

            return instance.ListSource.selectList(options, fill);
        }
    };
    ////////////////////////////////////////////////////////////////////////////////////////////
}

/**
 * ListNavigator data structure used to render lists with scroll size.
 * 
 * options.currentList 
 * options.listSize 
 * options.totalRecords
 * options.scrollSize
 * 
 * @param {type} options
 * @returns {undefined}
 */
function ListNavigator(options) {
    var instance = this;

    instance.Lists = [];
    
    instance.CurrentList = (options.currentList !== null && options.currentList !== undefined) ? options.currentList : 1;
    instance.ListSize = (options.listSize !== null && options.listSize !== undefined) ? options.listSize : 10;
    instance.TotalRecords = (options.totalRecords !== null && options.totalRecords !== undefined) ? options.totalRecords: 0;
    instance.ScrollSize = (options.scrollSize !== null && options.scrollSize !== undefined) ? options.scrollSize : 10; // Number of pages dispalyed
    
    instance.calculateTotalPages = function () {
        return Math.ceil(instance.TotalRecords / instance.ListSize);
    };

    instance.composeLists = function (listsource) {
        instance.Lists = [];
        //find the pager scroll size offset to find min and max pages
        var pageOffset = Math.ceil(instance.ScrollSize / 2);
        var minPageNumber = options.currentList - pageOffset;
        var maxPageNumber = options.currentList + pageOffset;

        if (minPageNumber <= 0) {
            minPageNumber = 1;
        }

        if (minPageNumber + instance.ScrollSize > instance.calculateTotalPages()) {
            maxPageNumber = instance.calculateTotalPages();
        }
        else {
            maxPageNumber = minPageNumber + instance.ScrollSize;

            if (maxPageNumber > instance.calculateTotalPages()) {
                maxPageNumber = instance.calculateTotalPages();
            }
        }
        for (var i = minPageNumber; i <= maxPageNumber; i++) {

            var ls = (listsource !== null && listsource !== undefined) ? listsource : options.listsource;
            instance.Lists.push(new NavLink(i, ls));
        }
    };
    
    instance.getLists = function () {
        return instance.Lists;
    };

    instance.newObject = function(options) {
        return new ListNavigator(options);
    };
    
    instance.composeLists();
}