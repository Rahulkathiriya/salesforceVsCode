({
	xyz : function(cmp,event,helper) {
        cmp.set('v.battcolumns',[
            { label :' Name', fieldName: 'Name', type : 'text'},
            { label : 'Project', fieldName: 'grensi__Project_Status__c', type : 'Picklist'},
			 { label : 'Weapons', fieldName: 'grensi__Weapons_Status__c', type : 'Picklist'}
        ]);
        var action = cmp.get('c.getcusdata');
        action.setParams({
            
        });
        
        action.setCallback(this, function(response){
           var s1 = response.getState();
            if(s1 == 'SUCCESS'){
                cmp.set("v.battList",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})