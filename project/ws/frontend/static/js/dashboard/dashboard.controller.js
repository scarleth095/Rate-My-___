(function(){
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['storageservice', 'logger', '$state', '$scope', '$window'];
    function DashboardController(storageservice, logger, $state, $scope, $window){
        var vm = this;
        /**
         * Sidebar Toggle & Cookie Control
         */
        var mobileView = 992;
        vm.toggle = false;
        vm.toggleSidebar = toggleSidebar;
        vm.mobile = undefined;
        vm.pageTitle = undefined;
        vm.breadcrumb = undefined;
        vm.name = storageservice.getName();

        vm.logout = logout;

        // reset states if the user navigates directly to those links
        vm.resetHomeState = storageservice.resetHomeState;

        $scope.$watch(function(){
            return $window.innerWidth;
        }, function(value) {
            vm.mobile = value < mobileView;
            if (vm.mobile) {
                vm.toggle = false;
            }
        });

        $window.onresize = function() {
            $scope.$apply();
        };

        function toggleSidebar() {
            vm.toggle = !vm.toggle;
        }

        function logout(){
            storageservice.clearUID();
            storageservice.clearName();
            storageservice.clearToken();
            $state.go('login');
        }

    }
})();
