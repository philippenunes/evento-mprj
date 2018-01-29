(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('alteraEventoController', alteraEventoController);

    alteraEventoController.$inject  = ['eventoService', 'statusService', '$uibModal', '$state', '$scope', 'toastr'];

    function alteraEventoController(eventoService, statusService, $uibModal, $state, $scope, toastr) {

        var vm = this;
        vm.init = init;
        vm.evento = {};
        vm.cancelaAlteracao = cancelaAlteracao;  
        vm.alteraEvento = alteraEvento;
        vm.listaStatus = listaStatus;
        vm.init();

        function init() {
            vm.evento = $state.params.evento;
            listaStatus(vm.evento.status);
        };

        function cancelaAlteracao() {
            $state.go('listar');
        }

        /*
         *  Busca o status do evento solicitado e coloca na combo.
         */    
        function listaStatus(status) {
           statusService.getStatus()
            .then((data)=> {
                vm.status = data;
                vm.evento.status = status;                
            }); 
        }

        function alteraEvento() {
            return $uibModal.open({
                templateUrl:"components/evento/eventoAltera/altera-confirmacao.html",
                controller: 'ModalInstanceConfirmaAlteracaoController',
                controllerAs: 'vm',
                resolve: {
                    objeto: () => {
                        return {evento: vm.evento};
                   }
                }
            })
        }
     }
})();