({
    abc : function(component, event, helper) {
        var action = component.get("c.getacc");
        action.setCallback(this, function(response){
            var state = response.getState();
          //  alert(state);
            if(state == 'SUCCESS'){
                component.set("v.first",response.getReturnValue());
              //  console.log('response -->'+ response.getReturnValue());
            }
        });
        $A.enqueueAction(action);   
    },
    toadd : function(cmp,event,helper){
        var a1 = cmp.find("addItem").get("v.value");
        console.log(a1);
        
        var action = cmp.get("c.inputValue");
        console.log(action);
        
        action.setParams({
            'n1' : a1
        });
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                 console.log(response.getState());
              //  component.set("v.first",response.getReturnValue());
                 console.log(response.getReturnValue());
                
            } 
        });
        $A.enqueueAction(action);
    },
    abcd: function(component,event,helper){
       var button =event.getSource();
        alert(button);
       
        var action = component.get("c.inputGetValue");
        console.log(action);
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                component.set("v.second",response.getReturnValue());
                console.log(response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    }
    
})