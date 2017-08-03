(() => {
  'use strict';

  describe("Lista Controller", () => {

    beforeEach(module('appEvento'));

    let vm, $q, $rootScope, $controller, $scope, toastrMock, eventoServiceMock, modalMock;
   
    beforeAll(() => {      
    });

    modalMock = {
        confirma: () => {}
    }

    toastrMock = {
        warning: () =>{ },
        error: () =>{ },
        success: () => {}
    };

    eventoServiceMock = {
      listaEvento: () => { }
    }

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_) {

      $q = _$q_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = _$controller_;

      vm = $controller('listaEventoController', {

           eventoServiceMock: eventoServiceMock,
           $uibModal:null,
           $scope: $scope,
           toastr: toastrMock     
      });

    }));

    fit("Deve criar object com sucesso", () => {
      expect(vm).toBeDefined();
    });

    fit("Deve chamar modal confirmação ao pressionar botão excluir", () => {

        
        
    });    
  });
})();

