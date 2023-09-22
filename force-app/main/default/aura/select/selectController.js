({
    init: function (cmp, event, helper) {
        helper.simulateServerRequest(
            $A.getCallback(function handleServerResponse(serverResponse) {
                cmp.set('v.options', serverResponse.colors);

                /**
                 * Targets a race condition in which the options on the component does not reflect the new selected value.
                 * Check section "Generating Options On Initialization" on the documentation tab
                 */
                cmp.set('v.selectedValue', serverResponse.selectedColorId);
            })
        );
    }
});