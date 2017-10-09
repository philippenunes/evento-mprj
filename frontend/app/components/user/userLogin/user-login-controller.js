(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('userLoginController', userLoginController); 

    userLoginController.$inject  = ['userService', '$rootScope', '$state', 'toastr'];    

    function userLoginController(userService, $rootScope, $state, toastr) {

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
            vm.error = false;
        }

        function getLoginError(message) {
            $state.go('login');
            $rootScope.authenticated = false;
            vm.error = true;
         }
        }


        function logout(){
            userService.logout()
                .then(getLogoutSuccess)
                .catch(getLogoutError);

            function getLogoutSuccess(){
                $rootScope.authenticated = false;
                $rootScope.principal = null;
                vm.error = false;
                $state.go("login");
            }

            function getLogoutError(){
                vm.error = true;
            }
        }
    }
     
})();