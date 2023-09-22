({
	fetchAccHelper : function(component,event,helper) {
		component.set('v.mycolumns', [
            { label : 'Account Name' ,fieldName : 'Name', type : 'text'},
            { label :'Industry', fieldName : 'Industry', type : 'text'},
            { label: 'Phone', fieldName: 'Phone', type: 'Phone'},
            { label: 'Website', fieldName: 'Website', type: 'url '}
        ]);
        
        var action = component.get("c.getAccDetail");
        
        action.setParams({
            
        });
        
        action.setCallback(this, function(response){
           var state1 = response.getState();
            if(state1 == "SUCCESS"){
                component.set("v.acctList",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})