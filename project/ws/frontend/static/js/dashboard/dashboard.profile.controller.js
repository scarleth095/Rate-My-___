(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('ProfileController', ProfileController);

    ProfileController.$inject = ['dataservice', 'logger', 'postsdata','storageservice'];
    function ProfileController(dataservice, logger, postsdata,storageservice) {
        var cm = this;
        cm.page = 1;
        cm.items = postsdata.items;
        cm.postsdata = postsdata.posts;
        cm.rating_max = 5;
        cm.repeat = repeat;
        cm.getPosts = getPosts;
        cm.name = storageservice.getName();
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
