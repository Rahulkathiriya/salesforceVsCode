trigger NameController on Account (before update,before insert) {
    
    
    List<Account> accList = new List<Account>();
    
    for(Account acc:trigger.new)
    {
        if(acc.Name == 'ABC' || acc.BillingCity == 'surat' || acc.BillingCountry == 'india'){
            Account a1 = new Account();
            a1.Name = acc.Name;
            a1.Phone = acc.Phone;
             a1.NumberOfEmployees = acc.NumberOfEmployees;
            
        }else{
            Account a2 = new Account();
            a2.Name = acc.Name;
             a2.Phone = acc.Phone;
             a2.NumberOfEmployees = acc.NumberOfEmployees;
            system.debug('a2 value '+a2);
            
        }
        
        
        
    }
}