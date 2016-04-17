(function(){

    angular
        .module('abcss.core')
        .factory('storageservice', storageservice);

    storageservice().$inject = ['$sessionStorage', 'logger'];
    function storageservice($sessionStorage, logger) {
        var service = {
            setToken: setToken,
            clearToken: clearToken,
            getToken: getToken,
            setName: setName,
            clearName: clearName,
            getName: getName,
            setUID: setUID,
            clearUID: clearUID,
            getUID: getUID,
            setProfilePicture: setProfilePicture,
            clearProfilePicture: clearProfilePicture,
            getProfilePicture: getProfilePicture
        };

        return service;
    //Authentication & Authorization
        // Token storage
        function setToken(token){
            $sessionStorage.token = token;
        }

        function clearToken(){
            $sessionStorage.token = null;
        }

        function getToken(){
            return $sessionStorage.token;
        }

        function setName(name){
            $sessionStorage.name = name;
        }

        function clearName(){
            $sessionStorage.name = null;
        }

        function getName(){
            return $sessionStorage.name;
        }
        function setUID(uid){
            $sessionStorage.uid = uid;
        }

        function clearUID(){
            $sessionStorage.uid = null;
        }

        function getUID(){
            return $sessionStorage.uid;
        }

        //Role storage
        function setRole(role){
            $sessionStorage.role = role;
        }

        function clearRole(){
            $sessionStorage.role = null;
        }

        function getRole(){
            return $sessionStorage.role;
        }
//Keep track of Page State
        //Home state storage
        function setProfilePicture(picture){
            $sessionStorage.profilePicture = picture;
        }

        function getProfilePicture(){
            return $sessionStorage.profilePicture;
        }

        function clearProfilePicture(){
            $sessionStorage.profilePicture = null;
        }
    }

})();
