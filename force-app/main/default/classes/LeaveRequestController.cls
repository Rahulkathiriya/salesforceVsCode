public class LeaveRequestController {
    
    @AuraEnabled(cacheable=true)
    public static List<grensi__Leave_Request__c> getMyLeave(){
        try{
            List<grensi__Leave_Request__c> myLeaves = new List<grensi__Leave_Request__c>();
            myLeaves = [SELECT Id, Name, grensi__From_Date__c, grensi__To_Date__c, grensi__Reason__c, grensi__Status__c, grensi__Manager_Comment__c FROM grensi__Leave_Request__c
                        where grensi__User__c =: UserInfo.getUserId() ORDER BY CreatedDate DESC];
            system.debug('user Id -->'+ UserInfo.getUserId());
            system.debug('getMyLeave -->'+ myLeaves);
            return myLeaves;  
        }catch (Exception e){
            throw new AuraHandledException(e.getMessage());
        } 
    }   
    @AuraEnabled(cacheable=true)
    public static List<grensi__Leave_Request__c> getLeaveRequests(){
        try{
            List<grensi__Leave_Request__c> myLeaves = new List<grensi__Leave_Request__c>();
            myLeaves = [SELECT Id, Name, grensi__From_Date__c, grensi__To_Date__c, grensi__Reason__c, grensi__Status__c, grensi__Manager_Comment__c, grensi__User__r.ManagerId, grensi__User__r.Name FROM grensi__Leave_Request__c 
                        where grensi__User__r.ManagerId=:UserInfo.getUserId() ORDER BY CreatedDate DESC];
            system.debug('getLeaveRequests -->'+ myLeaves );
            return myLeaves;  
        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }   
    }
}