(function() {
'use strict';

    angular
        .module('appEvento')
        .factory('userService', userService);

    function userService($http, $q, CONSTANTS) {

        var userService = {
            login : login,
            logout : logout,
            getPrincipal : getPrincipal
           // isAuthenticated : isAuthenticated
        }

        return userService;

        // function isAuthenticated() {
        //     let authenticated = localStorage.getItem("currentUser");     
        //     let isAuthenticated = authenticated ? true: false;      
        //     return isAuthenticated;
        // }

        function getPrincipal() {
            login().then(function (response) {
                return response.data.principal;  
            })
        }

        function logout() {
         var promise = $http.post(CONSTANTS.API_URL_LOGOUT)    
          .then(getLogoutSuccess)
          .catch(getLogoutError);

            function getLogoutSuccess(response) {
                return $q.when();
            }

            function getLogoutError(err) {
                return $q.reject({status:err.status, statusText:err.statusText});
            }

        return promise;
        }

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