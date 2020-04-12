(function (){
    'use strict';
    angular.module('ShoppingListCheckOff',[])
    .controller('ToBuyController',ToBuyController)
    .controller('AlreadyBoughtController',AlreadyBoughtController)
    .service('ShoppingListSrvice',ShoppingListSrvice);
    ToBuyController.$inject=['ShoppingListSrvice'];
    function ToBuyController(ShoppingListSrvice)
    {
        let itemBuy=this;
        itemBuy.quantity='';
        itemBuy.name='';
        itemBuy.massage1=ShoppingListSrvice.massage1();
        itemBuy.massage2=ShoppingListSrvice.massage2();
        itemBuy.items=ShoppingListSrvice.getAddList();
        itemBuy.addItem=function()
        {
            ShoppingListSrvice.addItem(itemBuy.quantity,itemBuy.name);
            itemBuy.massage1=ShoppingListSrvice.massage1();
            itemBuy.massage2=ShoppingListSrvice.massage2();
        }
        
        
        itemBuy.removeItem=function(index)
        {
            ShoppingListSrvice.removeItem(index);
            itemBuy.massage1=ShoppingListSrvice.massage1();
            itemBuy.massage2=ShoppingListSrvice.massage2();
        }
    }

    AlreadyBoughtController.$inject=['ShoppingListSrvice'];
    function AlreadyBoughtController(ShoppingListSrvice)
    {
        let itemBought=this;

        itemBought.newlist=ShoppingListSrvice.getNewList();
        itemBought.massage=ShoppingListSrvice.massage2();

        
    }

    
    function ShoppingListSrvice()
    {
        let service =this;
        let items=[];
        let newlist=[];
        service.addItem=function (itemName,quantity)
        {
            let item={
                name:itemName,
                quantity:quantity
            }
            items.push(item)
           
        };

        service.removeItem=function(index)
        {
            newlist.push(items[index]);
            items.splice(index,1);
        }
        service.getAddList=function()
        {
            
            return items;
        }

        service.getNewList=function()
        {
            return newlist
        }
        

        service.massage1=function(){
            if(items.length==0)
            {
                return 'Empty';
            }
            else
            {
                return '';
            }
        }
        service.massage2=function(){
            if(newlist.length==0)
            {
                return 'Empty';
            }
            else
            {
                return '';
            }
        }
    }
    
})();