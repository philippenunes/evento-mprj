
 var appEvento = angular.module('appEvento', [
   'ui.bootstrap',
   'ui.router',
   'toastr',
   'ngAnimate',
   'angularSpinkit',
   'ngFileSaver',
   'ngAnimate'
   ]);

appEvento.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

//Configuração global Toastr
appEvento.config(function(toastrConfig) {
  angular.extend(toastrConfig, {
    positionClass: 'toast-top-right',
    timeOut: 4000,
    maxOpened: 1,
    preventOpenDuplicates: true    
  });
});

let API_URL_BASE = "/sample/api";  

appEvento.constant('CONSTANTS', {  
  API_URL_EVENTOS: `${API_URL_BASE}/eventos/`,
  API_URL_PDF: `${API_URL_BASE}/exportapdf/`,
  API_URL_EXCEL: `${API_URL_BASE}/exportaexcel/`,
  API_URL_USERS: `${API_URL_BASE}/user/`,
  API_URL_LOGOUT: `${API_URL_BASE}/logout/`,
  API_URL_STATUS: `${API_URL_BASE}/status/`
})