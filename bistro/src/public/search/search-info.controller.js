(function () {

angular.module('public')
.controller('SearchInfoController', SearchInfoController);

SearchInfoController.$inject = ['ApiPath', 'AllMenuItems', 'MenuService'];

function SearchInfoController(ApiPath, AllMenuItems, MenuService) {
  var searchCtrl = this;
    
  searchCtrl.apiPath = ApiPath;
  
  searchCtrl.items = AllMenuItems.menu_items;
  
  searchCtrl.searchTerm = '';
  
  searchCtrl.quantity = AllMenuItems.menu_items.length;
  
  searchCtrl.warningMessage = 'Nothing found!!!';
  
  searchCtrl.showWarningMessage = false;
  
  searchCtrl.sortParam = 'name';
  
  searchCtrl.dataSortParams = ['name','short_name', 'price_large', 'large_portion_name'];
  
  searchCtrl.findByTermHttp = function(){
      
        if(searchCtrl.searchTerm === ''){
            
            searchCtrl.showWarningMessage = true;
             
            return;
        }
        
        MenuService.getAllMenuItems().then(
                function (response) {
                                 
                    searchCtrl.items = MenuService.findItemsByTerm(response.menu_items, searchCtrl.searchTerm.toLowerCase());
                   
                    if(searchCtrl.items.length == 0){
                        searchCtrl.showWarningMessage = true; 
                    }else{
                        searchCtrl.showWarningMessage = false;
                    }
                    searchCtrl.quantity = searchCtrl.items.length;
                    
                },function (response) {
                
                    return false ;
                } 
               
            );
        
  };
  
  searchCtrl.findByTerm = function(){
      searchCtrl.items = MenuService.findItemsByTerm(AllMenuItems.menu_items, searchCtrl.searchTerm.toLowerCase());
                    if(searchCtrl.items.length == 0){
                        searchCtrl.showWarningMessage = true; 
                    }else{
                        searchCtrl.showWarningMessage = false;
                    }
                    searchCtrl.quantity = searchCtrl.items.length;
  };
  
//  searchCtrl.removeItem = function(index){
//        
//        var removed = searchCtrl.items.splice(index, 1);
//        console.log(removed);
//        searchCtrl.quantity = searchCtrl.items.length;
//        if(searchCtrl.quantity == 0){
//            searchCtrl.showWarningMessage = true;
//        }
//                
//    };
    
    searchCtrl.removeItem = function(id){
     
        for (var index = 0; index < searchCtrl.items.length; index++) {
            if (searchCtrl.items[index]['id'] == id){
                
                searchCtrl.items.splice(index, 1);
               
                searchCtrl.quantity = searchCtrl.items.length;
                if(searchCtrl.quantity == 0){
                    searchCtrl.showWarningMessage = true;
                }
            }
        }      
        
       
                
    };
    
    searchCtrl.changeSortParam = function(value, descending){
      
        if(searchCtrl.dataSortParams.indexOf(value) !== -1){ 
            
            if(descending === true){
                value = '-' + value;
            }
        
            
            searchCtrl.sortParam = value;
        }
        
                
    };
    
    searchCtrl.refreshItems = function(){
        MenuService.getAllMenuItems().then(
                function (response) {
                                 
                    searchCtrl.items = response.menu_items;
                  
                    if(searchCtrl.items.length == 0){
                        searchCtrl.showWarningMessage = true; 
                    }else{
                        searchCtrl.showWarningMessage = false;
                    }
                    searchCtrl.quantity = searchCtrl.items.length;
                    searchCtrl.searchTerm = '';
                    
                }
            );
    };
    
    
  
  
      
  
}

})();
