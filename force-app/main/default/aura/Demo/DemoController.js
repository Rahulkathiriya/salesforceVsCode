({
	onlyAction : function(component, event, helper) {
		var inputCmp = component.find("inputCmp");
        var value = inputCmp.get("v.flag");
        
        if(value >=50){
            component.set("v.flag",true);
             component.set("v.flagheader",true);
        }else{
            component.set("v.flag",false);
             component.set("v.flagheader",true);
        }
	}
})