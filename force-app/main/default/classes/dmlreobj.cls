public class dmlreobj {

    public static void accobj(){
        List<Account> parentobj = new List<Account>();
        
       Account newone = new Account();
        newone.Name = 'luisy';
        newone.AnnualRevenue = 200;
        
        parentobj.add(newone);
        
        if(!parentobj.isEmpty()){
          
            
            insert parentobj;
              system.debug('parentobj values :'+ parentobj[0].Id);
            conobj(parentobj[0].Id);
        }
        
    }
    public static void conobj(string accid){
        
        Contact c1 = new Contact(
        FirstName = 'Dking',
            LastName = 'patelBhai',
            Phone = '352134523',
    AccountId =  accid      
        ); 
        insert c1;
    }
}