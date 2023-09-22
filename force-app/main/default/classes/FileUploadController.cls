public with sharing class FileUploadController {
    
    @AuraEnabled
    public static Id SaveFile(Id parentId, String fileName, String base64Data, String contentType) {
        base64Data = EncodingUtil.urlDecode(base64Data, 'UTF-8');
        Attachment attach = new Attachment();
        attach.parentId = parentId;
        attach.Body = EncodingUtil.base64Decode(base64Data);
        attach.Name = fileName;
        attach.ContentType = contentType;
        Insert attach;
        return attach.Id;
    }
    
    @AuraEnabled
    public static string LeadAccountInfo(Id ldvalue){
        Account ac=[select id,Name from Account where Id =:ldvalue limit 1];
        return ac.Name;
    }
}