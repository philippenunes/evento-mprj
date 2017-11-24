(function() {
'use strict';

    angular
           .module('appEvento')
           .controller('cadastroController', cadastroController);

    cadastroController.$inject  = ['eventoService', 'statusService', '$uibModal', '$scope', 'toastr', '$state']; 

    function cadastroController(eventoService, statusService, $uibModal, $scope, toastr, $state) {
       
    var vm = this;
    vm.numEventos;
    vm.evento = {};   
    vm.eventos = [];
    vm.listaStatus = listaStatus;
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
        listaStatus();
    }

     function listaStatus() {
           statusService.getStatus()
            .then((data)=> {
                console.log(data)
                vm.status = data;
                vm.evento.status = vm.status[2];                
            }); 
        }

    function quantidadeEventos() {
       eventoService.listaEventos()
       .then((response) => {
            vm.eventos = response.data;   
            vm.numEventos = vm.eventos.length;
       });        
    }

    function cadastraEvento() {
        console.log(vm.evento.status)
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

