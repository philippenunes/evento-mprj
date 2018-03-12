(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('ModalInstanceConfirmaAlteracaoController', ModalInstanceConfirmaAlteracaoController);

    ModalInstanceConfirmaAlteracaoController.inject = ['eventoService', '$uibModalInstance', 'objeto', 'toastr'];

    function ModalInstanceConfirmaAlteracaoController(eventoService, $uibModalInstance, objeto, toastr) {
        var vm = this;
        vm.alteraEvento = alteraEvento;
        vm.evento = objeto.evento;
        vm.closeModal = closeModal;

        function alteraEvento() {
           eventoService.alteraEvento(vm.evento)
            .then(() => {
                $uibModalInstance.close(true);
            }).catch(() => {
                $uibModalInstance.dismiss();
            });
        }

        function closeModal() {
            $uibModalInstance.close(false);
        }
    }
})();

