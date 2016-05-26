(function () {
    'use strict';
    angular.module('app')
        .factory('configModel', configModel);

    /* @ngInject */
    function configModel() {
        var model = {
            gridConfig: {
                url: 'http://jsonplaceholder.typicode.com/todos',
                editurl: 'http://jsonplaceholder.typicode.com/todos',
                colModel: [
                    { label: 'User ID', name: 'userId', sorttype: 'int', editable: true },
                    { label: 'id', name: 'id', key: true, sorttype: 'int', editable: true },
                    { label: 'Title', name: 'title', editable: true },
                    { label: 'Content', name: 'completed', editable: true },
                ],
                caption: 'Todos',
                loadonce: true,
                sortname: 'id',
                subGrid: true
            },
            
            subgridConfig: {
                url: 'http://api.randomuser.me/?results=10',
                colModel: [
                    { label: 'Gender', name: 'gender', editable: true, width: 100 },
                    { label: 'Email', name: 'email', editable: true, key: true, width: 300 },
                    { label: 'Phone', name: 'phone', editable: true },
                    { label: 'Cell', name: 'cell', editable: true }
                ],
                caption: 'People',
                jsonReader: {
                    repeatitems: false,
                    root: 'results'
                },
                sortname: 'email',
                rowNum: 5,
                rowList: [5, 10, 15]
            }
        };
        return model;
    }
} ());