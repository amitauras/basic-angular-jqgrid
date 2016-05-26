(function () {
    'use strict';
    angular.module('app')
        .controller('appCtrl', appCtrl);

    appCtrl.$inject = ['configModel'];
    function appCtrl(configModel) {
        var vm = this;
        vm.config = null;
        vm.data = null;
        vm.subgridConfig = null;

        activate();

        ////////////////////////////
        function getConfig() {
            return configModel.gridConfig;
        }

        function getSubgridConfig() {
            return configModel.subgridConfig;
        }

        function activate() {
            vm.config = getConfig();
            vm.subgridConfig = getSubgridConfig();
        }
    }
} ());