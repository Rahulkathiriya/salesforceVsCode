({
    init: function (cmp) {
        var item1 = {
            label: 'Level 1 Child 1',
            name: '1',
            disabled: false,
            expanded: true,
            items: []
        };
        var item2 = {
            label: 'Level 1 Child 2',
            name: '2',
            disabled: false,
            expanded: true,
            items: []
        };
        var item3 = {
            label: 'Level 1 Child 3',
            name: '3',
            disabled: false,
            expanded: false,
            items: []
        };
        var item4 = {
            label: 'Level 1 child 4',
            name: '4',
            disabled: false,
            expanded: false,
            items: []
        };
        var items = [
            item1,
            item2,
            item3,
            item4
        ];
        cmp.set('v.items', items);
    },
    handleClick: function (cmp, event) {
        var nodeToAdd = event.getSource().get("v.value");
        var items = cmp.get('v.items');
        var computedName = '' + nodeToAdd + '.' + (items[nodeToAdd].items.length + 1);
        var computedLabel = 'Level 2 Child ' + (items[nodeToAdd].items.length + 1);
        var newItem = {
            label: computedLabel,
            name: computedName,
            expanded: true,
            disabled: false,
            items: []
        };
        items[nodeToAdd].items.push(newItem);
        cmp.set('v.items', items);
    },


});