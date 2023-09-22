({
	myAction : function(component, event, helper) {
        component.set("v.Columns", [
            {label:"Name", fieldName:"Name", type:"Text"},
            {label:"Account Site", fieldName:"Site", type:"Text"},
            {label:"Phone", fieldName:"Phone", type:"Phone"},
            {label:"Employees", fieldName:"NumberOfEmployees", type:"Number"}
         
        ]);
        
        
        var action = component.get("c.getAccount");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(data) {
            component.set("v.Accounts", data.getReturnValue());
        });
        $A.enqueueAction(action);
        
    },
    print : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            //"url": "/c/printtwo.app"
             "url" : "/c/printtwo.app?001/x?fcf=" 
           
        });
        urlEvent.fire();
    },
    toggleFilter: function (cmp, event, helper) {
        const value = cmp.get('v.showFilter');
        cmp.set('v.showFilter', !value);
    },
    
})