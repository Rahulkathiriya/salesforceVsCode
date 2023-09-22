({
    mychangeAcc: function (component, event, helper) {
        var acc = component.find('accid').get('v.value');
        alert(acc);
        var action = component.get("c.LeadAccountInfo");

        action.setParams({ ldvalue: acc });

    }
})