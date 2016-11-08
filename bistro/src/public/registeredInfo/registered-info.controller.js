(function () {

angular.module('public')
.controller('RegInfoController', RegInfoController);

RegInfoController.$inject = ['ApiPath', 'userData', 'MenuService'];

function RegInfoController(ApiPath, userData, MenuService) {
  var infoCtrl = this;
  
  infoCtrl.user = userData;
  
  infoCtrl.apiPath = ApiPath;
    
  infoCtrl.noInfoMessage = 'Not Signed Up Yet.';
  
  infoCtrl.signUpLink = 'Sign up Now!';
  
  infoCtrl.noInfoHeading = 'Your registered info is absent';
  
  infoCtrl.infoHeading = 'Your registered information';
  
  infoCtrl.CategoryData = '';
  
  
  
  infoCtrl.getCategoryData = function (categoryShortName){
        MenuService.getCategory(categoryShortName).
            then(function (response) {
                
                infoCtrl.CategoryData  = response.data;
                
            },function (response) {
                
                return false ;
            }
            );
  };
  
  
}

})();
