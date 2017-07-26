(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('ModalExcluiConfirmacaoController', ModalExcluiConfirmacaoController);

    ModalExcluiConfirmacaoController.inject = ['eventoService', '$uibModalInstance', 'objeto'];

    function ModalExcluiConfirmacaoController(eventoService, $uibModalInstance, objeto) {
        var vm = this;
        vm.excluiEvento = excluiEvento;
        vm.closeModal = closeModal;
        vm.evento = objeto.evento;

        function excluiEvento() {
            eventoService.excluiEvento(vm.evento)
            .then(() => {
                $uibModalInstance.close(true);
            }).catch( () => {
                $uibModalInstance.dismiss();
            });
        }

        function closeModal() {
          $uibModalInstance.close(false);
        }
    }
})();