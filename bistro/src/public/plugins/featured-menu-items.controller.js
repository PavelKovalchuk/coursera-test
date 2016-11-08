(function () {

angular.module('public')
.controller('featuredMenuItemsController', featuredMenuItemsController);

featuredMenuItemsController.$inject = ['ApiPath', 'MenuService'];

function featuredMenuItemsController(ApiPath, MenuService) {
  var list = this;
  
  list.apiPath = ApiPath;
  
  list.getCategoryData = function (categoryShortName){
      
        if(categoryShortName){
            
            MenuService.getFeaturedItems(categoryShortName).
                then(function (response) {

                    list.CategoryData  = response.data;
//                    console.log(MenuService.getRandomItem(0, (response.data.menu_items.length - 1)));

                },function (response) {

                    return false ;
                }
            );
            
        }
        
       
  };
  
  
}

})();
