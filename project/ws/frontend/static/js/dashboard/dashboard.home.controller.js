(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['dataservice', 'logger', 'postsdata'];
    function HomeController(dataservice, logger, postsdata) {
        var cm = this;
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
