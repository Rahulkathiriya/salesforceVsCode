public class upsertdml {

    public static void upserrecord(){
        
        List<Account> a1 = new List<Account>();
        
        Account accobj1 = new Account();
        accobj1.Name = 'upsert record';
        
        
        Account accobj2 = [select Id,Name from Account where id = '0015g000017znGRAAY'];
        accobj2.Phone = '777777777';
        
        a1.add(accobj1);
          a1.add(accobj2);
        system.debug('a1 value :'+ a1);
        
        if(!a1.isEmpty()){
            upsert a1;
        }
    }
}