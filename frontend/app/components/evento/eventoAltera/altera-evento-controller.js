(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('alteraEventoController', alteraEventoController);

       alteraEventoController.$inject  = ['eventoService', '$uibModal', '$state', '$scope', 'toastr'];

    function alteraEventoController(eventoService, $uibModal, $state, $scope, toastr) {
        var vm = this;
        vm.init = init;
        vm.evento = {};
        vm.alteraEvento = alteraEvento;
        vm.init();

        function init() {
            vm.evento = $state.params.evento;
        };

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
            }).result
            .then( (data) => {
                 if( data === true) {
                   toastr.success('O Registro foi alterado!', 'Sucesso :)');
                 } 
                $state.go('listar'); 
            })
            .catch( () => {
                toastr.error('Verifique os campos!', 'Registro não alterado :(');    
            })
        }
     }
})();