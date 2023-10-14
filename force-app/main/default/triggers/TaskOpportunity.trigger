trigger TaskOpportunity on Opportunity (before Insert, before update, before delete, after Insert, after Update, after Delete, after Undelete) {
     
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            
        }  
        else if(Trigger.isInsert){
            
        } 
        else if(Trigger.isUpdate){
            
        } 
        else if(Trigger.isDelete){
            TaskTriggerHelper.beforeDeleteAfterupdate(Trigger.old,null,'delete'); 
        } 
        
    }
    else if(Trigger.isAfter){
        
        if(Trigger.isInsert){

        }   
        else if(Trigger.isUpdate){
          TaskTriggerHelper.beforeDeleteAfterupdate(null,Trigger.newMap,'update');   
        } 
        else if(Trigger.isDelete){
            
        }
        else if(Trigger.isUndelete){
            
        }
        
    }
    
}