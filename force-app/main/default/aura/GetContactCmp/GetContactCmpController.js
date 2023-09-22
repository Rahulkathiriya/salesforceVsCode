({
    getContactData  : function (component, event, helper) {
        var action =component.get("c.getCon");
        
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var returnData = response.getReturnValue();
                // alert(returnData);
                for(var i=0; i<returnData.length; i++){
                    //    alert(returnData[i].Name);
                    component.set("v.getConList",returnData);
                }
            }
        });
        $A.enqueueAction(action);
    },
    openCreateContactmethod : function(component,event,helper){
        component.set("v.createContactModel",true);
    },
    closeModelCreateContact :function(component,event,helper){
        component.set("v.createContactModel",false);
        component.set("v.editForm",false);
    },
    createContact : function(component,event,helper){
        var name = component.find("conName").get("v.value");
        var phone = component.find("phone").get("v.value");
        var email = component.find("email").get("v.value");
        
        var action =component.get("c.insertcon");
        
        action.setParams({
            'lastname' :name,
            'phoneno' :phone,
            'emailId' : email
        });
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
                component.set("v.createContactModel",false);
            }
        });
        $A.enqueueAction(action);
    },
    edit : function(component,event,helper){
        component.set("v.createContactModel",true);
        component.set("v.editForm",true);
        
        //get record id thruogh event 
        var conId = event.currentTarget.dataset.conid;
         alert(conId);
        component.set("v.contId",conId); //set recordId thruogh contId variable
        
        
        var action = component.get("c.getConById");
        //alert(action);
        action.setParams({
            'Id'  :conId 
        });
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS') {
                
                //   alert(response.getState()); 
                component.set("v.getCont",response.getReturnValue());           
            } 
        });
        $A.enqueueAction(action);
        
        
    },
    updateContact : function(component,event,helper){
        var name = component.find("editName").get("v.value"); 
        var phone = component.find("editphone").get("v.value"); 
        var email = component.find("editemail").get("v.value"); 
        var cId = component.get("v.contId");
        
        var action = component.get("c.editConMethod");
        action.setParams({
            'conName'  : name,
            'phoneNum'  : phone,
            'emailId'  : email,
            'conId'  : cId,
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
                component.set("v.createContactModel",false);
                component.set("v.editForm",false);
            }
        });
        $A.enqueueAction(action);
        
    },
    delete : function(component,event,helper){
    var conId = event.currentTarget.dataset.conid;
    // alert(conId);
    
    var action = component.get("c.deleteConData");
    action.setParams({
    'Id' : conId
});
action.setCallback(this,function(response){
    if(response.getState() == 'SUCCESS'){
        $A.get('e.force:refreshView').fire();
    }
});
$A.enqueueAction(action);
}
})