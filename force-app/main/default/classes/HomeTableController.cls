public class HomeTableController {
    
    @AuraEnabled
    public static List<contact> getAllData(){
        return[SELECT Id, Name,LastName, Phone, LeadSource FROM Contact];
    }
    @AuraEnabled
    public static void DeleteRecord(String deleteId){
        Contact con = new Contact();
        con.Id = deleteId;
        delete con;
    }
    
    @AuraEnabled
    public static List<Contact> getSearchFilterData(String SearchData){
        String sQuery = 'select Id,Name,LastName,Phone,LeadSource from Contact  where (Name LIKE \'%' + SearchData + '%\') OR (LastName LIKE \'%' + SearchData + '%\') OR (Phone LIKE \'%' + SearchData + '%\') OR (LeadSource LIKE \'%' + SearchData + '%\') ';  
        return database.query(sQuery);
    }
    
    @AuraEnabled
    public static Map<String, List<Object>> getFilterFieldName(String objName){
        map<String, List<object>> allFieldData = new map<String, List<object>>();
        Map<String,schema.SObjectField> FieldMap = schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
        for(String FieldName :FieldMap.keySet() ){
            String FieldDataType =String.valueOf(FieldMap.get(FieldName).getDescribe().getType());
            if(FieldDataType != 'ID'  && FieldDataType != 'REFERENCE'){
                String FieldAPI=fieldMap.get(fieldName).getDescribe().getName();
                if(FieldAPI != 'IsDeleted'  && FieldAPI != 'CreatedDate' && FieldAPI != 'LastModifiedDate' && FieldAPI != 'SystemModstamp' && FieldAPI != 'LastActivityDate' && FieldAPI != 'LastCURequestDate' && FieldAPI != 'LastCUUpdateDate' && FieldAPI != 'LastViewedDate' && FieldAPI != 'LastReferencedDate' && FieldAPI != 'Jigsaw' && FieldAPI != 'JigsawContactId' && FieldAPI != 'Pronouns' && FieldAPI != 'grensi__insertonaccount_c__c' ){
                    List<String>  listString = new List<String>();
                    liststring.add(FieldDataType);
                    listString.add(FieldAPI);
                    String FieldLabelName =  fieldMap.get(FieldName).getDescribe().getLabel();
                    allFieldData.put(FieldLabelName,listString);                
                }
            }
        }
        return allFieldData;
    } 
    
    /*  @AuraEnabled
public static Map<String,Map<String,List<Object>>> getdatafilter (String objName){
Map<String,schema.SObjectField> FieldMap = schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
//  system.debug('FieldMap---------->'+FieldMap);
for(String FieldApiName :FieldMap.keySet() ){
//  system.debug('FieldApiName---------->'+FieldApiName);  
String FieldDataType =String.valueOf(FieldMap.get(FieldApiName).getDescribe().getType());
//  system.debug('FieldDataType---------->'+FieldDataType);

if(FieldDataType == 'PICKLIST'){
String FieldAPI=fieldMap.get(FieldApiName).getDescribe().getName();
//   system.debug('FieldAPI---------->'+FieldAPI);

//List<Schema.PicklistEntry> values = Contact.get(FieldAPI).getDescribe().getPicklistValues();  
}  
}
return null;
}

} */
    
    
    @AuraEnabled
    public static  map<string, List<object>> getPickListValuesIntoList(string objName, string picName){
        
        List<String> pickListValuesList= new List<String>();
        
        Map<String, SObjectType> globalDescribe = Schema.getGlobalDescribe();
        
        DescribeSObjectResult describeSObjectResult = globalDescribe.get(objName).getDescribe();
        
        Schema.DescribeFieldResult fieldResult = describeSObjectResult.fields.getMap().get(picName).getDescribe();
        
        map<string, List<object>> apiPicklistValue = new map<string, List<object>>();
        
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }  
        
        apiPicklistValue.put('Type',pickListValuesList);
        return apiPicklistValue;
    } 
    
    @auraEnabled
    public static List<sObject> ApplyFilterData( String selectedField, String selectedOpratorValue,String FilterInputValue,string FilterDateInputValue){
        
        string formatDate = FilterDateInputValue;
        Date dt;
        string sQuery  = 'SELECT Id, Name,LastName, Phone, LeadSource FROM Contact '; 
        if(selectedOpratorValue == 'LIKE'){
            FilterInputValue =  '%' + FilterInputValue + '%'; 
        } 
          
        if(!String.isEmpty(FilterInputValue)){
            sQuery += 'where ' + selectedField + ' '+ selectedOpratorValue + ' ' + ' : FilterInputValue'; 
        }
        if(formatDate != null && formatDate != '' ){
            dt = date.valueOf(formatDate);
            sQuery += 'where ' + selectedField + ' '+ selectedOpratorValue + ' ' + ' : dt'; 
        } 
        
        List<sObject> resultquery = Database.query(sQuery);
        system.debug('resultquery-->'+resultquery); 
        return resultquery;
    }
    
  
    
}