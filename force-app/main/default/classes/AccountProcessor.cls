public class AccountProcessor {
    @future
    public static void countContacts(List<Id> accountIds){
        List<Account> accounts = [Select Id, Name from Account Where Id IN : accountIds];
        system.debug('accounts------->'+accounts);
        
        List<Account> updatedAccounts = new List<Account>();
        for(Account account : accounts){
           account.Number_of_Contacts__c = [Select count() from Contact Where AccountId =: account.Id];
            System.debug('updatedAccounts ---> ' + updatedAccounts);
            updatedAccounts.add(account);
        }
        update updatedAccounts;
    }
}