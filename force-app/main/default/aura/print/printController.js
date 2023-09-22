({
    print : function(component, event, helper) {
        var printButton = component.find('printButton');
        $A.util.toggleClass(printButton, 'slds-hide');
        event.preventDefault();
        window.print();
        $A.util.toggleClass(printButton, 'slds-hide');
    },
    close: function(component, event, helper) {
        window.close();
    },
    
   /* myAction : function(component, event, helper) {
        component.set("v.Columns", [
            {label:"First Name", fieldName:"FirstName", type:"text"},
            {label:"Last Name", fieldName:"LastName", type:"text"},
            {label:"Email", fieldName:"Email", type:"Email"},
            {label:"Title", fieldName:"Title", type:"text"},
            {label:"LeadSource", fieldName:"LeadSource", type:"picklist"}
        ]);
        
       var action = component.get("c.getContacts");
        action.setParams({
            recordId: component.get("v.recordId"),
            
        });  
       
        action.setCallback(this, function(data) {
            component.set("v.Contacts", data.getReturnValue());      
        });
        $A.enqueueAction(action); 
        
    }, */

    doInit: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber"); 
        var pageSize = component.find("pageSize").get("v.value"); 
        helper.getContactList(component, pageNumber, pageSize);
    },
    onSelectChange: function(component, event, helper) {
        var page = 1
        var pageSize = component.find("pageSize").get("v.value");
        helper.getContactList(component, page, pageSize);
        console.log(page ,'pagee');
        console.log(pageSize ,'pageesizee');
    }, 
})