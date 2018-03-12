(function(){
    'use strict';


    angular
        .module('appEvento')
        .controller('detalheEventoController', detalheEventoController)

          detalheEventoController.$inject = [
              'eventoService',
              '$state',
              '$scope',
              '$uibModal',
              'toastr',
              'objeto',
              '$uibModalInstance'
            ]    

    function detalheEventoController(eventoService, $state, $scope, $uibModal, toastr, objeto, $uibModalInstance){
        var vm = this;
        vm.init = init;
        vm.closeModal = closeModal;
        vm.encerraSolicitacao = encerraSolicitacao;
        vm.alteraEvento = alteraEvento;
        vm.isEmpty = isEmpty;
        vm.evento = objeto.evento;
        vm.init();


        //Verifica se objeto está vazio
        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        function init() {
            // vm.evento = $state.params.evento;
            // if(isEmpty(vm.evento)){
            //     $state.go('listar');
            // } else {
            //     modalDetalhes();
            // }
        };

        function closeModal() {
            $uibModalInstance.dismiss();
        }

        function alteraEvento() {
            closeModal();
            $state.go('alterar', {
                evento : vm.evento,
            });
        }

        function encerraSolicitacao() {
            return $uibModal.open({
                templateUrl:"components/evento/eventoDetalhe/encerra-confirmacao.html",
                controller: 'ModalEncerraSolicitacaoConfirmacaoController',
                controllerAs: 'vm',
                resolve: {
                    objeto: () => {
                        return {evento: this.evento};
                   }
                }
            }).result
            .then( (data) => {
                 if( data === true) {
                   $uibModalInstance.dismiss();  
                   toastr.success('Solicitação encerrada!', 'Sucesso');
                   $state.go('listar', {}, { reload: 'listar' });
                 } 
            })
            .catch( () => {
                 toastr.error('A solicitação não foi encerrada!', 'Ocorreu um erro');
            })
        }
    }

}());