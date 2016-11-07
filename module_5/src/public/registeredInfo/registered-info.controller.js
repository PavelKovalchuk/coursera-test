(function () {

angular.module('public')
.controller('RegInfoController', RegInfoController);

RegInfoController.$inject = ['ApiPath', 'userData'];

function RegInfoController(ApiPath, userData) {
  var infoCtrl = this;
  
  infoCtrl.user = userData;
  
  infoCtrl.apiPath = ApiPath;
  
  infoCtrl.noInfoMessage = 'Not Signed Up Yet.';
  
  infoCtrl.signUpLink = 'Sign up Now!';
  
  infoCtrl.noInfoHeading = 'Your registered info is absent';
  
  infoCtrl.infoHeading = 'Your registered information';
  
}

})();
