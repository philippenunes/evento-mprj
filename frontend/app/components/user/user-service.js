(function() {
'use strict';

    angular
        .module('appEvento')
        .factory('userService', userService);

    function userService($http, $q) {

        var userService = {
            login : login
        }

        return userService;

        function login(headers) {
            var promise = $http.get('http://localhost:8080/usuario', {headers : headers})
            .then(getLoginSuccess)
            .catch(getLoginError);

            function getLoginSuccess(response) {
                return response;
            }

            function getLoginError(err) {
                return $q.reject({status:err.status, statusText:err.statusText});
            }
            return promise;
        }
    }
})();