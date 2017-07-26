(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('userLoginController', userLoginController); 

    userLoginController.$inject  = ['userService', '$rootScope', '$state'];    

    function userLoginController(userService, $rootScope, $state) {

        var vm = this;
        vm.error = false;
        vm.credentials = {};
        vm.login = login;
        vm.limpaUsuario = limpaUsuario;

    function limpaUsuario() {
        vm.credentials = {};
    }    

        function login() {
        console.log('user controller');
        console.log(vm.credentials);
        var headers = vm.credentials ? {
            authorization : "Basic "
            + btoa(vm.credentials.username + ":"
            + vm.credentials.password)
        } : {};

        userService.login(headers)
            .then(getLoginSuccess)
            .catch(getLoginError);

        function getLoginSuccess(data) {
            $state.go('home');
            $rootScope.authenticated = true;
            $rootScope.principal = data.principal;
            vm.error = false;
        }

        function getLoginError(message) {
            $state.go('login');
            $rootScope.authenticated = false;
            $rootScope.principal = null;
            vm.error = true;
        }
        }
    }
     
})();