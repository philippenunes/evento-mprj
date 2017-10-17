(function(){
    'use strict';


    angular
        .module('appEvento')
        .controller('detalheEventoController', detalheEventoController)

          detalheEventoController.$inject = ['eventoService', '$state', '$scope', '$uibModal', 'toastr']    

    function detalheEventoController(eventoService, $state, $scope, $uibModal, toastr){
        var vm = this;
        vm.init = init;
        vm.alteraEvento = alteraEvento;
        vm.excluiEvento = excluiEvento;
        vm.isEmpty = isEmpty;
        vm.evento = {};
        vm.init();


        //Verifica se objeto está vazio
        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        function init() {
            vm.evento = $state.params.evento;
            if(isEmpty(vm.evento)){
                $state.go('listar');
            }
        };

        function alteraEvento() {
            $state.go('alterar', {
                evento : this.evento,
            });
        }

        function excluiEvento() {
            return $uibModal.open({
                templateUrl:"components/evento/eventoDetalhe/exclui-confirmacao.html",
                controller: 'ModalExcluiConfirmacaoController',
                controllerAs: 'vm',
                resolve: {
                    objeto: () => {
                        return {evento: this.evento};
                   }
                }
            }).result
            .then( (data) => {
                 if( data === true) {
                   toastr.success('Registro excluído!', 'Sucesso');
                   $state.go('listar', {}, { reload: 'listar' });
                 } 
            })
            .catch( () => {
                 toastr.error('O registro não foi excluído!', 'Ocorreu um erro');
            })
        }
    }

}());