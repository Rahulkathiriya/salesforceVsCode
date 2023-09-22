trigger DescriptionUpdate on Contact (after update) {
    
    Set<Id> accIds = new Set<Id>();
    
    
    if(trigger.isAfter && trigger.isUpdate){
        if(!trigger.new.isEmpty()){
            for(Contact con : trigger.new){
                if(con.AccountId != null && trigger.oldMap.get(con.Id).Description != con.Description){
					accIds.add(con.AccountId);
                }
            }
        }
    }
    Map<Id,Account> accMap = new Map<Id,Account>([select Id,Description from account where Id IN : accIds]);
    List<Account> listTobeUpdate = new list<account>();
    
    if(trigger.new.isEmpty()){
        for(Contact cont : trigger.new){
			Account acc = accMap.get(cont.AccountId);
            acc.Description = cont.Description;
            listTobeUpdate.add(acc);
            
        }
    }
    if(!listTobeUpdate.isEmpty()){
		update listTobeUpdate;
    }
    
}