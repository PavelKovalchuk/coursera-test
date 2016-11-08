(function () {
"use strict";

angular.module('common')
.service('MenuService', MenuService);


MenuService.$inject = ['$http', 'ApiPath'];
function MenuService($http, ApiPath) {
  var service = this;
  
  service.user = '';

  service.getCategories = function () {
    return $http.get(ApiPath + '/categories.json').then(function (response) {
      return response.data;
    });
  };


  service.getMenuItems = function (category) {
    var config = {};
    if (category) {
      config.params = {'category': category};
    }

    return $http.get(ApiPath + '/menu_items.json', config).then(function (response) {
      return response.data;
    });
  };
  
  service.getMenuItemByShortName = function (shortName) {
    
        return $http.get(ApiPath + '/menu_items/' + shortName + '.json');
   
  };
  
  service.getRegisteredInfo = function () {
        if( service.user !== ''){
            return service.user;
        }else{
            return false;
        }
        
   
  };
  
  service.getCategory = function (shortName) {
      
        if(shortName){
            
            return $http.get(ApiPath + '/categories/' + shortName + '.json');
   
        }
    
  };
  
  service.getFeaturedItems = function (category) {
        
        if (category) {
            return $http.get(ApiPath + '/menu_items.json' + '?category=' + category);
        }

  };
  
   service.getRandomItem = function (min, max) {
         
       return Math.floor(Math.random() * (max - min + 1)) + min;
     
  };
  
  service.getAllMenuItems = function () {
   
    return $http.get(ApiPath + '/menu_items.json').then(function (response) {
      return response.data;
    });
  };
  
  service.findItemsByTerm = function(data, searchTerm){
        
        var result = [];
        
        for (var i = 0; i < data.length; i++) {
            var description = data[i].description;
           
            if (description.toLowerCase().indexOf(searchTerm) !== -1) {
               result.push(data[i]);
            }
        }
        
        return result;
    };
  
  

}



})();
