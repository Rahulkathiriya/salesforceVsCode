public class DataTableApexClass {
    @AuraEnabled
    public static List<Account> getAllAccounts(){
        return [Select Id,Name ,AnnualRevenue,Description,NumberOfEmployees,Industry,Rating,Phone from Account] ; 
        
    }
    @AuraEnabled
    public static void updateAccount(List<Account> acc ){
        update acc;
    }
}