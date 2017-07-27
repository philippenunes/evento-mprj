(function () {
  'use strict';

  describe("testeEventoService", function () {

    var eventoService, $httpBackend, endpointChamada, $q, $rootScope, logger;

    beforeEach(module('appEvento'));
   
    beforeEach(inject(function (_eventoService_, _$httpBackend_,_$q_,_$rootScope_) {
      eventoService = _eventoService_;
      $httpBackend = _$httpBackend_;      
    }));

    it("Deve cadastrar o evento", () => {

        var evento = {
            id: 123
        }

        $httpBackend
        .whenPOST('http://localhost:8080/eventos', evento)
        .respond(200);

        eventoService.cadastraEvento(evento);
        
        $httpBackend.expectPOST('http://localhost:8080/eventos',evento);
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


    xit("Deve logar quando ocorrer erro", () => {

        var evento = {
            id: 123
        }

        $httpBackend
        .whenPOST('http://localhost:8080/eventos', evento)
        .respond(500, {data:"deu pau"});

        eventoService.cadastraEvento(evento).catch( (response) => {
            console.log(response);
        });
        
        $httpBackend.expectPOST('http://localhost:8080/eventos', evento);
        $httpBackend.flush();

        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });


  });

})();
