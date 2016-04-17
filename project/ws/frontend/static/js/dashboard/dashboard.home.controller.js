(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['dataservice', 'logger'];
    function HomeController(dataservice, logger) {
        var cm = this;
        }
    }
)();
