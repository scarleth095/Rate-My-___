(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['dataservice', 'logger','storageservice'];
    function ProfileController(dataservice, logger,storageservice) {
        var cm = this;
        }
    }
)();
