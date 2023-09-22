({
	helperMethod : function(component,event,helper) {
		 var action = component.get("c.fileuploadpreview");
        
        action.setParams({
            'recId' : component.get("v.recordId")
        });
        
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var result = response.getReturnValue()
                component.set("v.PreviewId",result);
                 //  $A.get('e.force:refreshView').fire();
            }
        });
        
        $A.enqueueAction(action);
	}
})