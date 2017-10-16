(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('userInfoController', userInfoController);

    function userInfoController($http, $state, userService) {
        var vm = this;
        vm.init = init;
        vm.getPrincipal = getPrincipal;
        vm.user;
        vm.init();

        function init() {
           // vm.user = $state.params.userAuthenticated.data.principal;
           vm.getPrincipal()
        }

        function getPrincipal() {
           userService.login()
           .then(function (response) {
               vm.user = response.data.principal;
           })
        }
    }
})();