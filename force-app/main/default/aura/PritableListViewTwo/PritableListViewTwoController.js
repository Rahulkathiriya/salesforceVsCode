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
        var urlEvent = $A.get("e.force:navigateToURL");
        urlEvent.setParams({ 
         //"url" : "/c/printone.app" 
         //"url" : "/c/printone.app?fv0=00B5g00000crT0JEAU"
         //"url" : "/c/printone.app#/sObject/00B5g00000crSwVEAU/view?fcf=00B5g00000crSwVEAU"                         
   	 	 //"url" : "/c/printone.app?006/x?fcf=00B5g00000crSwVEAU" 
          "url" : "/006/x?fcf=00B5g00000crSwZ" 
        });
        urlEvent.fire(); 
    },
    
    toggleFilter: function (cmp, event, helper) {
        const value = cmp.get('v.showFilter');
        cmp.set('v.showFilter', !value);
    },
    
})