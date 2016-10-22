(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);


ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService){
    
    var buyList = this;
    
    buyList.items = ShoppingListCheckOffService.getItems();
    
    buyList.moveItems = function(index){
        ShoppingListCheckOffService.transferItemTo(index);
    };
    
    
};


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

function AlreadyBoughtController(ShoppingListCheckOffService){
    
    var boughtList = this;
    
    boughtList.items = ShoppingListCheckOffService.getBoughtItems(); 
    
    boughtList.moveItems = function(index){
        ShoppingListCheckOffService.transferItemFrom(index);
    };
    
};


function ShoppingListCheckOffService(){
    
    var service = this;
    
    var items = [
        { name: "cookies", quantity: 10 },
        { name: "candies", quantity: 2 },
        { name: "apples", quantity: 4 },
        { name: "bananas", quantity: 44 },
        { name: "cucumbers", quantity: 1 },
        { name: "sausages", quantity: 1 },
        { name: "potatoes", quantity: 13 },
        { name: "tomatoes", quantity: 15 }
    ];
    
    service.toBuyItems = items; 
    service.boughtItems = [];
    
    
    service.getItems = function () {
      
        return service.toBuyItems;
       
    };
    
    service.getBoughtItems = function () {
        
        return service.boughtItems;
    
    };
    
    
    service.removeItem = function (itemIdex) {
      service.toBuyItems.splice(itemIdex, 1);
    };
    
    service.transferItemTo = function(index){
        
        service.boughtItems.push(service.toBuyItems[index]);
        service.toBuyItems.splice(index, 1);
       
        
    };
    
    service.transferItemFrom = function(index){
        
        service.toBuyItems.push(service.boughtItems[index]);
        service.boughtItems.splice(index, 1);
       
        
    };
    
}


    

})();
