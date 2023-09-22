public class dmlmethoddemo {

    public static void demomethod(){
       insertdml(); 
    }
    public static void insertdml(){
        
        List<Account> accList = new List<Account>();
        system.debug('acclist value :' + accList);
        
        
       Account a1 = new Account();
        a1.Name = 'DHRUVILPATELAMRELI';
        
        //add method acclist inclue a1 object value
        accList.add(a1);
          system.debug('a1 value :'+ a1);  
        
        if(!accList.isEmpty()){
        
            insert acclist;
        }
         
    }
}