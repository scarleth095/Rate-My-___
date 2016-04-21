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
})();
