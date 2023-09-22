({
    myAction : function(component, event, helper) {
        component.set("v.Columns", [
            {label:"First Name", fieldName:"FirstName", type:"text"},
            {label:"Last Name", fieldName:"LastName", type:"text"},
            {label:"Email", fieldName:"Email", type:"Email"},
            {label:"Title", fieldName:"Title", type:"text"},
            {label:"LeadSource", fieldName:"LeadSource", type:"picklist"}
            
        ]);
        
        
        var action = component.get("c.getContacts");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(data) {
            component.set("v.Contacts", data.getReturnValue());
        });
        $A.enqueueAction(action);
        
    },
    print : function(component, event, helper) {
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({
            "url": "/c/print.app"
        });
        urlEvent.fire();
    },
    toggleFilter: function (cmp, event, helper) {
        const value = cmp.get('v.showFilter');
        cmp.set('v.showFilter', !value);
    },
    
   /* setOutput : function(component, event, helper) {
    	var cmpMsg = component.find("msg");
    	$A.util.removeClass(cmpMsg, 'hide');
    	
        var comments = component.find("comments").get("v.value");
        var oTextarea = component.find("oTextarea");
        oTextarea.set("v.value", comments);
    },
    hide : function(component,event,helper){
        component.set('v.myText','');
    }, */
})