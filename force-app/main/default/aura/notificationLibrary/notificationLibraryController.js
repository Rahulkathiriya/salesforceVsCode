({
    showNotice: function (component, event, helper) {
        component.find('notifyId').showNotice({
            "variant": "error",
            "header": "An Internal Server has occured!",
            "message": "There was a problem updating the record. Please contact your system administrator.",
            closeCallback: function () {
                $A.get('e.force:refreshView').fire();
            }
        });
    },
    showToast: function (component, event, helper) {
        component.find('notifyId').showToast({
            "variant": "Success",
            "title": "Success!",
            "message": "Component Loaded successfully."
        });
    }
})