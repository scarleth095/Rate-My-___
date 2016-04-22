(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('PostController', PostController);

    PostController.$inject = ['postdata', 'dataservice', 'logger'];
    function PostController(postdata, dataservice, logger) {
        var cm = this;
            cm.post = postdata.post;
            cm.user = postdata.user;
            cm.url_null = (cm.post.url === null);
        }
    }
)();
