(function() {
'use strict';

    angular
           .module('appEvento')
           .controller('cadastroController', cadastroController);

    cadastroController.$inject  = ['eventoService', '$uibModal', '$scope', 'toastr', '$state']; 

    function cadastroController(eventoService, $uibModal, $scope, toastr, $state) {
       
    var vm = this;
    vm.numEventos;
    vm.evento = {};   
    vm.eventos = [];
    vm.cadastraEvento = cadastraEvento;
    vm.isEmpty = isEmpty;
    vm.init = init;

    vm.init();

    function isEmpty(obj) {
    for(var prop in obj) {
        if(obj.hasOwnProperty(prop))
            return false;
    }
    return true;
    }

    function init() {
        quantidadeEventos();
    }

    function quantidadeEventos() {
       eventoService.listaEventos()
       .then((response) => {
            vm.eventos = response.data;   
            vm.numEventos = vm.eventos.length;
       });        
    }

    function cadastraEvento() {
        eventoService.cadastraEvento(vm.evento)
        .then(getCadastroSuccess)
        .catch(getCadastroError);

        function getCadastroSuccess() {        
         toastr.success('Evento cadastrado!', 'Sucesso'); 
         $state.go('listar', {}, {reload: true});
        }

        function getCadastroError() {
        if(isEmpty(vm.evento)) {
            toastr.warning('Nenhum valor informado', 'Error');
         } else {            
             toastr.error('Verifique os campos', 'Error');
         }
        vm.cadastroSuccess = false;  
        }
     }
    }
})();

