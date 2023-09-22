({
	recordCreatedSuccess : function(component, event, helper) {
        var eventSuccess  = $A.get("e.force:showToast");
        eventSuccess.setParams({
            title : 'Success',
            message : 'record Created!',
            type : 'Success'
            
        });
        eventSuccess.fire();
	}
})