public class foreachDemoClass {

    @AuraEnabled(cacheable=true)
    public static List<grensi__Demo_School__c> getScudentList(){
        List<grensi__Demo_School__c>  s1 = [select Id,Name from grensi__Demo_School__c];
        return s1;
        
    }
}