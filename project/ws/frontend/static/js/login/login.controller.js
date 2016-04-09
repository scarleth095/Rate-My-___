(function(){
    'use strict';

    angular
    	.module('abcss.login')
    	.controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice', 'logger', 'storageservice'];
	function LoginController(dataservice, logger, storageservice){
        var vm = this;
        vm.login = login;
        vm.initialize = initialize;

        // Initialize login page
        vm.initialize();

        function initialize(){
            particlesJS.load('particles-js', 'static/json/particles-config.json', function() {
            });
        }
        function login(){
            dataservice.authenticate(vm.username, vm.password);
        }
    }

})();
