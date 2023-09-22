@isTest
public class AccountProcessorTest {
    @isTest
    public static void testNoOfContacts(){
        Account a = new Account();
        a.Name = 'Test Account';
        Insert a;
        
        Contact c = new Contact();
        c.FirstName = 'Bob';
        c.LastName =  'Willie';
        c.AccountId = a.Id;
        
        Contact c2 = new Contact();
        c2.FirstName = 'Dhruvin';
        c2.LastName = 'Pango';
        c2.AccountId = a.Id;
        
        List<Id> acctIds = new List<Id>();
        acctIds.add(a.Id);
        
        
        AccountProcessor.countContacts(acctIds);
      
    }

}