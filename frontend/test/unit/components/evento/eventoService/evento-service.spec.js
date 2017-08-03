(function () {
  'use strict';

  describe("testeEventoService", function () {

    var eventoService, $httpBackend, endpointChamada, $q, $rootScope, logger, $log;

    beforeEach(module('appEvento'));

    function executeRequestAndFlush() {
        $httpBackend.flush();
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    };
   
    beforeEach(inject(function (_eventoService_, _$httpBackend_,_$q_,_$rootScope_,_$log_) {
      eventoService = _eventoService_;
      $httpBackend = _$httpBackend_;
      $log = _$log_;  
    }));

    it("Deve cadastrar um evento", () => {

        var evento = {
            id: 10
        }

        $httpBackend
        .whenPOST('http://localhost:8080/eventos', evento)
        .respond(200);

        eventoService.cadastraEvento(evento);
        
        $httpBackend.expectPOST('http://localhost:8080/eventos',evento);
        
        executeRequestAndFlush();
    });


    it("Deve logar quando ocorrer erro ao cadastrar", () => {

        var evento = {
            id: 123
        }        

        $httpBackend
        .whenPOST('http://localhost:8080/eventos', evento)
        .respond(500, "deu pau");

        eventoService.cadastraEvento(evento).catch( (response) => {            
            expect($log.error.logs[0]).toEqual([`Erro ao realizar o cadastro: deu pau`]);                 
        });
        
        $httpBackend.expectPOST('http://localhost:8080/eventos', evento);
        
        executeRequestAndFlush();
        
    });

    it("Deve buscar um evento passando um Id como parâmetro", () => {

        var evento = { id: 10 }

        endpointChamada = `http://localhost:8080/eventos/${evento.id}`;       

        $httpBackend
        .whenGET(endpointChamada)
        .respond(200, evento)

        eventoService.buscaEvento(evento).then(function(response) {      
            expect(response.data).toEqual(evento);
        });

        $httpBackend.expectGET(endpointChamada);
        
        executeRequestAndFlush();

      });

    it("Deve retornar uma lista de eventos", () => {

        var eventoLista = [
            {"id": 564568},
            {"id": 584514},
            {"id": 785168},
            {"id": 324344}
        ]

        var eventoListaErro = [{"id": 781278}] 

        endpointChamada = 'http://localhost:8080/eventos';

        $httpBackend
        .whenGET(endpointChamada)
        .respond(200, eventoLista)

        eventoService.listaEventos().then(function(response) {
            expect(response.data).toEqual(eventoLista);
        });

        $httpBackend.expectGET(endpointChamada);
        
        executeRequestAndFlush();

    });

    it("Deve chamar a exportação em excel", () => {

       var blob = new Blob([], {type : 'application/vnd.ms-excel'});
    
       endpointChamada = 'http://localhost:8080/exportaeventos';

       $httpBackend
        .whenGET(endpointChamada)
        .respond(200, blob);

       eventoService.exportarExcel().then(function(response) {
         expect(response).toEqual(blob);      
       }); 

       $httpBackend.expectGET(endpointChamada);
       
       executeRequestAndFlush();

    });

  });

})();
