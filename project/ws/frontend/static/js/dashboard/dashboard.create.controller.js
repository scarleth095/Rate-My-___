(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('CreateController', CreateController);

    CreateController.$inject = ['dataservice', 'logger', '$uibModal', '$window'];
    function CreateController(dataservice, logger, $uibModal, $window) {
        var cm = this;
        cm.tags = [];
        cm.imgur_link = '';
        cm.description = '';
        cm.title = '';

        cm.imgur_uploaded = false;
        cm.loadTags = loadTags;
        cm.openImgurModal = openImgurModal;
        cm.openImgurLink = openImgurLink;
        cm.createPost = createPost;

        function createPost()
        {
            if (cm.imgur_uploaded) {
                var create = {
                    title: cm.title,
                    description: cm.description,
                    url: cm.imgur_link,
                    tags: cm.tags
                }
            }
            else {
                var create = {
                    title: cm.title,
                    description: cm.description,
                    tags: cm.tags
                }
            }
            dataservice.createPost(create);
        }

        function loadTags($query){
            //logger.info($query);
            return dataservice.getTags();
        }

        function openImgurLink () {
            $window.open(cm.imgur_link, '_blank');
        }

        function openImgurModal(){
            var modalConfig = {
                templateUrl: 'templates/imgur_modal.html',
                controller: 'ImgurModalController',
                size: 'lg'
            };
            var modalInstance = $uibModal.open(modalConfig);

            modalInstance.result.then(onOk);

            function onOk(data){
                cm.imgur_link = data;
                cm.imgur_uploaded = true;
            }
        }
    }

    angular
        .module('abcss.dashboard')
        .controller('ImgurModalController', ImgurModalController);

    ImgurModalController.$inject = ['$scope', '$uibModalInstance', 'logger'];
    function ImgurModalController($scope, $uibModalInstance, logger) {
        $scope.ok = ok;
        $scope.cancel = cancel;
        $scope.link = null;
        $scope.uploaded = false;
        $scope.message = "Drop an Image!";
        $scope.handleDrop = handleDrop;
        
        function handleDrop(link) {
            $scope.message = "Image Uploaded!";
            $scope.link = link;
            $scope.uploaded = true;
        }
        
        function ok() {
            $uibModalInstance.close($scope.link);
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();