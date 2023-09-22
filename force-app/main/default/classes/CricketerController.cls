public class CricketerController {

    @AuraEnabled(cacheable=true)
    public static List<grensi__Cricketers__c> getCricketerList(string nationality){
        system.debug('nationality->'+nationality);
        
        if(nationality == ''){
           return  [select Id,Name,grensi__Age__c,grensi__Runs__c,grensi__Image_url__c,grensi__Images__c,grensi__Nationality__c from grensi__Cricketers__c];  
        }else{
             return  [select Id,Name,grensi__Age__c,grensi__Runs__c,grensi__Image_url__c,grensi__Images__c,grensi__Nationality__c from grensi__Cricketers__c
                      WHERE grensi__Nationality__c =: nationality ];
        }
          
    }
    
    @AuraEnabled(cacheable=true)
    public static grensi__Cricketers__c getSelectedPlayerDetail(string playerId){
        grensi__Cricketers__c cricketer = [select Id,Name,grensi__Age__c,grensi__Runs__c,grensi__Image_url__c,grensi__Images__c,grensi__Nationality__c from grensi__Cricketers__c
                      WHERE Id =: playerId ];
        return cricketer;
    }
}