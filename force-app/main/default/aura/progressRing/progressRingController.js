({
    handleSliderChange: function (cmp, event, helper) {
        var sliderValue = cmp.get("v.sliderValue");
    },

    handleDirectionChange: function (cmp, event, helper) {
        var direction = cmp.get("v.direction");
        if (cmp.get("v.checked")) {
            direction = "fill";
        } else {
            direction = "drain";
        }
        cmp.set("v.direction", direction);
    },
    openPrompt: function (cmp, event, helper) {
        helper.openPrompt(cmp, event);
    }
});