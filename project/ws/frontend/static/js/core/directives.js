(function() {
    'use strict';

    angular
        .module('abcss.core')
        .directive('imgurdrop', imgurdrop);

    imgurdrop.$inject = ['logger', '$timeout', 'imgur'];
    function imgurdrop(logger, $timeout, imgur) {
        return {
            link: link
        };

        function link(scope, element) {
            imgur.setAPIKey('Client-ID 40dbfe0cfea73a7');
            scope.link = '';
            element.on('drop', onDrag);
            element.on('dragover dragend dragleave', preventDefaultBehaviour);

            function onDrag(event) {
                preventDefaultBehaviour(event);
                var image = event.dataTransfer.files[0];
                logger.info('Uploading image');
                imgur.upload(image).then(then);
                function then(model) {
                    scope.link = model.link;
                    logger.success('Uploaded Image! ' + scope.link);
                    $timeout(timeout, 2500);
                }
            }
            
            function preventDefaultBehaviour(event) {
                event.preventDefault();
                event.stopPropagation();
            }

            function timeout() {
                logger.alert('Upload Failed');
            }
        }
    }
})();
