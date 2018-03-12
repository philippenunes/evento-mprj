(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('ModalEncerraSolicitacaoConfirmacaoController', ModalEncerraSolicitacaoConfirmacaoController);

        ModalEncerraSolicitacaoConfirmacaoController.inject = ['eventoService', '$uibModalInstance', 'objeto'];

    function ModalEncerraSolicitacaoConfirmacaoController(eventoService, $uibModalInstance, objeto) {
        var vm = this;
        vm.encerraSolicitacao = encerraSolicitacao;
        vm.closeModal = closeModal;
        vm.evento = objeto.evento;

        function encerraSolicitacao() {
            eventoService.encerraSolicitacao(vm.evento)
            .then(() => {
                $uibModalInstance.close(true);
            }).catch( () => {
                $uibModalInstance.dismiss();
            });
        }

        function closeModal() {
          $uibModalInstance.dismiss();
        }
    }
})();