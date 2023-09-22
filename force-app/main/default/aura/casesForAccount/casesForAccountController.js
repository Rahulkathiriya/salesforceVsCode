({
    init : function(cmp, evt) {
        var action = cmp.get("c.getCases");
        action.setParams({
            "accountId": cmp.get("v.recordId")
        });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                cmp.set("v.cases", response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
})