(function(){
    'use strict';

    angular
    	.module('abcss.login')
    	.controller('LoginController', LoginController);

    LoginController.$inject = ['dataservice', 'logger', 'storageservice', '$interval'];
	function LoginController(dataservice, logger, storageservice, $interval){
        var vm = this;
        vm.login = login;
        var values = ["Blank", "Video", "Outfit", "Story", "Design"];
        var counter = 0;
        vm.thing = "Blank";
        $interval(function(){
            counter = (counter + 1)%5;
            vm.thing = values[counter];
        }, 2000);


        function login(){
            dataservice.authenticate(vm.username, vm.password);
        }
    }

})();
