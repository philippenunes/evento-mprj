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

        function alteraEvento() {
           var promise = eventoService.alteraEvento(vm.evento)
            .then(function(data) {
                $uibModalInstance.close(true);
                if(data === true) {
                    toastr.success('O Registro foi alterado!', 'Sucesso');
                  } 
                 $state.go('listar'); 
            }).catch(function() {
                $uibModalInstance.dismiss();
                toastr.error('Verifique os campos!', 'Registro não alterado'); 
            });
            return promise;
        }
    }
})();

