(function () {
'use strict';

angular.module('MenuApp')
.controller('sideMenuListController', sideMenuListController);

sideMenuListController.$inject = ['MenuDataService'];
function sideMenuListController(MenuDataService) {
  
  var list = this;
  
  list.items = '';
  
  list.getItems = function(){
      var promiseObj = MenuDataService.getAllCategories();
      promiseObj.then(function(data) { 
//          console.log(data);
          list.items = data; 
      });
  };
  
}


})();
