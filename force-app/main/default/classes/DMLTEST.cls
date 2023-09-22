public class DMLTEST {
    

    public static void demomethod(){
        
        
        //standerd  obj
      /*  Account a1 = new Account();
        a1.NumberOfEmployees = 10000000;
        a1.Name = 'abcdefg';
        insert a1; */
        
        
        // custom obj
    /*    grensi__Demo_School__c s1 = new grensi__Demo_School__c();
        s1.Name	= 'dhruvil';
        s1.grensi__EmployName__c = 100;
        insert s1; */
        
        //generic sObject
        
        sObject sObj = [select id, Name from Account where Name = 'abcdefg' limit 1];
        system.debug('sObj is Account obj : '+ sObj);
        
        
        
    }
    
}