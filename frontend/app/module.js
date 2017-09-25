
 var appEvento = angular.module('appEvento', [
   'ui.bootstrap',
   'ui.router',
   'toastr',
   'blockUI',
   'ngAnimate',
   'angularSpinkit',
   'ngFileSaver',
   ]);

appEvento.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

//Configuração global Toastr
appEvento.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-center',
    timeOut: 4000,
  });
});
