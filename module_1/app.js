(function () {
'use strict';

angular.module('app', [])
.controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
      
        $scope.dishes = '';
        
        $scope.number = 0;
        
        $scope.message = '';
        
        $scope.showMessage = false;
        
        $scope.comment = 'We do NOT consider and empty item as an item';
        
        $scope.showComment = false;
        
        $scope.showItems = false;
        
        $scope.items = [];
        
        $scope.messageClass = 'message-regular';
      
        $scope.countDishes = function(){
            var dishes = $scope.dishes.split(',');
            var number = 0;
            $scope.showComment = false;
            $scope.items = [];
            
            for (var i = 0; i < dishes.length; i++) {
                
                if(dishes[i].trim() && dishes[i].trim() !== ' '){
                    number++;
                    $scope.items.push(dishes[i]);
                }else{
                    $scope.showComment = true;
                }
            }
            $scope.number = number;
            
            showMessage(number);
            console.log($scope.items);
            
        };
        
        function showMessage(number){
            $scope.showMessage = true;
            if(number <= 3 && number > 0){
                $scope.message = 'Enjoy!';
                $scope.messageClass = 'message-success';
            }else if(number > 3){
                $scope.message = 'Too much!';
                $scope.messageClass = 'message-success';
            }else{
                $scope.message = 'Please enter data first!';
                $scope.messageClass = 'message-error';
            }
            
        }
        
        $scope.closeMessage = function(){
            $scope.showMessage = !$scope.showMessage;
        };
        
        


    }
    
    

})();
