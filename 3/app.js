(function (){
    'use strict';
    angular.module('NarrowItDownApp',[])
    .controller('NarrowItDownController',NarrowItDownController)
    .service('MenuSearchService',MenuSearchService)
    .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");
    
    NarrowItDownController.$inject = ['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        
        menu.showItems=function()
        {
            let searchTerm = menu.searchTerm
            menu.categories=MenuSearchService.getMatchedMenuItems(searchTerm);
            menu.massage=MenuSearchService.massage();
        }
        menu.delItems=function(index)
        {
            MenuSearchService.delItem(index);
            
        }
       
        
    }
    MenuSearchService.$inject=['$http', 'ApiBasePath'];
    function MenuSearchService($http, ApiBasePath)
    {
        let service = this;
        let arr=[];
        let findArr=[]
        function getList()
        {
            let response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
              });
          
            return response;
            
        }

        let promise = getList();
        promise.then(function (response) {
           arr =response.data['menu_items'];
           
        })
        .catch(function (error) {
            console.log("Something went terribly wrong.");
        });

        service.getMatchedMenuItems=function(searchTerm)
        {
            findArr=[];
            let regEx=new RegExp(searchTerm);
            console.log(arr);
            console.log(searchTerm);
            for(let i=0;i<arr.length;i++)
            {
                if(arr[i]['name'].match(regEx) || arr[i]['description'].match(regEx))
                    {
                        console.log(arr[i]['name'].match(regEx)+"----"+arr[i]['description'].match(regEx))
                        findArr.push(arr[i])
                    }
                    
            }
           
            console.log(findArr)
            return findArr
        }
        
        service.delItem=function(index)
        {
            findArr.splice(index,1);
            return findArr;
        }


        service.massage=function(){
            if(findArr.length==0)
            {
                return 'Nothing found!';
            }
            else
            {
                return 'Have found!';
            }
        }
            
        
    }

})();