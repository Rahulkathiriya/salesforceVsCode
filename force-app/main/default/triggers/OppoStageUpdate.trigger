trigger OppoStageUpdate on Account (after insert) {
    Set<Id> accIds = new Set<Id>();
    for(Account acc: Trigger.new){
        accIds.add(acc.Id);
        
     //   Account a1  = new Account();
      //  a1.Id = acc.Id;
        system.debug('acc--->'+accIds);
    }
}