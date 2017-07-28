(function() {
'use strict';

    angular
           .module('appEvento')
           .controller('cadastroController', cadastroController);

    cadastroController.$inject  = ['eventoService', '$uibModal', '$scope', 'toastr']; 

    function cadastroController(eventoService, $uibModal, $scope, toastr) {
       
    var vm = this;
    vm.evento = {};   
    vm.cadastraEvento = cadastraEvento;
    vm.isEmpty = isEmpty;

    function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
    }

    function cadastraEvento() {
        eventoService.cadastraEvento(vm.evento)
        .then(getCadastroSuccess)
        .catch(getCadastroError);

        function getCadastroSuccess(data) {
         vm.evento = data;
         toastr.success('Evento cadastrado!', 'Sucesso'); 
        }

        function getCadastroError() {
        if(isEmpty(vm.evento)) {
            toastr.warning('Preencha os campos!', 'Erro');
         }else {
             toastr.error('Verifique os campos!', 'Erro ao cadastrar');
         }
        vm.cadastroSuccess = false;  
        }
     }
    }
})();

