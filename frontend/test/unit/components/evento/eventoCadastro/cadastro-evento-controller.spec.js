(() => {
  'use strict';

  describe("Cadastro Controller", () => {

    beforeEach(module('appEvento'));

    let vm, $q, $rootScope, $controller, $scope, toastrMock, eventoServiceMock;
   
    beforeAll(() => {      
    });

    toastrMock = {
        warning: () =>{ },
        error: () =>{ },
        success: () => {}
    };

    eventoServiceMock = {
      cadastraEvento: () => { }
    }

    beforeEach(inject(function (_$controller_, _$q_, _$rootScope_) {

      $q = _$q_;
      $rootScope = _$rootScope_;
      $scope = $rootScope.$new();
      $controller = _$controller_;

      vm = $controller('cadastroController', {

           eventoService: eventoServiceMock,
           $uibModal:null,
           $scope: $scope,
           toastr: toastrMock     
      });

    }));

    it("Deve criar object com sucesso", () => {
      expect(vm).toBeDefined();
    });


    it("Deve chamar toaster warning se nada for digitado", () => {
                      
        var deferred = $q.defer();        
        deferred.reject();        

        spyOn(eventoServiceMock, 'cadastraEvento').and.returnValue(
          deferred.promise
        );
        
        spyOn(toastrMock, 'warning');

        vm.evento = undefined;

        vm.cadastraEvento();

        $rootScope.$apply();

        expect(toastrMock.warning).toHaveBeenCalledWith('Preencha os campos!', 'Erro :(');
        expect(vm.cadastroSuccess).toBe(false);
  
    });

      it("Deve chamar toaster error com cadastro errado", () => {
                      
        var deferred = $q.defer();        
        deferred.reject();        

        spyOn(eventoServiceMock, 'cadastraEvento').and.returnValue(
          deferred.promise
        );
        
        spyOn(toastrMock, 'error');
      
        vm.evento = {};
      
        vm.cadastraEvento();

        $rootScope.$apply();

        expect(toastrMock.error).toHaveBeenCalled();
        expect(vm.cadastroSuccess).toBe(false);
  
    });

     it("Deve chamar toaster success", () => {
                      
        var deferred = $q.defer();      
        deferred.resolve();        

        spyOn(eventoServiceMock, 'cadastraEvento').and.returnValue(
          deferred.promise
        );
        
        spyOn(toastrMock, 'success');
      
        vm.cadastraEvento();

        $rootScope.$apply();

        expect(toastrMock.success).toHaveBeenCalledWith('Evento cadastrado!', 'Sucesso :)');
      
    });
   
    
  });
})();

