trigger CreateContactController on Account (after insert, after update) {

    //system.debug('Data :'+ Trigger.new);
    
    List<Contact> contList = new List<Contact>();
    
    for(Account acc :Trigger.new){
        
        Contact con1 = new Contact();
        con1.LastName = acc.Name + '_contact';
        con1.AccountId=acc.Id;
        
        contList.add(con1);
    }
    insert contList;
    
}