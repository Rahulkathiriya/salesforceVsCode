trigger accountcreated on Account (before insert) {
    
    
    
    if(trigger.isInsert){
        
        List<Contact> conList = new List<Contact>();
        for(Account acc: trigger.new){
            
            if(acc.Name == 'Dhruvil'){
                
                Contact con = new Contact();
                con.LastName = acc.Name+'contact';
                con.AccountId = acc.Id;
                conList.add(con);
            }
        }
        insert conList;
    }   
    
   // system.debug('before insert' + trigger.new);
    
    
}