
 var appEvento = angular.module('appEvento', [
   'ui.bootstrap',
   'ui.router',
   'toastr',
   'blockUI',
   'ngAnimate',
   'angularSpinkit',
   'ngFileSaver',
   'satellizer'
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

appEvento.constant('CONSTANTS', {
  API_URL_EVENTOS: "/sample/api/eventos/",
  API_URL_PDF: "/sample/api/exportapdf/",
  API_URL_EXCEL: "/sample/api/exportaexcel/",
  API_URL_USERS: "/sample/api/user/",
  API_URL_LOGOUT: "/sample/api/logout/"
})