({
	 doInit : function(component, event) {
        var action = component.get("c.fetchAcc");
        action.setCallback(this, function(a) {
            component.set("v.users", a.getReturnValue());
        });
        $A.enqueueAction(action);
    },
     searchKeyChange: function(component, event) {
    var searchKey = event.getParam("searchKey");
    var action = component.get("c.getuserList");
    action.setParams({
      "searchKey": searchKey
    });
    action.setCallback(this, function(a) {
        component.set("v.users", a.getReturnValue());
    });
    $A.enqueueAction(action);
}
})