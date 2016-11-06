(function () {

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService'];

function SignUpController(MenuService) {
  var signUpCtrl = this;
  
//  signUpCtrl.data = '';
  
  signUpCtrl.itemMessage = 'No such menu number exists';
  
  signUpCtrl.displayItemMessage = false;

  signUpCtrl.submit = function () {
       
      if (signUpCtrl.user.favoriteDish) {
          signUpCtrl.displayItemMessage = false;
          MenuService.getMenuItemByShortName(signUpCtrl.user.favoriteDish)
          
          .then(function (response) {
                        console.log(response.data);
                signUpCtrl.data = response.data;
                        return response.data;
                    },function (response) {
                        console.log('false');
                        console.log(response);
                        return response;
                    }
                );
          
      }else{
          signUpCtrl.displayItemMessage = true;
      }
      
    
  };
}

})();
