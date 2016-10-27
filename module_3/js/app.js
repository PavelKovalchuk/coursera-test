(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
.directive('foundItems', FoundItems);

NarrowItDownController.$inject = ['MenuSearchService'];

function NarrowItDownController(MenuSearchService){
    
    var list = this;
    
    list.searchTerm = '';
    list.found = '';
    list.showMessage = false;
    list.quantity = 0;
       
    list.getItems = function(){
       
        if(list.searchTerm === ''){
            list.showMessage = true;
            list.quantity = 0;
            list.found = '';
            return;
        }
       
        MenuSearchService.getMatchedMenuItems(list.searchTerm.toLowerCase()).then(
            function(response){
                list.found = response;
                if(list.found.length == 0){
                    list.showMessage = true;
                }else{
                   list.showMessage = false; 
                }
                list.quantity = list.found.length;
                
            }    
        );

    };
    
    list.removeItem = function(index){
      
        list.found.splice(index, 1);
        list.quantity = list.found.length;
        if(list.quantity == 0){
            list.showMessage = true;
        }
                
    };
   
    
   
};


MenuSearchService.$inject = ['$http', 'ApiBasePath'];

function MenuSearchService($http, ApiBasePath){
    
    var service = this;
    
    service.getMatchedMenuItems = function(searchTerm){
        
        return $http({
            method: "GET",
            url: (ApiBasePath + '/menu_items.json/'),
            
        }).then( function(response){
            var foundItems = service.findSearchTerm(response.data.menu_items, searchTerm);

            return foundItems;
        })
        .catch(function (error) {
            console.log(error);
        });
  
        
    };
    
    service.findSearchTerm = function(data, searchTerm){
        
        var result = [];
        
        for (var i = 0; i < data.length; i++) {
            var description = data[i].description;
           
            if (description.toLowerCase().indexOf(searchTerm) !== -1) {
               result.push(data[i]);
            }
        }

        return result;
    };
    
};


function FoundItems() {
 
    var ddo = {
    templateUrl: 'templates/found_items.html',
    scope: {
      found: '<',
      showMessage: '<',
      removeItem: '&',
      quantity: '<'
      
     
    },
    controller: FoundItemstDirectiveController,
    controllerAs: 'Dirlist',
    bindToController: true
  };

  return ddo;
};

function FoundItemstDirectiveController() {
  var Dirlist = this;
  
  
};


    

})();
