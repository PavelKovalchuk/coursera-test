(function () {

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];

function SignUpController(MenuService) {
  var signUpCtrl = this;
  
  signUpCtrl.user = '';
    
  signUpCtrl.itemMessage = 'No such menu number exists';
  
  signUpCtrl.finishMessage = 'Your information has been saved! Check data in ';
  
  signUpCtrl.regInfoLink = 'My Info link';
  
  signUpCtrl.displayItemMessage = false;
  
  signUpCtrl.displayFinishMessage = false;

  signUpCtrl.submit = function () {
       
      if (signUpCtrl.user.favoriteDish) {
          signUpCtrl.displayItemMessage = false;
          MenuService.getMenuItemByShortName(signUpCtrl.user.favoriteDish)
          
          .then(function (response) {
                        signUpCtrl.user.data = response.data;
                        console.log(signUpCtrl.user);
                        MenuService.user = signUpCtrl.user; //////////////
                        signUpCtrl.displayFinishMessage = true;
                        return response.data;
                    },function (response) {
                        signUpCtrl.displayItemMessage = true;
                        signUpCtrl.displayFinishMessage = false;
                        return response;
                    }
                );
          
      }else{
          signUpCtrl.displayItemMessage = true;
      }
      
    
  };
}

})();
