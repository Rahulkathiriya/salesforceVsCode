({
    simulateServerRequest: function (onResponse) {
        setTimeout(function () {
            var serverResponse = {
                selectedColorId: 2,
                colors: [
                    { id: 1, label: 'Peacock plum' },
                    { id: 2, label: 'Magenta', selected: true },
                    { id: 3, label: 'violet' },
                    { id: 4, label: 'Teal' }
                ]
            };

            onResponse.call(null, serverResponse);
        }, 2000);
    },


});