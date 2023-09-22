({
    abcd : function(cmp, event, helper) {
        var  action = cmp.get("c.getAccData");
        action.setCallback(this,function(response){ 
            if(response.getState() == 'SUCCESS'){
                cmp.set("v.AddRecord",response.getReturnValue());
            }
        });
        $A.enqueueAction(action); 
        
    },
    Addrecord : function(cmp,event,helper){
        var inputName = cmp.find("addId").get("v.value");
        var action = cmp.get("c.inputIdValue");
        action.setParams({
            'a1'  : inputName,
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
                cmp.set("v.AddRecord",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    Editrecord :function (cmp,event,helper){
        cmp.set("v.EditForm",true);
        var acc = event.currentTarget.dataset.accid;  // get Id click button event through
        cmp.set("v.accIds",acc);
        var action = cmp.get("c.getAccById");
        action.setParams({
            'Ids'  : acc,
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                cmp.set("v.getItems",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    updaterecord : function (cmp,event,helper){
        var name = cmp.find("EditId").get("v.value");  //input field find id through value
        var aId = cmp.get("v.accIds");                  //get id through button click
        var action = cmp.get("c.getupdaterecord");
        action.setParams({
            'name'  : name,   //set value
            'justId' : aId     //sel new id match
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
                cmp.set("v.EditForm",false);
            }
        });
        $A.enqueueAction(action);
    },
    deleteRecord : function(cmp,event,helper){
        var deId = cmp.get("v.deleteIds");
        var action =cmp.get("c.deleteRecordById");
        action.setParams({
            'DeleteId'  : deId,    //apex dml through delete id perticular record
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
                cmp.set("v.DeleteForm",false);
            }
        });
        $A.enqueueAction(action);
        
    },
    CloseRecord :function (cmp,event,helper){
        cmp.set("v.EditForm",false);
        cmp.set("v.DeleteForm",false);
    },
    deletepopup :function (cmp,event,helper){
        //console.log("dfsdf");
        cmp.set("v.DeleteForm",true);
        //   console.log(cmp.get("v.DeleteForm"));
        var acc = event.currentTarget.dataset.accid;
        cmp.set("v.deleteIds",acc);
    },
    myAction : function(cmp,event,helper){
         var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      "url": "/grensi/PrintViewTask4.app"
    });
    urlEvent.fire();
    }
    
    
})