public with sharing class inputfieldAura {

    @AuraEnabled
    public static Contact getCon(){

        return[select Id,Name,LastName,Email,Phone from Contact];
    }
    
    @AuraEnabled
    public static Account getAcc(){
        return[select Id,Name,Phone from Account];
    }
    
    @AuraEnabled
    public static Account a111(){
        return[select Id,Name from Account limit 1];
    }
}