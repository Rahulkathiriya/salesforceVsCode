({
 doInit : function(component, event, helper) {
        
        var isRelatedList = component.get("v.isRelatedList");
        if(isRelatedList) {
            var recId = component.get("v.recordId");
            var action = component.get("c.getRelatedRecords");
            action.setParams({
                childObjectName : component.get("v.childObjectName"),
                referenceFieldName : component.get("v.referenceFieldName"),
                referenceFieldValue : recId
            });
            action.setCallback(this, function(response) {
                console.log("In printData related call back");
                var state = response.getState();
                console.log("state::::", state);
                if(state === 'SUCCESS' || state === 'DRAFT') {
                    var result = response.getReturnValue();
                    component.set("v.relatedList", result);
                    console.log("relatedList::::", result);
                    helper.doInit(component, event, helper);
                }
            });
            $A.enqueueAction(action);
            helper.doInit(component, event, helper);
        }
        else {
            helper.doInit(component, event, helper);
        }       
 },
      print : function(cmp, event, helper) {
        window.print();
        window.close();
        window.open();
        console.log('open print view') 
        
       /* var pc = component.find("printContent");
        var pt = pc.getElement().innerHTML;
        var newWin= window.open("");
               newWin.document.write(pt);
               newWin.print();
               newWin.close(); */
       
        
    },
})