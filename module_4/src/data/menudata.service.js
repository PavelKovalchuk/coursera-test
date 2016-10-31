(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    MenuDataService.$inject = ['$q', '$http', 'ApiBasePath'];
    
    function MenuDataService($q, $http, ApiBasePath) {
      var service = this;

      // Returns a promise, NOT items array directly
      service.getAllCategories = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + '/categories.json')
        })
        .success(function(data, status, headers, config) {
            deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });

        return deferred.promise;

      };


    }

})();
