public with sharing class comunicationController {

    @AuraEnabled
    public static string sendMessage(String senderId, String type, String objectString){
        grensi__Connection_Message__e msg = new grensi__Connection_Message__e( 
            																	grensi__Object__c = objectString,
                                                                            	grensi__SenderId__c = senderId,
                                                                            	grensi__Type__c = type
        																		);
        
        Database.SaveResult sr = EventBus.publish(msg);
        
        system.debug('sr-->'+sr);
        if(sr.isSuccess()){
           return('SUCCESS'); 
        }
        
        return ('FAILURE');
    }
    
}