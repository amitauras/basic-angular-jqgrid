(function () {
    'use strict';
    angular.module('jqGrid')
        .directive('jdJqGrid', jdJqGrid);

    jdJqGrid.$inject = ['gridConfig'];
    function jdJqGrid(gridConfig) {
        var directive = {
            restrict: 'A',
            scope: {
                config: '=',
                data: '=',
                subgridConfig: '='
            },
            link: function ($scope, element, attrs) {
                var table, div;
                var _commonConfig = angular.copy(gridConfig.getGridConfig());
                angular.extend(_commonConfig, $scope.config);
                element.children().empty();
                table = angular.element('<table id="' + attrs.gridid + '"></table>');
                element.append(table);

                if (attrs.pagerid) {
                    _commonConfig.pager = '#' + attrs.pagerid;
                    var pager = angular.element(_commonConfig.pager);
                    if (pager.length == 0) {
                        div = angular.element('<div id="' + attrs.pagerid + '"></div>');
                        element.append(div);
                    }
                }

                if (_commonConfig.subGrid) {
                    var _subgridConfig = angular.copy(gridConfig.getGridConfig());
                    gridConfig.setSubgridOptions(angular.extend(_subgridConfig, $scope.subgridConfig));
                    _commonConfig.subGridRowExpanded = gridConfig.showChildGrid;
                }

                table.jqGrid(_commonConfig);

                /* Pager for gridConfig
                ****************************************************************************** **/
                table.jqGrid("navGrid", '#' + attrs.pagerid, { edit: true, add: true, del: true },
                    {
                        mtype: 'PUT', closeAfterEdit: true, reloadAfterSubmit: true, checkOnSubmit: true, checkOnUpdate: true, closeOnEscape: true, onclickSubmit: function (params, postdata) {
                            params.url = 'http://jsonplaceholder.typicode.com/todos' + '/' + postdata.id;
                        },
                        afterSubmit: function (response, postdata) {
                            $("#main-grid").jqGrid('setGridParam', { datatype: 'json' }).trigger('reloadGrid');
                            return [true, "", ''];
                        }
                    }
                );

                // $scope.$watch('data', function (value) {
                //     table.jqGrid('setGridParam', { data: value })
                //         .trigger('reloadGrid');
                // });
            }
        };
        return directive;
    }
} ());