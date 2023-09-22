public class KanbanViewController {
    
    @AuraEnabled
    public static kanbanWrap getAllData(String objName, List<String> objectFields, String fieldPicklistApiName) {
        List<String> lstPickvals = new List<String>();
        for (Schema.PicklistEntry a : Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap().get(fieldPicklistApiName).getDescribe().getPickListValues()) {
            lstPickvals.add(a.getValue());
        }
        String query = 'SELECT Id, ';
        for(String fields : objectFields){
            query += fields + ' ,';
        }
        query = query.removeEnd(',');
        query += ' FROM ' + objName;
        system.debug('query---->'+query);
        system.debug('lstPickvals--------->'+lstPickvals);
        return new kanbanWrap(Database.query(query), lstPickvals);
    }
    
    @AuraEnabled
    public static String getUpdatePickListValue(Id recordId, String fieldPicklistApiName, String pickListUpdatedValue) {
        SObject sObjectRecord = recordId.getSObjectType().newSObject(recordId);
        
        sObjectRecord.put(fieldPicklistApiName, pickListUpdatedValue);
        system.debug('sObjectRecord---->'+sObjectRecord);
        update sObjectRecord;
        return 'Success';
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
    
}