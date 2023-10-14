public with sharing class ListViewClass  {
    
    
    
    @auraEnabled
    public static List<ListView> objectListView(String objName){
        
        String squery = 'SELECT Id, Name, DeveloperName, SobjectType FROM ListView WHERE SobjectType = :objName ORDER BY Name ASC';
        List<sObject> resultquery = Database.query(sQuery);
        //  system.debug('resultquery-->'+resultquery);
        
        return Database.query(squery);  
    }
    
    @auraEnabled
    public static list<sobject> getListViewQuery(String objName ,String listViewId) {
        
        List<SObject> recordList = new List<SObject>();
        
        try{
            Http http = new Http();                  
            HTTPRequest httpReq = new HTTPRequest();
            String orgDomain = Url.getOrgDomainUrl().toExternalForm();
            
            String endpoint = orgDomain + '/services/data/v37.0/sobjects/' + objName + '/listviews/' + listViewId + '/describe';
            
            httpReq.setEndpoint( endpoint );
            httpReq.setMethod( 'GET' );
            
            httpReq.setHeader( 'Content-Type', 'application/json; charset=UTF-8' );
            httpReq.setHeader( 'Accept', 'application/json' );    
            String sessionId = 'Bearer ' + fetchUserSessionId();
            httpReq.setHeader( 'Authorization', sessionId );
            
             
            HTTPResponse httpRes = http.send( httpReq );
            system.debug('httpRes --> ' + httpRes.getBody());
            
            ListViewsDescribeResponse listViewDescResp = ( ListViewsDescribeResponse ) JSON.deserialize( httpRes.getBody(), ListViewsDescribeResponse.class);
            system.debug('query --> ' + listViewDescResp.query);  
            string query =  listViewDescResp.query;
       
         /*  string additionalFields = 'grensi__SLA__c, grensi__Active__c';
            query = query.replace('SELECT', 'SELECT ' + additionalFields + ', '); */
          
            system.debug('string query --> ' + query);
            List<SObject> data = Database.query(query);
            
            for(SObject acc : data){
                recordList.add(acc);
            }
        }catch(Exception e){
            System.debug('Exception occurred : ' + e.getMessage());	
        } 
        
        return recordList;
    } 
 
   
       @auraEnabled
       public static void createListView(String objName , String viewName, String labelName){
        MetadataService.MetadataPort service = createService();
        MetadataService.ListView listView = new MetadataService.ListView();
        listView.fullName = objName + '.' + viewName;
        listView.label = labelName;
        listView.filterScope = 'Everything';
        listView.columns = new List<String> {};
         System.debug('listView : ' + listView);   
        List<MetadataService.SaveResult> results =
            service.createMetadata(
                new MetadataService.Metadata[] { listView });
        system.debug('results : ' + results);
        handleSaveResults(results[0]);

    }

     @auraEnabled
    public static MetadataService.MetadataPort createService()
    {
        MetadataService.MetadataPort service = new MetadataService.MetadataPort();
        service.SessionHeader = new MetadataService.SessionHeader_element();
        String sessionId =  fetchUserSessionId();
        service.SessionHeader.sessionId = sessionId;
        return service;
    }
     @auraEnabled
     public static void handleSaveResults(MetadataService.SaveResult saveResult) {
        // Nothing to see?
        if(saveResult==null || saveResult.success)
            return;
        // Construct error message and throw an exception
        if(saveResult.errors!=null)
        {
            List<String> messages = new List<String>();
            messages.add(
                (saveResult.errors.size()==1 ? 'Error ' : 'Errors ') +
                    'occured processing component ' + saveResult.fullName + '.');
            for(MetadataService.Error error : saveResult.errors)
                messages.add(
                    error.message + ' (' + error.statusCode + ').' +
                    ( error.fields!=null && error.fields.size()>0 ?
                        ' Fields ' + String.join(error.fields, ',') + '.' : '' ) );
            if(messages.size()>0)
               System.debug(String.join(messages, ' '));
        }
        if(!saveResult.success)
            System.debug('Request failed with no specified error.');
    }
    
    @AuraEnabled
    public static String fetchUserSessionId(){
        String sessionId = '';
        PageReference reportPage = Page.GetSessionIdVF;
        String vfContent = reportPage.getContent().toString();
        Integer startP = vfContent.indexOf('Start_Of_Session_Id') + 'Start_Of_Session_Id'.length(),
            endP = vfContent.indexOf('End_Of_Session_Id');
        sessionId = vfContent.substring(startP, endP); 
        return sessionId;
    }

    // filter class 
    
    @auraEnabled
    public static Map<String,List<Object>> getObjectFieldValues(String objName){
        
        Map<String,List<Object>> objectFields = new Map<String,List<Object>>();
        
        Map<String,Schema.SObjectField> fldMap = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
        
        for(String fieldName : fldMap.keySet()){
            
            String types = String.valueOf(fldMap.get(fieldName).getDescribe().getType());
            if(types != 'ID' && types != 'REFRENCE'){
                
                String apiName = fldMap.get(fieldName).getDescribe().getName();
                List<String> apiAndName = new List<String>();
                apiAndName.add(apiName);
                apiAndName.add(types);	
                String labelName = fldMap.get(fieldName).getDescribe().getLabel();
                objectFields.put(labelName,apiAndName);
            }
        }
        	
        return objectFields;
    }
    
    
    
    @auraEnabled
    public static Map<String,List<Object>> pickListValue(String objectName, String pickValueType){
        
        
        List<string> pickList = new List<String>();
        
        Map<String,sobjectType> globalDes = schema.getGlobalDescribe();
        
        DescribeSobjectResult result =  globalDes.get(objectName).getDescribe();
        
        schema.DescribeFieldResult fldResult = result.fields.getMap().get(pickValueType).getDescribe();
        
        Map<String,List<Object>> pickListValues = new Map<String,List<Object>>();
        List<schema.PicklistEntry> pickEntry = fldResult.getPicklistValues();
        for(schema.PicklistEntry pickEn : pickEntry ){
            pickList.add(pickEn.getLabel());
        }
        pickListValues.put('Type',pickList);
        return pickListValues; 
    }
    
    @auraEnabled
    public static List<sObject> filteredTable(String field, String opretor , String inputval ,String pickVal, string selectedDate,String objectName,List<String> fieldName ){
        String Value ;
        string sQuery;
        string formatDate = selectedDate;
        Date currDate;
        if(formatDate != null){
            currDate = date.valueOf(formatDate);
        }
        
        system.debug('dt-->'+currDate);
        if(!string.isEmpty(inputval)){
            if(opretor == 'LIKE'){
                Value =  '%' + inputval + '%'; 
            } else{
                Value =  inputval ;  
            }
        }else if(!string.isEmpty(pickVal)){
            Value = pickVal;
        }
        
        if(!string.isEmpty(Value)){
            sQuery = 'SELECT ' + String.join(fieldName, ',') + ' FROM ' + objectName;
            sQuery+= ' where ' + field + ' ' +  opretor   + ' : Value ';
            
        }else if(currDate != null){
            
            sQuery = 'SELECT ' + String.join(fieldName, ',') + ' FROM ' + objectName;
            sQuery+= ' where ' + field + ' ' +  opretor   + ' : currDate' ;
        }    
        
        
        List<sObject> resultquery = Database.query(sQuery);
        system.debug('resultquery-->'+resultquery);
        
        return resultquery;
    }
    
    
    @auraEnabled
    public static List<object> retriveList(String searchWord,String objectName,List<String> fieldName){
        system.debug('searchWord' + searchWord);
        system.debug('fieldName -->'+ String.join(fieldName, ','));
        String query = 'SELECT ' + String.join(fieldName, ',') + ' FROM ' + objectName;
        system.debug('query' + query);
        if(searchWord != null){
            String key = searchWord + '%';
            query += ' WHERE Name LIKE : key';
            system.debug('query' + query);
        }
        system.debug(Database.query(query));
        return Database.query(query);
        
    }
    
    
    @auraEnabled
    public static List<String> getFields(String fieldNames){
        
        List<String> objFieldsName = fieldNames.split(',');
        system.debug('fields -->'+ objFieldsName);
        return objFieldsName;
    } 
    
    @auraEnabled
    public static List<Map<String, Object>> getSelectedFieldRecords(String objectName, List<String> fieldNames) {
        
        String query = 'SELECT Id , ' + String.join(fieldNames, ',') + ' FROM ' + objectName;
        List<Map<String, Object>> records = new List<Map<String, Object>>();
        
        
        for (SObject record : Database.query(query)) {
            system.debug('record --> '+ record);
            Map<String, Object> recordMap = new Map<String, Object>();
            for (String fieldName : fieldNames) {
                recordMap.put(fieldName, record.get(fieldName));
            }
            records.add(recordMap);
        }
        
        return records;
    }
    
    @auraEnabled
    public static List<object> ownerFilterValue(String filterName,String objectName,List<String> fieldNames){
        String query;
        String ownerId = UserInfo.getUserId();
        
        
        if(filterName.startsWith('All')){
            system.debug('name --> ' + filterName);
            query = 'SELECT ' + String.join(fieldNames, ',') + ' FROM ' + objectName;
            
            
        }else if(filterName.startsWith('My')){
            system.debug('name --> ' + filterName);
            query = 'SELECT ' + String.join(fieldNames, ',') + ' FROM ' + objectName;
            query+= ' WHERE OwnerId =: ownerId';
            
        }
        
        return Database.query(query);
    }   	
    
    
    @auraEnabled
    public static void deleteObjectRecord(String recordId, String objName){
        
        String query = 'select id,Name from ' + objName;
        if(recordId != null){
            String key = recordId;
            query += ' WHERE Id =: key';
            system.debug('query' + query);
        }
        
        List<sobject> records = Database.query(query);
        
        if(records.size() > 0){
            delete records;
        }
    }
    
    
    /* Kanbanboard methods */ 
    
    
    @AuraEnabled
    public static kanbanWrap getKanbanWrapperDetails_Apex(String sObjectName, String[] sObjectFields, String sObjectPickListValue, String SummarizeField) {
        List<String> lstPickvals=new List<String>();
        for (Schema.PicklistEntry a : Schema.getGlobalDescribe().get(sObjectName).getDescribe().fields.getMap().get(sObjectPickListValue).getDescribe().getPickListValues()) {
            system.debug('pickval--------->'+a);
            lstPickvals.add(a.getValue());
        }
        String query = 'SELECT Id, ';	
        for(String fields : sObjectFields){
            query += fields + ' ,';
        }
        query = query.removeEnd(',');
        query += ' FROM ' + sObjectName;
        if(SummarizeField != null){
        query += ' WHERE '+ SummarizeField + ' != null';
        }
        return new kanbanWrap(Database.query(query), lstPickvals);
    }
    
    @AuraEnabled
    public static String getUpdatePickListValue_Apex(Id recordId, String sObjectPickListValue, String pickListUpdatedValue) {
        SObject sObjectRecord = recordId.getSObjectType().newSObject(recordId);
        system.debug('sObjectRecord---------->'+sObjectRecord);
        sObjectRecord.put(sObjectPickListValue, pickListUpdatedValue);
        update sObjectRecord;
        return 'success';
    }
    
    public class kanbanWrap{
        @AuraEnabled
        public List<sObject> records {get;set;}
        @AuraEnabled
        public List<String> pickVals {get;set;}
        
        public kanbanWrap(List<sObject> recs, List<String> pVals){
            this.records = recs;
            this.pickVals = pVals;
        }
    }
    
    @AuraEnabled
    public static Map<String,String> getPicklistFields(String objectName) {
        Map<String,String> picklistFields = new Map<String,String>();
        
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectName);
        if (objectType != null) {
            
            Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
            
            for (Schema.SObjectField field : objectDescribe.fields.getMap().values()) {
                Schema.DescribeFieldResult fieldDescribe = field.getDescribe();
                
                if (fieldDescribe.getType() == Schema.DisplayType.Picklist) {
                    String fieldLabel = fieldDescribe.getLabel();
                    String fieldApiName = fieldDescribe.getName();
                    system.debug('pick --> ' + fieldLabel +' '+fieldApiName );
                    picklistFields.put(fieldLabel,fieldApiName);
                }
            }
        }
        return picklistFields;
    }
    @auraEnabled 
    public static Map<String , String> queryDynamicFields(String objectApiName) {
         
        Schema.SObjectType sObjectType = Schema.getGlobalDescribe().get(objectApiName);
        
        Map<String, Schema.SObjectField> objectFields = sObjectType.getDescribe().fields.getMap();
        Map<String, String> NmberFields = new Map<String, String>();
        
        for (String fieldName : objectFields.keySet()) {
            Schema.SObjectField field = objectFields.get(fieldName);
            Schema.DisplayType fieldType = field.getDescribe().getType();
            
            if (fieldType == Schema.DisplayType.CURRENCY || fieldType == Schema.DisplayType.INTEGER || fieldType == Schema.DisplayType.DOUBLE) {
                NmberFields.put(field.getDescribe().getLabel(), field.getDescribe().getName()); 
            } 
        }
        system.debug('NmberFields --> ' + NmberFields);
        return NmberFields;
    }
    
    @auraEnabled
    public static String deleteListOfRecords(String objName, List<String> recordIdList){
        
        String query = 'select id,Name from ' + objName;
        query += ' WHERE Id =:	recordIdList';
        
        List<SObject> allRecords = Database.query(query);
        system.debug('Records --> '+ allRecords);
        if(!allRecords.isEmpty()){
            delete allRecords;
            return 'Success';
        }
        return null;
        
    }
    
    @auraEnabled
    public static List<Object> getSelectedRecordList(String objectName, List<String> fieldNames) {
        
        String query = 'SELECT Id , Owner.Alias, ' + String.join(fieldNames, ',') + ' FROM ' + objectName;
        List<Object> records = new List<Object>();
        
        for (SObject record : Database.query(query)) {
            system.debug('record --> '+ record);
            records.add(record);	
        }
        return records;
    }
    
    
   
}