public class ListAllObjectFieldsController {
    
    
    @AuraEnabled
    public static Map<String,String> getAllObject(){
        
        Map<String,String> returnObjectMap = new Map<String,String>();
        
        map<String,Schema.SObjectType> objList = Schema.getGlobalDescribe(); 
        List<Schema.SObjectType> objectMapValues = objList.Values();
        system.debug('allobj -->'+objectMapValues);
        
        for(Schema.SObjectType  objType : objectMapValues ){
            String key = objType.getDescribe().getName();
            system.debug('key -->'+key);
            String value = objType.getDescribe().getLabel();
            system.debug('value -->'+value);
            returnObjectMap.put(key,value);
        }
        System.debug('returnObjectMap-->'+returnObjectMap);
        
        
        if(returnObjectMap != null && returnObjectMap.size() > 0){
            return returnObjectMap;
        }else{
            return null;
        }
        
    }
     @AuraEnabled
    public static List<String> getFieldData(String SelectedField){
        List<String> allFields = new List<String>();
        
        map<String , schema.SObjectType> objectMap = Schema.getGlobalDescribe();
        SObjectType objType = objectMap.get(SelectedField);
       // system.debug('objType-->'+objType);
        
        Map<String,schema.SObjectField> objectTypeFields = objType.getDescribe().fields.getMap();
     //   system.debug( 'objectTypeFields-->'+objectTypeFields);
        
        if(!objectTypeFields.isEmpty()){
            for(String fielName  :objectTypeFields.keySet()){
                String fieldLabel = objectTypeFields.get(fielName).getDescribe().getLabel();
           //     system.debug('fieldLabel---->'+fieldLabel);
              allFields.add(fieldLabel);
            } 
        }
        
      return allFields;  
    }
     
}