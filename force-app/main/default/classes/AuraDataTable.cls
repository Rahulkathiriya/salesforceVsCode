public class AuraDataTable {
 @AuraEnabled
    public static List<Account> getAccDetail(){
       List<Account> acc = [SELECT Id, Name, BillingState, 
                                    Website, Phone, Industry, Type from Account LIMIT 10];
        return acc;
    }
}