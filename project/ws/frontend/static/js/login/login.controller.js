(function(){
    'use strict';

    angular
    	.module('abcss.login')
    	.controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice', 'logger', 'storageservice'];
	function LoginController(dataservice, logger, storageservice){
        var vm = this;
        vm.login = login;

        function login(){
            dataservice.authenticate(vm.username, vm.password);
        }
    }

})();
