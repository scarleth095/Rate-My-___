(function(){
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('DashboardController', DashboardController);

    DashboardController.$inject = ['storageservice', 'logger', '$state'];
    function DashboardController(storageservice, logger, $state){
        var vm = this;
        vm.name = storageservice.getName();
        vm.profile_picture = storageservice.getProfilePicture();
        vm.logout = logout;

        function logout(){
            storageservice.clearUID();
            storageservice.clearName();
            storageservice.clearToken();
            storageservice.clearProfilePicture();
            $state.go('login');
        }

    }
})();
