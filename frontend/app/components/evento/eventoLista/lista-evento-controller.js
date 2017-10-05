(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('listaEventoController', listaEventoController);

    listaEventoController.$inject  = [
        'eventoService',
        '$state',
        'toastr',
        'blockUI',
        'FileSaver',
        'Blob'];  

    function listaEventoController(eventoService , $state, toastr,
     blockUI, FileSaver, Blob) {

        var vm = this;
        vm.init = init;
        vm.orderByDate = "orderByDate";
        vm.mostraLista = false;
        vm.listaEventos = listaEventos;
        vm.buscaEvento = buscaEvento;
        vm.exportaExcel = exportaExcel;
        vm.exportaPdf = exportaPdf;
        vm.eventos = [];

        vm.init();

        function init() {
            listaEventos();
        }
       
        function buscaEvento(evento) {
            eventoService.buscaEvento(evento)  
              .then(function (response) {
              evento = response.data;
              evento.data = new Date(evento.data);     
              $state.go('listar.detalhes',{
                  evento : evento,
              });
           })  
             .catch(function (){
           });
        }

        function listaEventos() {
            eventoService.listaEventos()
            .then(getListaSuccess)
            .catch(getListaError);

            function getListaSuccess(response) {
               if(response != null) {
                 vm.eventos = response.data;
                  for (var i = 0 ; i < response.data.length ; i++){
                    response.data[i].data = new Date(response.data[i].data);
                }
                vm.mostraLista = true;
              } else {

              } 
            }

            function getListaError() {
                toastr.error('O servidor não está respondendo!', 'Ocorreu um erro');
            }
        }

        function exportaExcel() {
          blockUI.start();
            eventoService.exportarExcel()
            .then( function (data) {
                if (data !== null && data.size === 0) {
                    toaster.pop('Ocorreu um erro', 'Não foi possível exportar o arquivo!');
                } else {
                    var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
                    FileSaver.saveAs(blob, 'relatorio-eventos.xlsx');
                }
            }).finally(function(){
            blockUI.stop();
            });
        }

        function exportaPdf() {
            blockUI.start();
            eventoService.exportaPdf()
            .then( function (data) {
                if (data !== null && data.size === 0) {
                    toaster.pop('Ocorreu um erro', 'Não foi possível exportar o arquivo!');
                } else {
                    var blob = new Blob([data], {type: 'application/pdf'});
                    FileSaver.saveAs(blob, 'relatorio-eventos.pdf');
                }
            }).finally(function(){
              blockUI.stop();
            });
        }

        
    }
})();