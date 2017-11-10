(function() {
'use strict';

    angular
        .module('appEvento')
        .factory('eventoService', eventoService);  

    function eventoService($http, $q, $log, CONSTANTS) {

        var eventoService = {
           cadastraEvento : cadastraEvento,
           alteraEvento : alteraEvento,
           buscaEvento : buscaEvento,
           excluiEvento : excluiEvento,
           listaEventos : listaEventos,
           listaPorParametro : listaPorParametro,
           exportarExcel : exportarExcel,
           exportaPdf : exportaPdf
        };

        return eventoService;

        function cadastraEvento(evento) {
            evento.status = 'PD';
            var promise = $http.post(CONSTANTS.API_URL_EVENTOS, evento)
                .then(getCadastroSuccess)
                .catch(getCadastroError);

            function getCadastroSuccess(response) {            
                return response.data;
            }    
            function getCadastroError(err) {                
                $log.error(`Erro ao realizar o cadastro: ${err.data}`); 
                return $q.reject();                
            }
            
            return promise;
        }

        function alteraEvento(evento) {
            var promise = $http.put(CONSTANTS.API_URL_EVENTOS, evento)
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
            var promise = $http.get(CONSTANTS.API_URL_EVENTOS + evento.id)
                .then(getBuscaEventoSuccess)
                .catch(getBuscaEventoError);

                function getBuscaEventoSuccess(response) { 
                    //$log.info(`evento retornado: ${response.data}`);                  
                    return response;
                }
                function getBuscaEventoError(error) {                    
                    logger.error('XHR Failed for buscaEvento.' + error.data);
                }
            return promise;
        }

        function excluiEvento(evento) {
            var promise = $http.delete(CONSTANTS.API_URL_EVENTOS + evento.id)
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
            var promise = $http.get(CONSTANTS.API_URL_EVENTOS)
                .then(getListaSuccess)
                .catch(getListaError);

                function getListaSuccess(response) {
                    return response;
                }
                function getListaError(err) {
                    $log.error(`Erro ao realizar o cadastro: ${err.data}`);
                }
            return promise;    
        }

        function listaPorParametro(evento) {
            // var promise = $http.post(`/mgp-corregedoria/api/${ngsalConfig.apiVersion}/promotor`, {


            var promise = $http.get(`${CONSTANTS.API_URL_EVENTOS}lista?registro=${evento.registro}&data=${evento.data.toISOString()}&status=${evento.status.sigla}`)
                .then(getListaSuccess)
                .catch(getListaError);

                function getListaSuccess(response) {
                    return response;
                }
                function getListaError(err) {
                    $log.error(`Erro ao realizar o cadastro: ${err.data}`);
                }
            return promise;    
        }

        function exportarExcel() {
             var promise = $http.get(CONSTANTS.API_URL_EXCEL, {
              responseType: 'blob',
              headers:{
                    Accept:'application/vnd.ms-excel'
               }
              }).then(function (response) {
                   return response.data;
              });
                   return promise;
          }

          function exportaPdf() {
             var promise = $http.get(CONSTANTS.API_URL_PDF, {
              responseType: 'blob',
              headers:{
                    Accept:'application/pdf'
               }
              }).then(function (response) {
                   return response.data;
              });
                   return promise;
          }
    }
})();