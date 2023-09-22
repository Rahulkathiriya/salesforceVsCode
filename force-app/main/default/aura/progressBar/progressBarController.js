({
    toggleProgress: function (cmp) {
        if (cmp.get('v.isProgressing')) {
            // stop
            cmp.set('v.isProgressing', false);
            clearInterval(cmp._interval);
        } else {
            // start
            cmp.set('v.isProgressing', true);
            cmp._interval = setInterval($A.getCallback(function () {
                var progress = cmp.get('v.progress');
                cmp.set('v.progress', progress === 100 ? 0 : progress + 1);
            }), 200);
        }
    },


});