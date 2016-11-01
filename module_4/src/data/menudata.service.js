(function () {
'use strict';

angular.module('data')
.service('MenuDataService', MenuDataService)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


    MenuDataService.$inject = ['$q', '$http', 'ApiBasePath', '$filter'];
    
    function MenuDataService($q, $http, ApiBasePath, $filter) {
      var service = this;

      // Returns a promise, NOT items array directly
      service.getAllCategories = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + '/categories.json')
        })
        .success(function(data, status, headers, config) {
//            console.log(data);
            deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });

        return deferred.promise;

      };
      
      
      
      // Returns a promise, NOT items array directly
      service.getItemsForCategory = function (ShortName) {
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + '/menu_items.json?category=' + ShortName)
        })
        .success(function(data, status, headers, config) {
//            console.log(data);
            deferred.resolve(data);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });

        return deferred.promise;

      };
      
      // Returns a promise, NOT item array directly
      service.getItem = function (ShortName, itemId) {
        var deferred = $q.defer();

        $http({
            method: 'GET', 
            url: (ApiBasePath + '/menu_items.json?category=' + ShortName)
        })
        .success(function(data, status, headers, config) {
            var itemData = service.getFilteredItem(data.menu_items, itemId);
            var response = {"itemData": itemData, "category": data.category};
//            console.log(response);
            deferred.resolve(response);
        })
        .error(function(data, status, headers, config) {
            deferred.reject(status);
        });

        return deferred.promise;

      };
      
      service.getFilteredItem = function(dataArray, itemId){
          var itemData = '';
          itemData = $filter('filter')(dataArray, {id:itemId});

          return itemData;
      }


    }

})();
