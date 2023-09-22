({
    HandlerAction : function(cmp, event, helper) {
        var action = cmp.get("c.getRecordName");
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                cmp.set("v.recordName",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
        
    },
    HandlerContact : function(cmp,event,helper){
     var getAccId = event.currentTarget.dataset.id;
      //  console.log('fgfccid---->',getAccId);
        
        var action = cmp.get("c.getAccRelatedCon");
        action.setParams({
            'AccId' : getAccId
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                
                var data = response.getReturnValue();
                data.forEach(a => {
                 a.LinkAcc = '/'+a.Id; 
                   
                });
                    console.log('data--->',data);
                
                cmp.set('v.accRelCon',data);
                 console.log(response.getReturnValue());
                helper.conPopup(cmp,event,helper);
            }
        });
        $A.enqueueAction(action);
        
    },
    HandleroOpp :  function(cmp,event,helper){
         var getAccId = event.currentTarget.dataset.id;
      //  console.log('fgfccid---->',getAccId);
        
        var action = cmp.get("c.getAccRelatedOpp");
        action.setParams({
            'AccId' : getAccId
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                
                 var data = response.getReturnValue();
                data.forEach(a => {
                 a.LinkOpp = '/'+a.Id; 
                   
                });
                    console.log('data--->',data);
                    
                cmp.set("v.accRelOpp",data);
                 console.log(response.getReturnValue());
                 helper.OppPopup(cmp,event,helper);
            }
        });
        $A.enqueueAction(action);
         
        
    },
    HandlerCases :  function(cmp,event,helper){
        
         var getAccId = event.currentTarget.dataset.id;
     //   console.log('fgfccid---->',getAccId);
        
        var action = cmp.get("c.getAccRelatedCase");
        action.setParams({
            'AccId' : getAccId
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                
                var data = response.getReturnValue();
                data.forEach(a => {
                 a.AccountName = a.Account.Name; 
                    a.LinkCases = '/'+a.Id;
                   
                });
                  console.log('data--->',data);  
                cmp.set("v.accRelCase",data);
                 
                helper.CasesPopup(cmp,event,helper);
            }
        });
        $A.enqueueAction(action);
        
    },
    HandlerNoteAttach :  function(cmp,event,helper){
        
      var getAccId = event.currentTarget.dataset.id;
       // console.log('fgfccid---->',getAccId);
        
        var action = cmp.get("c.getAccRelatedNoteAttch");
        action.setParams({
            'AccId' : getAccId
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                cmp.set("v.accRelNoteAttch",response.getReturnValue());
                 console.log(response.getReturnValue());
                helper.NoteAttachPopup(cmp,event,helper);
            }
        });
        $A.enqueueAction(action);   
    },
    HandlerCancel : function(cmp,event,helper){
        
         cmp.set("v.open",false);
    }
    
})