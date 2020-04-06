(function (){
    'use strict';
    angular.module('LunchCheck',[])
    .controller('LunchCheckController',function($scope){
        
        $scope.listFood="";
        $scope.displayMassage=function()
        {
            $scope.Massege=howMuchYouEat($scope.listFood);
            
        }
        function howMuchYouEat(listFood)
        {
            let Massege="";
            let amount=(listFood.split(',')).length;
            if(listFood=='')
            { 
                Massege+="Empty!";
            }
            else
            {
                if(amount<=3 && amount!=0)
                {
                    Massege+="Enjoy!";
                }
                else
                {
                    Massege+="Too much!";
                }
            }
           
            return Massege;
        }
    });
})();