({
	print : function(component, event, helper) {
         var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      "url": "/c/print.app"
    });
    urlEvent.fire();
     }
})