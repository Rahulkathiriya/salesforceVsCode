({
    abcd : function (component,event,helper){
        var action = component.get("c.getOpp");
        
        action.setCallback(this, function(response){
            var s1 = response.getState();
            if(s1 == 'SUCCESS'){
                var r1 = response.getReturnValue();
               
                for(var i=0; i<r1.length; i++){
                    component.set("v.oppName",r1);
                }
            }
        });
        $A.enqueueAction(action);
    },
    
    // aura:if  condition true fire this function
    
    openCreateOpportunityModal : function (component,event,helper){
        component.set("v.createOpportunity",true);
    },
    
    //enyone click cancel button or close button this function fire
    
    closeOppRecord : function (component,event,helper){
        component.set("v.createOpportunity",false);
    },
    
    // create opportunity object 
    
    newCreateOpp : function(component,event,helper){
        var name = component.find("oName").get("v.value");
        var close = component.find("oDate").get("v.value");
        var stage = component.find("oStage").get("v.value");
        
        var action =component.get("c.insertOpp");
     //  console.log(action);
        action.setParams({
            'name1' :name,
            'Date1' :close,
            'stage1' : stage
        });
        action.setCallback(this, function(response){
     //  console.log(response.getState());
        //    console.log(response.getReturnValue);
            if(response.getState() == 'SUCCESS'){
      
               $A.get('e.force:refreshView').fire();
                component.set("v.createOpportunity",false);
            }
        });
        $A.enqueueAction(action);
    }
    
})