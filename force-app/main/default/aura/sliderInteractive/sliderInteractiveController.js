({
    handleRangeChange: function (cmp, event) {
        var val = cmp.get("v.value");
        console.log("You selected: " + val);
    },

    handleSizeChange: function (cmp, event) {
        // This will contain the string of the "value" attribute of the selected option
        var size = event.getSource().get("v.value");
        cmp.set("v.size", size);
    },

    handleLabelChange: function (cmp, event) {
        var input = cmp.find("label_field");
        cmp.set("v.label", input.get("v.value"));
    },

    handleVerticalDirectionChange: function (cmp, event) {
        cmp.set("v.direction", "vertical");
    },

    handleHorizontalDirectionChange: function (cmp, event) {
        cmp.set("v.direction", "horizontal");
    },

    handleHideLabel: function (cmp, event) {
        cmp.set("v.variant", cmp.get("v.variant") ? "label-hidden" : "");
    },


});