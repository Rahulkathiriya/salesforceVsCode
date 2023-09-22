public class KanbanDragAndDropCompCtrl {
    @AuraEnabled
    public static kanbanWrap getKanbanWrapperDetails_Apex(String sObjectName, String[] sObjectFields, String sObjectPickListValue) {
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
    
    
    @auraEnabled
    public static String deleteObjectRecord(String recordId, String objName){
        try{
        system.debug('recordId --> ' + recordId);
        system.debug('objName --> ' + objName);
        String query = 'select id from ' + objName;
        if(recordId != null){
            String key = recordId;
            query += ' WHERE Id =: key';
            system.debug('query' + query);
        }
        
        List<sobject> records = Database.query(query);
        
        if(records.size() > 0){
            delete records;
        }
            
           return 'SUCCESS'; 
        }catch(Exception e){
            system.debug('Error occured : ' + e);
        } 
        
        return null;
    }
    
    

}