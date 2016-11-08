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
  
  signUpCtrl.existFavoriteDish = false;

  
  signUpCtrl.submit = function () {
       
      if (signUpCtrl.user.favoriteDish) {
          
            signUpCtrl.displayItemMessage = false;
          
            MenuService.user = signUpCtrl.user;
            
            if(signUpCtrl.user.data){
                signUpCtrl.displayFinishMessage = true;
            }else{
                signUpCtrl.displayFinishMessage = false;
            }
         
      }else{
          signUpCtrl.displayItemMessage = true;
      }
      
    
  };
  
  signUpCtrl.checkFavoriteDish = function () {
      
        if (signUpCtrl.user.favoriteDish) {
              
          signUpCtrl.displayItemMessage = false;
          
          MenuService.getMenuItemByShortName(signUpCtrl.user.favoriteDish)
          
          .then(function (response) {
                        
                        signUpCtrl.user.data = response.data;
                
                        signUpCtrl.existFavoriteDish = true;
                          
//                        console.log(signUpCtrl.user);

                    },function (response) {
                        signUpCtrl.displayItemMessage = true;
                        signUpCtrl.existFavoriteDish = false;

                    }
                );
          
      }
    
      
  };
  
  
}

})();
