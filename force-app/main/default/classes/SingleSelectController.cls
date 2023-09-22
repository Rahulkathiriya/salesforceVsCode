public class SingleSelectController{
    @AuraEnabled
    public static List<Account> getAllRecord(){
        return [select Id,Name,Phone,Industry from Account limit 6];
    } 
 
}