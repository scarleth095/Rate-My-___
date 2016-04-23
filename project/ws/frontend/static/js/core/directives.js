(function() {
    'use strict';

    angular
        .module('abcss.core')
        .directive('imgurdrop', imgurdrop);

    imgurdrop.$inject = ['logger', '$timeout', 'imgur'];
    function imgurdrop(logger, $timeout, imgur) {
        return {
            link: link,
            scope: {
                drop: '&'
            }
        };

        function link(scope, element) {
            imgur.setAPIKey('Client-ID 40dbfe0cfea73a7');
            scope.link = '';
            element.on('dragover dragend dragleave', preventDefaultBehaviour);
            element.on('drop', onDrag);

            function onDrag(event) {
                preventDefaultBehaviour(event);
                var image = event.dataTransfer.files[0];
                logger.info('Uploading image');
                imgur.upload(image).then(update_link);

                function update_link(model) {
                    scope.link = model.link;
                    var fn = scope.drop();
                    if ('undefined' !== typeof fn) {
                        fn(scope.link);
                    }
                }
            }

            function preventDefaultBehaviour(event) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
    }

    angular
        .module('abcss.core')
        .directive('starrating', starrating);

   function starrating () {
       return {
           restrict: 'A',
           template: '<ul class="rating">' +
           '<li ng-repeat="star in stars" ng-class="star" ng-click="toggle($index)">' +
           '<i class="fa fa-star"></i>' +
           '</li>' +
           '</ul>',
           scope: {
               ratingValue: '=',
               max: '=',
               onRatingSelected: '&'
           },
           link: link
       };

       function link (scope, elem, attrs) {
           var updateStars = function () {
               scope.stars = [];
               for (var i = 0; i < scope.max; i++) {
                   scope.stars.push({
                       filled: i < scope.ratingValue
                   });
               }
           };
           scope.toggle = function (index) {
               scope.ratingValue = index + 1;
               scope.onRatingSelected({
                   rating: index + 1
               });
           };
           scope.$watch('ratingValue', function (oldVal, newVal) {
               if (newVal) {
                   updateStars();
               }
           });
       }
   }
})();
