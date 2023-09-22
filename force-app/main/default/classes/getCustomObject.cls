public class getCustomObject {
    @AuraEnabled
    public static List<grensi__Student__c> getCOD(){
        return [select Id,Name,grensi__percentage__c,grensi__salary__c from grensi__Student__c];
    }
}