public class SampleWrapper1 {
    // We are to get the Accouunt Name , list of all Contacts with that account , and a count of all of the contacts of that account
    
    @AuraEnabled(cacheable=true)
    public static List<AccountContactWrapper> showAccountData(){
        
        List<AccountContactWrapper> wrapperList = new List<AccountContactWrapper>();
        
        List<Account> accList = [select Id,Name, (select Id,LastName,Email From contacts) From Account];
        
        for(Account a : accList){
         /* AccountContactWrapper obj = new AccountContactWrapper();
            obj.accountName = a.Name;
            obj.contactList = a.contacts;
            obj.contactCount = a.contacts.size();
            wrapperList.add(obj); */
            wrapperList.add(new AccountContactWrapper(a.Name, a.contacts, a.contacts.size()));
            
        }
        system.debug('wrapperList----->'+wrapperList);
        
        return wrapperList;
    }
    
    
    // Innerclass 
    public class AccountContactWrapper{
        @AuraEnabled public String accountName {get;set;}
        @AuraEnabled public List<Contact> contactList {get;set;}
        @AuraEnabled public Integer contactCount {get;set;}
        
        public AccountContactWrapper(String accountName, List<Contact> contactList,Integer contactCount   ){
            this.accountName = accountName;
            this.contactList = contactList;
            this.contactCount = contactCount;
        }
        
    }
    
}