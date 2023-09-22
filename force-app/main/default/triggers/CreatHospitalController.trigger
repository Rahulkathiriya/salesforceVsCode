trigger CreatHospitalController on grensi__Hospital__c (after insert) {
 //system.debug('Data :'+trigger.new);
    
    List<grensi__Patient__c> h1 = new List<grensi__Patient__c>();
    
    for(grensi__Hospital__c h2 :trigger.new){
        
      grensi__Patient__c  p1 = new grensi__Patient__c();
        p1.grensi__LastName__c  = h2.Name + '_patient';
        p1.Name = h2.Id;
        h1.add(p1);
    }
    insert h1;
}