({
    setPagref: function (component, event, helper) {
        var navLink = component.find("navLink");

        var pageRef = {
            type: 'standard__objectPage',
            attributes: {
                actionName: 'list',
                objectApiName: 'Account',
            },
            state: {
                filterName: "AllAccounts"
            }
        };

        // Set the URL on the link or use the default if there's an error
        navLink.generateUrl(pageRef).then($A.getCallback(function (a) {
            component.set("v.url", a ? a : "#");
        }), $A.getCallback(function (error) {
            component.set("v.url", "#");
        }));
    },
    goToRec: function (component, event, helper) {
        var navLink = component.find("navLink");
        var pageRef = {
            type: 'standard__recordPage',
            attributes: {
                actionName: 'view',
                objectApiName: 'Contact',
                recordId: '0035g00000mmqqHAAQ' // change record id. 
            },
        };
        navLink.navigate(pageRef, true);
    }
})