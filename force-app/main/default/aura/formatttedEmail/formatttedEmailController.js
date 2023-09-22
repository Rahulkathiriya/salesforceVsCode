({
    handleClick: function (cmp, event) {
        event.preventDefault();
        var counter = cmp.get("v.count") + 1;
        cmp.set("v.count", counter);
    }
});