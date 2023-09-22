public class dmlUpdate {

    public static void updatemethod(){
        
        List<Account> updateacc = new List<Account>();
        
        Account n1 = [Select Id,Name,NumberOfEmployees from Account where Id ='0015g000017zo3YAAQ'];
        n1.NumberOfEmployees = 500;
        n1.Fax = '1550545451';
        n1.Industry = 'Enedhfdrgy';
        
        updateacc.add(n1);
        
        if(!updateacc.isEmpty()){
          update updateacc;
        }
    }
}