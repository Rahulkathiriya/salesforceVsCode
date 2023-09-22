trigger ValidateOpreation on Account (before insert) {

    if(trigger.isBefore && trigger.isInsert){

       set<String> accIds = new set<String>();
        for(Account acc : trigger.new){
            if(acc.Id != null){
               accIds.add(acc.id);     
            }
        }
        
        
        Map<String, Account> accIdToAccMap = new Map<String,Account>();
        
        for(Account a : [select id,Name from Account where id IN:accIds]){
            
            Account oldAcc = accIdToAccMap.get(a.Id);
            if(oldAcc != null && oldAcc.Name == a.Name){
               a.addError('duplicate name found : ' + oldAcc.Name);
            }
        }
    }
    
}