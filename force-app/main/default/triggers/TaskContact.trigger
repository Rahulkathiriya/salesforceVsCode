trigger TaskContact on Contact (after insert, after update, after Delete) {
    if(Trigger.isAfter){
        if(Trigger.isinsert){
           TaskTriggerHelper.afterInsertUpdateDelete(Trigger.new, null, null, 'afterInsert');
        }
        else if(Trigger.isupdate){
          TaskTriggerHelper.afterInsertUpdateDelete(Trigger.new, Trigger.oldMap, null, 'afterUpdate');    
        }
        else if(Trigger.isdelete){
         TaskTriggerHelper.afterInsertUpdateDelete(null, null, Trigger.old , 'afterDelete');  
         
        }
    }
}