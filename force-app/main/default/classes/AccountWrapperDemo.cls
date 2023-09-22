public class AccountWrapperDemo {

     
    @auraEnabled
    public static List<AccountWrapper> getAccountWithContact(){
        List<AccountWrapper> wrapList = new List<AccountWrapper>();
        List<Account> accList = [select id,Name,Type,BillingState, (SELECT Id,FirstName, LastName FROM Contacts) from Account];
        
        if(!accList.isEmpty()){
            for(Account acc: accList){ 
                  wrapList.add(new AccountWrapper(acc,acc.Contacts));
            }
        }
          
        return wrapList;
        
    }
 
    public class AccountWrapper{
         
        @auraEnabled public Account account{get;set;}
        @auraEnabled public List<Contact> cntList{get;set;}
        
        public AccountWrapper(Account account,List<Contact> cntList){
            this.account = account;
            this.cntList = cntList;
        }
    }
}