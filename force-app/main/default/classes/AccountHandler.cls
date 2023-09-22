public class AccountHandler {

    
    public static void  insertAccount( integer value){
        
        List<Account> addAccounts = new List<Account>();
        
        
     integer   N = 1;
        
        while(N <=value ){
            Account acc =new Account();
            acc.Name = ' Acme Inc N' +N;
            acc.AccountNumber ='A000n' +N;
            acc.Phone ='8787656435634756' +N;
            addAccounts.add(acc);
            system.debug(addAccounts);
            N=N+1;
        }
        insert addAccounts;
        
    }
}