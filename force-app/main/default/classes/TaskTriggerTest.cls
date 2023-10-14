@isTest
private class TaskTriggerTest {
    
    @isTest
    static void accountTrigger_afterInsertTest(){
        Account acc = new Account (Name='DemoTest1sd',Type='Prospect');
        
        system.Test.startTest();
        insert acc;
        system.Test.stopTest();
        
        Account insertedAccount = [select Id,Name from Account LIMIT 1];
        List<Contact> insertedContacts = [select Id,Name, Account.Name from Contact limit 1];
        system.assertEquals(1,insertedContacts.size(),  'Only 1 Contact should present');
        System.assertEquals(insertedAccount.Name, insertedContacts[0].Account.Name, 'Account Name does not match');
         
    }
    
   
    
}