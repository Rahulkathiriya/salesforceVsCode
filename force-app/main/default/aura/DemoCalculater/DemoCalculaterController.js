({
    xyz : function(component, event, helper) {
        var num1 = component.find("a1").get("v.value");
        var num2 = component.find("a2").get("v.value");
        
        var numset = Number(num1)+Number(num2);
        var numsub = Number(num1)-Number(num2);
        var nummulti = Number(num1)*Number(num2);
        var numdivion = Number(num1)/Number(num2);
        
        
        component.set("v.Result",numset);
        component.set("v.Result",numsub);
        component.set("v.Result",nummulti);
        component.set("v.Result",numdivion);
        
    }
})