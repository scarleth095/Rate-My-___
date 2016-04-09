(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['dataservice', 'logger', '$scope', 'storageservice'];
    function HomeController(dataservice, logger, $scope, storageservice) {
        var cm = this;
        var vm = $scope.vm;
        vm.pageTitle = 'Dashboard';
        vm.breadcrumb = '/dashboard';
        }
    }
)();
