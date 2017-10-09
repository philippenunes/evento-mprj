(function(){

'use strict';
angular.module('appEvento').directive('appLogoutUser',appLogoutUser);

function appLogoutUser(){

  var directive = {
    restrict: 'A',
    link:linkFunc,
    controller: UserLogoutController,
    bindToController: true
  };

  return directive;

  function linkFunc(scope,el,attr,vm){
    el.on('click',function(event){
      event.preventDefault();
      vm.logout();
    });
  }
}

angular.module('appEvento').controller('UserLogoutController',UserLogoutController);

UserLogoutController.$inject  = ['$rootScope','userService','$state'];

function UserLogoutController($rootScope,userService,$state){
  var vm = this;
  vm.logout = logout;

  function logout(){
    userService.logout()
      .then(getLogoutSuccess)
      .catch(getLogoutError);

    function getLogoutSuccess(){
      $rootScope.authenticated = false;
      vm.error = false;
      $state.go("login");
    }

    function getLogoutError(){
      vm.error = true;
    }
  }
}

})();
