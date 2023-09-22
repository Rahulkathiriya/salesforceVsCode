public class FliterAccountDataGet {
    
    @AuraEnabled
    public static map<string,list<object>> getObjectFields (String objName)
    {
      
        map<string,list<object>> retVal = new map<string,list<object>>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
        for (String fieldName: fieldMap.keySet())
        {  
            string fieldType = String.ValueOf(fieldMap.get(fieldName).getDescribe().getType());
            if(fieldType != 'TEXTAREA'  )
            {
                String FieldAPI=fieldMap.get(fieldName).getDescribe().getName();
                List<String> listStrings = new List<String>();
                listStrings.add(FieldAPI);
                listStrings.add(fieldType); //Adding field type 
                string FieldLabelName=fieldMap.get(fieldName).getDescribe().getLabel();
                retVal.put(FieldLabelName,listStrings);                
            }
        }
        system.debug('retval-->'+retVal);
        return retVal;
    }
}