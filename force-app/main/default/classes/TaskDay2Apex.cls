public class TaskDay2Apex {
    @AuraEnabled
    public static List<Account> getInputValue(string add1){
        List<Account> acclist =new List<Account>();
        Account acc = new Account();
        acc.Name = add1;
        acclist.add(acc);
        system.debug('accList -->'+accList);
        insert acclist;
        return acclist;
    }
    @AuraEnabled
    public static List<Account> showTable(){
        return [select Id,Name from Account Order by Name ASC];

    }
    @AuraEnabled
    public static Account getIdTable(String Id){
          Account acc1 = [select Id,Name from Account where id =: Id];
     
        return acc1;
    }
    
  
    
}