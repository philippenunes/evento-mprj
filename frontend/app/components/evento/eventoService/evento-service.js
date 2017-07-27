(function() {
'use strict';

    angular
        .module('appEvento')
        .factory('eventoService', eventoService);  

    function eventoService($http, $q) {

        var eventoService = {
           cadastraEvento : cadastraEvento,
           alteraEvento : alteraEvento,
           buscaEvento : buscaEvento,
           excluiEvento : excluiEvento,
           listaEventos : listaEventos,
           exportarExcel : exportarExcel
        };

        return eventoService;

        function cadastraEvento(evento) {
            var promise = $http.post('http://localhost:8080/eventos', evento)
                .then(getCadastroSuccess)
                .catch(getCadastroError);

            function getCadastroSuccess(response) {
                return response.data;
            }    
            function getCadastroError(err) {
                //logger.error('XHR Failed for alteraEvento.' + error.data);
                return Promise.reject();                
            }
            
            return promise;
        }

        function alteraEvento(evento) {
            var promise = $http.put('http://localhost:8080/eventos', evento)
                .then(getAlteraSuccess)
                .catch(getAlteraError);

                function getAlteraSuccess(response) {
                    return response.data;
                }    
                function getAlteraError(err) {
                    return err.data;
                     logger.error('XHR Failed for alteraEvento.' + error.data);
                }
            return promise;
        }

        function buscaEvento(evento) {
            var promise = $http.get('http://localhost:8080/eventos/'+evento.id)
                .then(getBuscaEventoSuccess)
                .catch(getBuscaEventoError);

                function getBuscaEventoSuccess(response) {
                    return response;
                }
                function getBuscaEventoError(error) {
                    logger.error('XHR Failed for buscaEvento.' + error.data);
                }
            return promise;
        }

        function excluiEvento(evento) {
            var promise = $http.delete('http://localhost:8080/eventos/'+evento.id)
                .then(getExcluiSuccess)
                .catch(getExcluiError);
                
                function getExcluiSuccess(response) {
                    return response.data.results;
                }
                function getExcluiError(error) {
                    logger.error('XHR Failed for excluiEvento.' + error.data);
                }
            return promise;
        }

        function listaEventos() {
            var promise = $http.get('http://localhost:8080/eventos')
                .then(getExcluiSuccess)
                .catch(getExcluiError);

                function getExcluiSuccess(response) {
                    return response;
                }
                function getExcluiError(error) {
                    logger.error('XHR Failed for listaEventos.' + error.data);
                }
            return promise;    
        }

        function exportarExcel() {
            console.log("ahnsadsdhkjjah");
             var promise = $http.get('http://localhost:8080/exportaeventos', {
              responseType: 'blob',
              headers:{
                    Accept:'application/vnd.ms-excel'
               }
              }).then(function (response) {
                   return response.data;
              });
                   return promise;
          }
    }
})();