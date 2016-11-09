(function () {

angular.module('public')
.controller('SearchInfoController', SearchInfoController);

SearchInfoController.$inject = ['ApiPath', 'AllMenuItems', 'MenuService', '$filter'];

function SearchInfoController(ApiPath, AllMenuItems, MenuService, $filter) {
    var searchCtrl = this;

    searchCtrl.apiPath = ApiPath;

    searchCtrl.items = AllMenuItems.menu_items;

    searchCtrl.searchTerm = '';

    searchCtrl.quantity = AllMenuItems.menu_items.length;

    searchCtrl.warningMessage = 'Nothing found!!!';

    searchCtrl.showWarningMessage = false;

    searchCtrl.sortParam = 'name';

    searchCtrl.dataSortParams = ['name','short_name', 'price_large', 'large_portion_name'];
    
    searchCtrl.minPrice = 0;
    
    searchCtrl.maxPrice = 100;

  //https://github.com/angular-slider/angularjs-slider
    searchCtrl.slider = {
                        min: searchCtrl.minPrice,
                        max: searchCtrl.maxPrice,
                        options: {
//                            id: 'sliderPrice',
                            onChange: function() {
                               searchCtrl.sliderOnChange();
                            },
                            translate: function(value) {
                                return 'USD$' + value;
                            }
                        }
    };
  
    searchCtrl.displayWarningMessage = function(){
        
        if(searchCtrl.items.length == 0){
                searchCtrl.showWarningMessage = true; 
        }else{
            searchCtrl.showWarningMessage = false;
        }
    };
  
    searchCtrl.sliderOnChange = function(){
        
        var itemsFilteredByTerm = MenuService.findItemsByTerm(AllMenuItems.menu_items, searchCtrl.searchTerm.toLowerCase());
        
        searchCtrl.filterOnChange(itemsFilteredByTerm);
    };
  
    searchCtrl.filterOnChange = function(dataItems){
       
        searchCtrl.items =  $filter('priceFilter')(
                                                    dataItems, 
                                                    searchCtrl.slider.min, 
                                                    searchCtrl.slider.max
                                                    );
        searchCtrl.quantity =  searchCtrl.items.length;
        
        searchCtrl.displayWarningMessage();
     };
  

    searchCtrl.findByTerm = function(){
        
        var itemsFilteredByTerm = MenuService.findItemsByTerm(AllMenuItems.menu_items, searchCtrl.searchTerm.toLowerCase());
        
        searchCtrl.filterOnChange(itemsFilteredByTerm);
        
        searchCtrl.displayWarningMessage();
        
        searchCtrl.quantity = searchCtrl.items.length;
    };
  
    
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
                  
                    searchCtrl.displayWarningMessage();
                    
                    searchCtrl.slider.min = searchCtrl.minPrice;
    
                    searchCtrl.slider.max = searchCtrl.maxPrice;
                    
                    searchCtrl.quantity = searchCtrl.items.length;
                    searchCtrl.searchTerm = '';
                    
                }
            );
    };
    
    searchCtrl.findByTermHttp = function(){

        if(searchCtrl.searchTerm === ''){

            searchCtrl.showWarningMessage = true;

            return;
        }

        MenuService.getAllMenuItems().then(
                function (response) {

                    searchCtrl.items = MenuService.findItemsByTerm(response.menu_items, searchCtrl.searchTerm.toLowerCase());

                    searchCtrl.displayWarningMessage();

                    searchCtrl.quantity = searchCtrl.items.length;

                },function (response) {

                    return false ;
                } 

            );

    };
  
    
    
  
  
      
  
}

})();
