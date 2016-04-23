(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('PostController', PostController);

    PostController.$inject = ['postdata', 'dataservice', 'logger', '$scope'];
    function PostController(postdata, dataservice, logger, $scope) {
        var cm = this;
        cm.post = postdata.post;
        cm.rating = postdata.rating;
        cm.my_rating = 5;
        cm.rating_max = 5;
        cm.url_null = (cm.post.url === null);
        cm.getSelectedRating = getSelectedRating;
        cm.repeat = repeat;

        function getSelectedRating(rating){
            var params = {pid: cm.post.pid, rating:rating};
            var result = dataservice.updateRating(params);
        }

        function repeat(num) {
            return new Array(num);
        }
        
    }
})();
