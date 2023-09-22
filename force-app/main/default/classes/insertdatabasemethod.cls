public class insertdatabasemethod {

    public static void databaseinsert(){
        List<Account> list1 = new List<Account>();
        
        Account accobj1 = new Account();
        accobj1.Name = 'saleforce';
        
        Account accobj2 = new Account();
        accobj2.Name = 'apex';
        
        list1.add(accobj1);
        list1.add(accobj2);
        
        system.debug('list value :'+ list1);
        
        Database.SaveResult[] insertList = Database.insert(list1, false);  
        
        for(Database.SaveResult sr : insertList){
            if(sr.isSuccess()){
                system.debug('successfully insertd account with ACCOUNT ID :'+ sr.getId());
            }else{
                for(Database.Error err : sr.getErrors()){
                    system.debug(err.getStatusCode() + ':' + err.getMessage());
                    system.debug('Account field that affected this error : '+ err.getFields());
            } 
        }
 }
}
}