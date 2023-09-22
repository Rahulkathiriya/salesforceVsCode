public class DemoTask {

    @AuraEnabled
    public static List<Account> getacc(){
       List<Account> acList = [select Id,Name,Industry,Phone from Account limit 5 ];
        return acList;
    }
    
    @AuraEnabled
    public static List<Account> inputValue(string n1){
         List<Account> acccList = new List<Account>();
        Account acc = new Account();
        acc.Name =n1;
        acccList.add(acc);
        system.debug('accclist-->'+acccList);
        insert acccList;
        return acccList;
    }
    
    @AuraEnabled
    public static List<Account> inputGetValue(string button){
        List<Account> aList=new List<Account>();
        system.debug('button-->'+ button);
       
      return aList;
        
    }
}