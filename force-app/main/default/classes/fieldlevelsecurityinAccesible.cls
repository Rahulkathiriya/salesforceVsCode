public class fieldlevelsecurityinAccesible {
    public static void IsAccessible(){
        if( Schema.SObjectType.Account.Fields.Name.isAccessible() ||
           Schema.SObjectType.Account.Fields.Phone.isAccessible ())
        {
            List<Account> accList = [Select Name,Phone from Account Limit 100];
        }
    }
    
    
    public static void IsExecuteWithoutPermission(){
        if( Schema.SObjectType.Account.Fields.Name.isAccessible() ||
           Schema.SObjectType.Account.Fields.Marketing_priority__c .isAccessible ())
        {
            List<Account> accList = [Select Name,Marketing_priority__c  from Account Limit 100];
        }
    }
    
    @AuraEnabled
    public static List<Contact> getContacts(Id recordId) {
     	return [SELECT Id, FirstName, LastName, Email, Phone,Title, LeadSource  FROM Contact ORDER BY Name];
    }
   
     @AuraEnabled
    public static List<Opportunity> getOpportunities(Id recordId) {
     	return [SELECT Id, Name, Amount,Account.Name,StageName,CloseDate,Owner.Name,grensi__stageName__c  FROM Opportunity ORDER BY Name];
    }
   
    @AuraEnabled
    public static List<Account> getAccount(Id recordId) {
     	return [SELECT Id, Name , Site  , Phone  ,NumberOfEmployees   FROM Account ORDER BY Name];
    }
    
        @AuraEnabled
    public static AccountDataTableWrapper getAccountData(Integer pageNumber, Integer pageSize) {
        
        //Offset for SOQL
        Integer offset = (pageNumber - 1) * pageSize;
        
        //Total Records
        Integer totalRecords = [SELECT COUNT() FROM Account];
        Integer recordEnd = pageSize * pageNumber;
        
        //Instance of Contact DataTable Wrapper Class
        AccountDataTableWrapper objDT =  new AccountDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.contactList = [SELECT Id, Name , Site  , Phone  ,NumberOfEmployees   FROM Account   ORDER BY Name LIMIT :pageSize OFFSET :offset];
        return objDT;
    }
    
   public class AccountDataTableWrapper {
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public List<Account> contactList {get;set;}
    }
    
    @AuraEnabled
    public static ContactDataTableWrapper getContactData(Integer pageNumber, Integer pageSize) {
        
        //Offset for SOQL
        Integer offset = (pageNumber - 1) * pageSize;
        
        //Total Records
        Integer totalRecords = [SELECT COUNT() FROM Contact];
        Integer recordEnd = pageSize * pageNumber;
        
        //Instance of Contact DataTable Wrapper Class
        ContactDataTableWrapper objDT =  new ContactDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.contactList = [SELECT Id, FirstName, LastName, Email, Phone,Title, LeadSource  FROM Contact  ORDER BY Name LIMIT :pageSize OFFSET :offset];
        return objDT;
    }
    
    
    
     @AuraEnabled
    public static OpportunityDataTableWrapper getOpportunityData(Integer pageNumber, Integer pageSize) {
        
        //Offset for SOQL
        Integer offset = (pageNumber - 1) * pageSize;
        
        //Total Records
        Integer totalRecords = [SELECT COUNT() FROM Opportunity];
        Integer recordEnd = pageSize * pageNumber;
        
        //Instance of Contact DataTable Wrapper Class
        OpportunityDataTableWrapper objDT =  new OpportunityDataTableWrapper();  
        objDT.pageSize = pageSize;
        objDT.pageNumber = pageNumber;
        objDT.recordStart = offset + 1;
        objDT.recordEnd = totalRecords >= recordEnd ? recordEnd : totalRecords;
        objDT.totalRecords = totalRecords;
        objDT.contactList = [SELECT Id, Name, Amount , Type ,StageName , LeadSource  FROM Opportunity ORDER BY Name LIMIT :pageSize OFFSET :offset];
        return objDT;
    }
    
     public class OpportunityDataTableWrapper {
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public List<Opportunity> contactList {get;set;}
    }
    
    //Wrapper Class For Contact DataTable  
    public class ContactDataTableWrapper {
        @AuraEnabled
        public Integer pageSize {get;set;}
        @AuraEnabled
        public Integer pageNumber {get;set;}
        @AuraEnabled
        public Integer totalRecords {get;set;}
        @AuraEnabled
        public Integer recordStart {get;set;}
        @AuraEnabled
        public Integer recordEnd {get;set;}
        @AuraEnabled
        public List<Contact> contactList {get;set;}
    }
    
    @AuraEnabled
    public static List<Account> getAllRecords(String pageNumber,String currnetPagesCount){
        String accountQuery = 'SELECT Id, FirstName, LastName, Email, Phone,Title, LeadSource  FROM Contact ORDER BY Name LIMIT '+currnetPagesCount+' OFFSET ';
        if(String.isBlank(pageNumber) || Integer.valueOf(pageNumber) == 1){
            accountQuery = accountQuery + ' 0';
        }else{
            accountQuery = accountQuery + String.valueOf((Integer.valueOf(pageNumber)-1)*Integer.valueOf(currnetPagesCount));
        }
        return Database.query(accountQuery);
    }
}