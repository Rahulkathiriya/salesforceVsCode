({
    toadd : function(component, event, helper) {
        var name = component.find("addItem").get("v.value");
        
        
        var action =component.get("c.getInputValue");
        action.setParams({
            'add1' : name 
        });
        action.setCallback(this, function(response){
            //  console.log(response.id);
            var state = response.getState();
            console.log(state);
            if(state == 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
                this.abc(component,event,helper);  
                
            } 
            
        });
        $A.enqueueAction(action);
    },
    
    abc : function(component,event,helper){
        var action = component.get("c.showTable");
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                component.set("v.a1",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    editcon : function(component,event,helper){
        const menuItem = event.getParam("value");
        const subString =menuItem.split("/");
        console.log(subString);
       // console.log(menuItem);
        
        if(subString[0] == "edit" ){
            console.log('call');
           
            var id = subString[2];
            console.log(id);
        }else if(subString[0] == "delete" ){
          var id = subString[2];
            console.log(id);
        }
            },
            
            
            })