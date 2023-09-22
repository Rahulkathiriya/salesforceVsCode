public class DataEditApex {
	@AuraEnabled
    public static List<grensi__Battle_Station__c> getcusdata(){
        return [select Id,Name,grensi__Project_Status__c,grensi__Weapons_Status__c from grensi__Battle_Station__c	];
    }
}