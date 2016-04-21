(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('CreateController', CreateController);

    CreateController.$inject = ['dataservice', 'logger'];
    function CreateController(dataservice, logger) {
        var cm = this;
        cm.tags = [];
        cm.loadTags = loadTags;

        function loadTags($query){
            //logger.info($query);
            return dataservice.getTags();
        }
    }
})();