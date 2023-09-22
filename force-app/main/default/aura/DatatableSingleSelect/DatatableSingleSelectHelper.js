({
    fetchData : function(component,event,helper) {
        var action = component.get('c.getAllRecord');
        action.setCallback(this,function(response){
            var state=response.getState();
            if(state==='SUCCESS'){
                var result=response.getReturnValue();
                //  console.log('return-->',result);
                component.set('v.DATA',result);
            }
        });
        $A.enqueueAction(action); 
    }
})