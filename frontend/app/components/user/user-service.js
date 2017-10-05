(function() {
'use strict';

    angular
        .module('appEvento')
        .factory('userService', userService);

    function userService($http, $q, CONSTANTS) {

        var userService = {
            login : login
        }

        return userService;

        function login(headers) {
            var promise = $http.get(CONSTANTS.API_URL_USERS, {headers : headers})
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