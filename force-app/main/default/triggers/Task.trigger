trigger Task on Account (before Delete ,after insert,after update) {
    
    if(Trigger.isBefore){
        if(Trigger.isInsert){
            
        }  
        else if(Trigger.isInsert){
            
        } 
        else if(Trigger.isUpdate){
            
        } 
        else if(Trigger.isDelete){
            // TaskTriggerHelper.beforeDeleteAcc(Trigger.oldMap, Trigger.old);   
            // TaskTriggerHelper.beforeDeleteAfterupdate(Trigger.old); 
        } 
        
    }
    else if(Trigger.isAfter){
        
        if(Trigger.isInsert){
            // TaskTriggerHelper.afterInsertCon(Trigger.new);  
            // TaskTriggerHelper.afterInsertOpp(Trigger.new,null,'insert');
        }   
        else if(Trigger.isUpdate){
            // TaskTriggerHelper.afterUpdateCon(Trigger.oldMap,Trigger.new,Trigger.newMap);
            // TaskTriggerHelper.afterInsertOpp(Trigger.new,Trigger.oldMap,'update'); 
        } 
        else if(Trigger.isDelete){
            
        }
        else if(Trigger.isUndelete){
            
        }
        
    }
    
    
    
}