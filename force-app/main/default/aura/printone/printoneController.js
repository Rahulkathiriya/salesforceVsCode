({
    myAction : function(component, event, helper) {
        component.set("v.Columns", [
             {label:"Opportunity Name ", fieldName:"Name", type:"text"},
            {label:"Account Name", fieldName:"AccountId", type:"Lookup"},
            {label:"Amount", fieldName:"Amount", type:"Currency"},
            {label:"CloseDate", fieldName:"CloseDate", type:"Picklist"},
            {label:"Stage", fieldName:"StageName", type:"picklist"},
            {label:"Opportunity Owner", fieldName:"OwnerId", type:"Lookup"},
            {label:"stageName", fieldName:"grensi__stageName__c", type:"Formula(Text)"}
            
        ]);
        var action = component.get("c.getOpportunities");
        action.setParams({
            recordId: component.get("v.recordId")
        });
        action.setCallback(this, function(data) {
            component.set("v.Opportunities", data.getReturnValue());
        });
        $A.enqueueAction(action);
        
    },
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

    doInit: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber"); 
        var pageSize = component.find("pageSize").get("v.value"); 
        helper.getOpportunityList(component, pageNumber, pageSize);
    },
    onSelectChange: function(component, event, helper) {
        var page = 1
        var pageSize = component.find("pageSize").get("v.value");
        helper.getOpportunityList(component, page, pageSize);
        console.log(page ,'pagee');
        console.log(pageSize ,'pageesizee');
    }, 
})