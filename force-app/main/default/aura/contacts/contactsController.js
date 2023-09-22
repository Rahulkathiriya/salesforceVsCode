({
    doInit: function (component, event, helper) {
        var action = component.get("c.getContact");
        action.setCallback(this, function (response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.contact", response.getReturnValue());
                console.log(response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },

    handleChange: function (cmp, event, helper) {
        var firstname = cmp.find("firstname").get("v.value");
        var lastname = cmp.find("lastname").get("v.value");
    }
})