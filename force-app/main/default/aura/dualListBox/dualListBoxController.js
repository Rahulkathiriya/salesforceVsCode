({
    initialize: function (component, event, helper) {
        var options = [
            { value: "1", label: "Option 1" },
            { value: "2", label: "Option 2" },
            { value: "3", label: "Option 3" },
            { value: "4", label: "Option 4" },
            { value: "5", label: "Option 5" },
            { value: "6", label: "Option 6" },
            { value: "7", label: "Option 7" },
            { value: "8", label: "Option 8" },
        ];
        var values = ["3", "8", "1"];
        var required = ["1", "8"];
        component.set("v.listOptions", options);
        component.set("v.defaultOptions", values);
        component.set("v.requiredOptions", required);
    },
    handleChange: function (cmp, event) {
        // Get the list of the "value" attribute on all the selected options
        var selectedOptionsList = event.getParam("value");
        component.set("v.defaultOptions", selectedOptionsList);
    },
    getSelectedGenre: function (component, event, helper) {
        //Get selected Genre List on button click 
        var selectedOptionsList = component.get("v.defaultOptions");
        console.log('Selectd Genre-' + selectedOptionsList);
    }

})