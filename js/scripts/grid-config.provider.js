(function () {
    'use strict';
    angular.module('jqGrid')
        .provider('gridConfig', gridConfigProvider);

    // gridConfigProvider.$inject = ['$injector'];
    function gridConfigProvider() {
        var config = {
            datatype: 'json',
            mtype: 'GET',
            height: 'auto',
            width: 'auto',
            gridView: true,
            autowidth: true,
            multiSelect: false,
            viewrecords: true,
            rowNum: 10,
            rowList: [10, 20, 30],
            loadBeforeSend: function (xhr, settings) {
                settings.url = settings.url;
            },
            prmNames: {
                search: null,
                nd: null,
                rows: null,
                page: null,
                sort: null,
                order: null
            }
        };

        var subgridHash = {
            config: null
        };

        this.configure = function (cfg) {
            angular.extend(config, cfg);
        };

        this.$get = function () {
            var services = {
                getGridConfig: getGridConfig,
                setSubgridOptions: setSubgridOptions,
                showChildGrid: showChildGrid
            };

            return services;

            //////////////////////////////////

            function getGridConfig() {
                return config;
            }

            function setSubgridOptions(config) {
                subgridHash.config = config;
            }

            // the event handler on expanding parent row receives two parameters
            // the ID of the grid row  and the primary key of the row
            function showChildGrid(parentRowID, parentRowKey) {
                var childGridID = parentRowID + "_table";
                var childGridPagerID = parentRowID + "_pager";

                // setting config options for subgrid
                var _subgridConfig = angular.extend(config, subgridHash.config);
                _subgridConfig.pager = childGridPagerID;

                // add a table and pager HTML elements to the parent grid row - we will render the child grid here
                $("#" + parentRowID).html("<table id='" + childGridID + "' class='scroll'></table><div id='" + childGridPagerID + "' class='scroll'></div>");
                jQuery("#" + childGridID).jqGrid(_subgridConfig);
                jQuery("#" + childGridID).jqGrid('navGrid', "#" + childGridPagerID, { add: false, del: false })

            }
        };
    }
} ());