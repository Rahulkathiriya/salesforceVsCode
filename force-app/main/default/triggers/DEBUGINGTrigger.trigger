trigger DEBUGINGTrigger on Account (after insert, after update) {
  /*	  Set<Id>idSet = new Set<Id>();     // pass trigger new id accList throgth (set of id)
        for(Account acc:Trigger.new){
          idSet.add(acc.Id);  
        }
     DebugingSkill.updateAccount(idSet); */
 
    
    string strData = JSON.serialize(trigger.new);
    system.debug('strData----------->'+ strData);
     DebugingSkill.updateAccount(strData);
}