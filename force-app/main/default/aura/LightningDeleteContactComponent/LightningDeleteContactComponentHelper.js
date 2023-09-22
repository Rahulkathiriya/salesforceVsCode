({
    ContactList: function (component, event) {
        var action = component.get('c.getAllContact'); //Calling apex class method
        action.setCallback(this, function (response) {
            //Whatever result get  setting on that attribute which is mentioned in component
            component.set('v.Contacts', response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
    deleteAccount: function (component, event) {
        var action = component.get('c.deleteContact'); //Calling Apex Method
        action.setParams({ conid: event.target.id }); // Passing the Contact Record Id
        action.setCallback(this, function (response) {
            component.set('v.Contacts', response.getReturnValue());
        });
        $A.enqueueAction(action);
    },
})