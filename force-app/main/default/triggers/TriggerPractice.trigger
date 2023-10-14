// 1}
/* Write a trigger, if the owner of an account is changed then the owner for the related contacts should also be updated.
trigger TriggerPractice on Account (after update) {

if(trigger.isUpdate&&Trigger.isAfter){
List<Id> accId = new List<Id>();

for(Account acc : trigger.new){
if(acc.OwnerId != Trigger.oldMAp.get(acc.Id).OwnerId){
system.debug('account Id '+ acc.Id);
accId.add(acc.Id);
}
}

if(accId.size() != 0){
List<Contact> conList = [select id,OwnerId,AccountId from contact where AccountId IN : accId];
system.debug('conlist-->'+conList);

for(Contact con : conList){
con.OwnerId = Trigger.newMap.get(con.AccountId).OwnerId;
} 
update conList;
}
}
} */

// 2} 
trigger TriggerPractice on Account (after insert, after Update) {
    
    if(Trigger.isInsert && Trigger.isAfter){
        List<Opportunity> oppList = new List<Opportunity> ();
        
        for(Account acc : Trigger.new){
            if(acc.Industry == 'Agriculture'){
                oppList.add(new Opportunity (Name = acc.Name + ' opp',
                                             AccountId = acc.Id,
                                             StageName = 'Prospecting',
                                             Amount = 0, 
                                             CloseDate = system.today() + 90 ));
            }
        }
        
        if(oppList.isEmpty() == false){ 
            insert oppList; 
        }
        
    }
    
    
    if(trigger.isUpdate && trigger.isAfter){
        List<Opportunity> oppList = new List <Opportunity>();
        for(Account acc : Trigger.new){
            if(acc.Industry != trigger.oldMap.get(acc.Id).Industry && acc.Industry == 'Agriculture'){
                oppList.add(new Opportunity (Name = acc.Name + ' opp',
                                             AccountId = acc.Id,
                                             StageName = 'Prospecting', 
                                             Amount = 0, 
                                             CloseDate = system.today() + 90 ));
            }
        }
        if(oppList.isEmpty() == false){
            insert oppList;
        }
    }
    
}