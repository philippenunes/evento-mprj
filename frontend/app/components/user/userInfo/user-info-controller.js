(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('userInfoController', userInfoController);

     
    function userInfoController($http) {
        var vm = this;
        vm.init = init;
        vm.olaMundo = olaMundo;
        vm.init();


        function olaMundo() {
        $http({method:'GET', url:'http://localhost:8080/eventos'})
        .then(function (response){
              
        }, function (response){
    
        });
      } 

        function init() { }
    }
})();