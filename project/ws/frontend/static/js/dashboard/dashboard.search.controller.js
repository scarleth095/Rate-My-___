(function() {
        'use strict';

        angular
            .module('abcss.dashboard')
            .controller('SearchController', SearchController);

        SearchController.$inject = ['dataservice', 'logger', 'postsdata', '$stateParams'];
        function SearchController(dataservice, logger, postsdata, $stateParams) {
            var cm = this;
            cm.search_field = $stateParams.search_field;
            cm.page = 1;
            cm.items = postsdata.items;
            cm.postsdata = postsdata.posts;
            cm.rating_max = 5;
            cm.repeat = repeat;
            cm.getPosts = getPosts;

            function repeat(num) {
                return new Array(num);
            }

            function getPosts() {
                var arg = {
                    search_field: $stateParams.search_field,
                    page: cm.page
                };
                dataservice.getPosts(arg).then(function (result) {
                    cm.items = result.items;
                    cm.postsdata = result.posts;
                });
            }

        }
    }
)();
