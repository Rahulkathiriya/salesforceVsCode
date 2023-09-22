public class AccountUiController {
    
    @AuraEnabled
    public static List<Account>  getRecordName(){
        List<Account> accList = [select Id,Name,Type from Account limit 5];
        return accList;
    }
    
    @AuraEnabled
    public static List<Contact> getAccRelatedCon(String AccId){
        List<Contact> conList = [select Id,Name,AccountId from Contact where AccountId =: AccId ];
        return conList;
    }
    @AuraEnabled
    public static List<Opportunity> getAccRelatedOpp(String AccId){
        List<Opportunity> oppList = [select Id,Name,AccountId from Opportunity where AccountId =: AccId ];
        return oppList;
    }
    
    @AuraEnabled
    public static List<Case> getAccRelatedCase(String AccId){
        List<Case> CaseList = [select Id,Status,Origin, Account.Name from Case where AccountId =: AccId ];
        return CaseList;
    }
    
    @AuraEnabled
    public static List<ContentDocumentLink> getAccRelatedNoteAttch(String AccId){
        List<ContentDocumentLink> noteList = [select Id,ContentDocumentId,LinkedEntityId from ContentDocumentLink where LinkedEntityId =: AccId ];
        
        return noteList;
    }
}