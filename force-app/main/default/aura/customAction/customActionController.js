({
    handleSubmit: function (component, event, helper) {
        event.preventDefault();
        const fields = event.getParam('fields');
        fields.ContactId = component.get("v.recordId");
        component.find('recordEditForm').submit(fields);
    },

    handleSuccess: function (component, event, helper) {
        // Return to the contact page and
        // display the new case under the case related list
        var record = event.getParams();
        console.log(record.id);

        var navService = component.find("navService");
        var pageRef = {
            type: 'standard__objectPage',
            attributes: {
                actionName: 'list',
                objectApiName: 'Case',
            }

        };
        navLink.generateUrl(pageRef).then($A.getCallback(function (a) {
            component.set("v.url", a ? a : "#");
        }), $A.getCallback(function (error) {
            component.set("v.url", "#");
        }));

        /*  component.set("v.pageReference", pageReference);
 
         var pageReference = component.get("v.pageReference");
         navService.navigate(pageReference); */
    }





})