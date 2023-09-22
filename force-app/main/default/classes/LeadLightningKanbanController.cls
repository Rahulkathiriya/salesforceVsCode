public class LeadLightningKanbanController {
    
    
    @AuraEnabled
    public static List<String> getPicklistValues(String objectApiName, String fieldApiName) {
        List<String> picklistValues = new List<String>();
        Schema.SObjectType objectType = Schema.getGlobalDescribe().get(objectApiName);
        if (objectType != null) {
            Schema.DescribeSObjectResult objectDescribe = objectType.getDescribe();
            Map<String, Schema.SObjectField> mapFields = objectDescribe.fields.getMap();
            List<Schema.PicklistEntry> lstPickListValues = mapFields.get(fieldApiName).getDescribe().getPickListValues();
            for (Schema.PicklistEntry objPickList : lstPickListValues) {
                string val = objPickList.getValue();
                //  System.debug('Value = ' +objPickList.getValue() +' , Label = ' +objPickList.getLabel());
                // system.debug('val------->'+val);
                picklistValues.add(val); 
            } 
        }
        system.debug('picklistValues--->'+picklistValues);
        return picklistValues;
    }  
    
    public static void getRecord( ){

    }
    
    


    
    
    
    
}