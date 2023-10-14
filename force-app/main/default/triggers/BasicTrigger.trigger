trigger BasicTrigger on Account (before Insert, before Update, before Delete, after Insert, after Update, after Delete, after Undelete) {
    
    /* Account a = Trigger.new[0];
a.Name = a.Name + '.pvt Limited'; 
    
    
    
    
Account acc = Trigger.new[0];
Contact con = new Contact();
con.LastName = acc.Name + ' & company ';
insert con;

for(Account acc : trigger.new){
Account a = acc;
a.Name = a.Name + ' just Add another';
}

    
    
else if(trigger.isAfter || trigger.isInsert ){
Account ab = new Account();
ab.Name = acc.Name + ' after insert same obj';
insert ab;     
}

    
    //Trigger old
    
 
for(Account oldAcc : trigger.old){
for(Account newAcc : trigger.new){
if(oldAcc.Id == newAcc.Id && oldAcc.phone != newAcc.phone ){
newAcc.addError('Are you Serious? Phone cannot  be change ');
}
}
}   


//Trigger new map
Map<Id,Account> accMap = new Map<Id,Account>();
accMap = Trigger.newMap;

List<Contact> conList = [select LastName,AccountId,MailingCity from Contact where AccountId in : accMap.keySet()];

for(Contact c :conList ){
Account a = accMap.get(c.AccountId);
c.MailingCity = a.BillingCity;
}

update conList; 




//  Trigger old Map 
Map<Id,Account> aMap = new Map<Id,Account>();
aMap = trigger.oldMap;
for(Account acc : Trigger.new){
Account a = new Account();
a = aMap.get(acc.Id);
if(acc.Phone != a.Phone){
acc.Phone.addError('Amount cannot be change');
}
}

*/
    
    
    if(Trigger.isBefore){
        
        if(Trigger.isInsert){
            BasicTriggerHalper.BeforeInsert(Trigger.New);   
        }
        else if(Trigger.isUpdate){
            BasicTriggerHalper.BeforeUpdate(Trigger.oldMap,Trigger.New);   
        }
      
         else  If(Trigger.isDelete){
            BasicTriggerHalper.BeforeDelete(Trigger.old);
        }
        
        
    }
    else if(Trigger.isAfter){
        
        if(Trigger.isInsert){
            BasicTriggerHalper.afterInsert(Trigger.New);
        }
        
        else if(Trigger.isUpdate){
            BasicTriggerHalper.afterUpdate(Trigger.newMap);
        } 
        
      
        else if(Trigger.isDelete){
            BasicTriggerHalper.afterDelete(Trigger.old);
        }

        else if(Trigger.isUndelete){
            BasicTriggerHalper.afterUndelete(Trigger.newMap);
        }
        
    }
    
    
    
}