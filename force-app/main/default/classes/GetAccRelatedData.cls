public class GetAccRelatedData{
    
    @AuraEnabled
    public static List<account> getAllData(String recId){
        List<Account> accList = [select Id,(select Id, Name from Contacts), (select Id,Name from Opportunities) from account where Id =: recId];
        system.debug('accList--->'+accList);
        if(!accList.isEmpty()){
            return accList;  
        }
        return null;
    }
}