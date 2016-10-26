(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");;

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
    
    var list = this;
    
    var searchTerm = 'broth';
    
    list.items = '';
    
    list.getItems = function(searchTerm){
       
        MenuSearchService.getMatchedMenuItems(searchTerm).then(
            function(response){
                list.items = response;
                console.log('list.items', list.items);
            }    
        );

    };
   
    
   
};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath){
    
    var service = this;
    
    service.getMatchedMenuItems = function(searchTerm){
        var searchTerm = 'meat';//////////////////////////
        return $http({
            method: "GET",
            url: (ApiBasePath + '/menu_items.json'),
            
        }).then( function(response){
            var foundItems = service.findSearchTerm(response.data.menu_items, searchTerm);
//             console.log(foundItems);
            return foundItems;
        })
        .catch(function (error) {
            console.log(error);
        });
        
//        return promise;
        
    };
    
    service.findSearchTerm = function(data, searchTerm){
        
        var result = [];
        
        for (var i = 0; i < data.length; i++) {
            var description = data[i].description;
           
            if (description.toLowerCase().indexOf(searchTerm) !== -1) {
               result.push(data[i]);
            }
        }
//console.log('findSearchTerm', result);
        return result;
    };
    
};


    

})();
