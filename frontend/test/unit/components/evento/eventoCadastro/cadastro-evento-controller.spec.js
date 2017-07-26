(() => {
  'use strict';

  describe("Cadastro Controller", () => {

    beforeEach(module('appEvento'));

    let vm, $q, $rootScope, $controller, $scope, toasterMock;
   
    beforeAll(() => {      
    });

    toastrMock = {
        warning: () =>{ }
    };

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_) {

      $q = _$q_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = _$controller_;

      vm = $controller('cadastroController', {
          eventoService:null,
           $uibModal:null,
           $scope: $scope,
           toastr: toastrMock     
      });

    }));

    it("Deve criar object com sucesso", () => {
      expect(vm).toBeDefined();
    });    

    it("Deve cadastrar um evento no banco", () => {
      
      
    });


  });
})();

