({
	addFunction : function(component, event, helper) {
		var number1 = component.find("num1").get("v.value");
        		var number2 = component.find("num2").get("v.value");
     /*   alert(number1);
         alert(number2); */
        var  sum = Number(number1)+Number(number2);
      //  alert(sum);
       component.set("v.sum",sum);
	},
    abc : function (component,event,helper){
        var a1=component.find("num1").get("v.value");
        var a2=component.find("num2").get("v.value");
        
        var Subtract =Number(a1)-Number(a2);
      //  alert (Subtract);
        component.set("v.sum",Subtract);
    }
})