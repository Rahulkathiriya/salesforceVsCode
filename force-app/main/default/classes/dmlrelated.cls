public class dmlrelated {

    
    public static void insertrelated(){
        List<Account> acList1 = new  List<Account>();
        system.debug('aclist1 value :' + acList1);
        
        Account acc1 = new Account();
        acc1.Name = 'Ravi';
        acc1.NumberOfEmployees = 20;
        system.debug('acc1 value :'+ acc1);
        
        acList1.add(acc1);
         
        if(!acList1.isEmpty()){
            insert acList1;
            system.debug('aclist1 value :' + acList1[0].Id);
            insertRelatedContact(acList1[0].Id );
        }
        
    }
    
    public static void insertRelatedContact(string AccountIds){
        system.debug('AccountId from above method :'+ AccountIds);
        
        Contact con1 = new Contact(
        FirstName = 'smit',
            LastName = 'patel',
            Phone = '91095010',
            AccountId = AccountIds
        );
         insert con1;
     
    }
}