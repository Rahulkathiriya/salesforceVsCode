public class TaskFileUpload {
    
    @AuraEnabled
    public static  List<ContentDocumentLink> fileuploadpreview(String recId){
        List<ContentDocumentLink> links =[SELECT ContentDocumentId,LinkedEntityId FROM ContentDocumentLink where LinkedEntityId=:recId];
        system.debug('links -->'+links);
        return links;
    }
}