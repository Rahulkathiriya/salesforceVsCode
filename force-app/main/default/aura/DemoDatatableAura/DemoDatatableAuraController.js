({
	abc : function(component, event, helper) {
		var action = component.get("c.getopp");
        action.setCallback(this, function(response){
            
            var s1 =response.getState();
            if(s1 == 'SUCCESS'){
               //var reData = response.getReturnValue();
                component.set("v.getValue",response.getReturnValue());	
            }
            
           
            
        });
        $A.enqueueAction(action);
	}
})