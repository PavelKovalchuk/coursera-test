(function () {

angular.module('public')
.controller('foundItemsController', foundItemsController);

foundItemsController.$inject = ['ApiPath'];

function foundItemsController(ApiPath) {
  var foundList = this;
    
  foundList.apiPath = ApiPath;
  
    
  
  
}

})();
