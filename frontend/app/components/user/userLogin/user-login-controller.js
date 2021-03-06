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
            blockUI();
            var headers = vm.credentials ? {
                authorization : "Basic "
                + btoa(vm.credentials.username + ":"
                + vm.credentials.password)
            } : {};

            userService.login(headers)
                .then(getLoginSuccess)
                .catch(getLoginError);

            function getLoginSuccess(data) {
                $.unblockUI();
                $rootScope.authenticated = true;
                $rootScope.username = vm.credentials.username;
                $state.go('home');
                vm.error = false;
            }

            function getLoginError(message) {
                $.unblockUI();
                $rootScope.authenticated = false;
                $state.go('login');
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