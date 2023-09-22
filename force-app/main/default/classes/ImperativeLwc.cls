public class ImperativeLwc {
    
    @AuraEnabled
    public static List<Account> getAccountData(){
        List<account> accList= [select Id,Name from Account limit 10];
        return accList;
    }
    
    @AuraEnabled
    public Static List<Contact> getAccRelatedConData(string accId){
        List<Contact> conList = [select Id,Name from Contact where AccountId =: accId ];
        return conList;
    }
}