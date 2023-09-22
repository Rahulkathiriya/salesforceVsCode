public class TaskDay4 {
    
    @AuraEnabled
    public static List<Account> getAccData(){
        return [select  Id,Name from account Order by  Name ASC limit 10];
    }
    @AuraEnabled
    public static boolean inputIdValue(string a1 ){
        Account acc = new Account();
        acc.Name = a1;
        insert acc;
        return true;
    }
    @AuraEnabled
    public static  Account getAccById(String Ids){
        return[select Id,Name from Account where Id =:Ids];
    }
    @AuraEnabled
    public static boolean getupdaterecord(String name,String justId){
        Account acc = new Account();
        acc.Name = name;
        acc.Id = justId;
        update acc;
        return true;
    }
    
    @AuraEnabled
    public static void deleteRecordById(String DeleteId){
        Account acc =new Account();
        acc.Id = DeleteId;
        delete acc;
    }
    
  
}