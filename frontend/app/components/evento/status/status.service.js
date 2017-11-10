(function() {
    'use strict';

    angular
        .module('appEvento')
        .service('statusService', statusService);

    function statusService($http, CONSTANTS) {

        var statusService = {
           getStatus : getStatus
        };
        return statusService;

        function getStatus() {
            var promise = $http.get(CONSTANTS.API_URL_STATUS)
                .then(getStatusSuccess);
               
            function getStatusSuccess(response) {            
                return response.data;
            }    
    
            return promise;
        }

    }
})();