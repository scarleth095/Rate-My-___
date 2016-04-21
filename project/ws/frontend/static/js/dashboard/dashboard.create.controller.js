(function() {
    'use strict';

    angular
        .module('abcss.dashboard')
        .controller('CreateController', CreateController);

    CreateController.$inject = ['dataservice', 'logger', '$uibModal'];
    function CreateController(dataservice, logger, $uibModal) {
        var cm = this;
        cm.tags = [];
        cm.loadTags = loadTags;
        cm.openImgurModal = openImgurModal;

        function loadTags($query){
            //logger.info($query);
            return dataservice.getTags();
        }

        function openImgurModal(){
            var modalConfig = {
                templateUrl: 'templates/imgur_modal.html',
                controller: 'ImgurModalController',
                size: 'lg'
            };
            var modalInstance = $uibModal.open(modalConfig);
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
        $scope.handleDrop = handleDrop;
        
        function handleDrop() {
            alert('Item has been dropped');
        }
        
        function ok() {
            $uibModalInstance.close();
        }

        function cancel() {
            $uibModalInstance.dismiss('cancel');
        }
    }
})();