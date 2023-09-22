({
    getCustemObjectData : function(component, event, helper) {
        var a1 = component.get("c.getCOD");
        
        
        a1.setCallback(this,function(response){
            var s1 = response.getState();
            if(s1 == 'SUCCESS'){
                var r1 = response.getReturnValue();
               
                 component.set("v.getcustom",r1);
            }
        });
        $A.enqueueAction(a1);
    }
})