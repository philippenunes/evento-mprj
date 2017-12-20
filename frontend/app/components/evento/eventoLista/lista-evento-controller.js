(function() {
'use strict';

    angular
        .module('appEvento')
        .controller('listaEventoController', listaEventoController);

    listaEventoController.$inject  = [
        'eventoService',
        'statusService',
        '$state',
        'toastr',
        'FileSaver',
        'Blob'];  

    function listaEventoController(eventoService , statusService, $state, toastr,
     FileSaver, Blob) {

        var vm = this;
        vm.init = init;
        vm.showdiv = false;
        vm.orderByDate = "orderByDate";
        vm.mostraLista = false;
        vm.listaEventos = listaEventos;
        vm.alteraEvento = alteraEvento;
        vm.listaStatus = listaStatus;
        vm.buscaEvento = buscaEvento;
        vm.exportaExcel = exportaExcel;
        vm.exportaPdf = exportaPdf;
        vm.listaPorParametro = listaPorParametro;
        vm.evento = {};
        vm.eventos = [];        

        vm.init();

        function init() {
            listaEventos();
            listaStatus();
        }

        function listaStatus() {
           statusService.getStatus()
            .then((data)=> {
                vm.status = data;
                vm.evento.status = vm.status[2];                
            }); 
        }

        function alteraEvento(evento) {
            $state.go('alterar', {
                evento : evento,
            });
        }
       
        function buscaEvento(evento) {
            eventoService.buscaEvento(evento)  
              .then(function (response) {
              vm.showdiv = true;  
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
                console.log(response)
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

          function listaPorParametro() {
           blockUI();   
           eventoService.listaPorParametro(vm.evento)
            .then(getListaSuccess)
            .catch(getListaError);

            function getListaSuccess(response) {
               if(response.data.length != 0) {
                 vm.eventos = response.data;
                  for (var i = 0 ; i < response.data.length ; i++){
                    response.data[i].data = new Date(response.data[i].data);
                }
                $.unblockUI();
                vm.mostraLista = true;
              } else {
                $.unblockUI();  
                vm.eventos = response.data;
                toastr.error('Nenhum registro encontrado!', 'Ocorreu um erro');
              } 
            }

            function getListaError() {
                $.unblockUI();
                toastr.error('Nenhum registro encontrado!', 'Ocorreu um erro');
            }
        }

        function exportaExcel() {
          blockUI();
            eventoService.exportarExcel()
            .then( function (data) {
                if (data !== null && data.size === 0) {
                    toaster.pop('Ocorreu um erro', 'Não foi possível exportar o arquivo!');
                } else {
                    var blob = new Blob([data], {type: 'application/vnd.ms-excel'});
                    FileSaver.saveAs(blob, 'relatorio-eventos.xlsx');
                }
            }).finally(function(){
            $.unblockUI();
            });
        }

        function exportaPdf() {
            blockUI();
            eventoService.exportaPdf()
            .then( function (data) {
                if (data !== null && data.size === 0) {
                    toaster.pop('Ocorreu um erro', 'Não foi possível exportar o arquivo!');
                } else {
                    var blob = new Blob([data], {type: 'application/pdf'});
                    FileSaver.saveAs(blob, 'relatorio-eventos.pdf');
                }
            }).finally(function(){
                $.unblockUI();
            });
        }

        
    }
})();