(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('listaEventoController', listaEventoController);

    listaEventoController.$inject  = [
        'eventoService',
        '$uibModal',
        '$state',
        'toastr',
        'blockUI',
        'FileSaver',
        'Blob'];  

    function listaEventoController(eventoService, $uibModal, $state, toastr,
     blockUI, FileSaver, Blob) {

        var vm = this;
        vm.init = init;
        vm.listaEventos = listaEventos;
        vm.excluiEvento = excluiEvento;
        vm.buscaEvento = buscaEvento;
        vm.exportaExcel = exportaExcel;
        vm.eventoBuscado = {};
        vm.eventos = [];

        vm.init();

        function init() {
            listaEventos();
        }


        //Busca no banco o evento a ser alterado
        function buscaEvento(evento) {
            eventoService.buscaEvento(evento)  
              .then(function (response) {
              evento = response.data;
              evento.data = new Date(evento.data);     
              $state.go('alterar', {
                  evento : evento,
              });
           })  
             .catch(function (){
           });
        }

        function excluiEvento(evento) {
            return $uibModal.open({
                templateUrl:"components/evento/eventoLista/exclui-confirmacao.html",
                controller: 'ModalExcluiConfirmacaoController',
                controllerAs: 'vm',
                resolve: {
                    objeto: () => {
                        return {evento: evento};
                   }
                }
            }).result
            .then( (data) => {
                 if( data === true) {
                   toastr.success('Registro excluído!', 'Sucesso :)');
                 } 
                 listaEventos();
            })
            .catch( () => {
                 toastr.error('O registro não foi excluído!', 'Erro :(');
                 listaEventos();  
            })
        }

        function listaEventos() {
            eventoService.listaEventos()
            .then(getListaSuccess)
            .catch(getListaError);

            function getListaSuccess(response) {
                 vm.eventos = response.data;
              for (var i = 0 ; i < response.data.length ; i++){
                response.data[i].data = new Date(response.data[i].data);
              }
            }

            function getListaError() {
                toastr.error('O servidor não está respondendo!', 'Ocorreu um erro :(');
            }
        }

        function exportaExcel() {
            blockUI.start();
            eventoService.exportarExcel()
            .then( function (data) {
                if (data !== null && data.size === 0) {
                    toaster.pop('Ocorreu um erro :(', 'Não foi possível exportar o arquivo!');
                } else {
                    var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
                    FileSaver.saveAs(blob, 'relatorio-eventos.xlsx');
                }
            }).finally(function(){
              blockUI.stop();
            });
        }
    }
})();