public class DatatableInLwc {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getObjectData(){
        List<Account> accList = [select Id,Name,Phone,Type,Industry from Account ];
        return accList;
    }
    
    
    @AuraEnabled(cacheable=true)
    public static List<String> picklistValue( String objectApiName, String fieldApiName){
        
        List<String> pickListValuesList= new List<String>();
        Map<String, SObjectType> globalDescribe = Schema.getGlobalDescribe();
        
        DescribeSObjectResult describeSObjectResult = globalDescribe.get(objectApiName).getDescribe();
        
        Schema.DescribeFieldResult fieldResult = describeSObjectResult.fields.getMap().get(fieldApiName).getDescribe();
        
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }  
        // system.debug('pickListValuesList-->'+pickListValuesList);
        return pickListValuesList;
    }
    
    @AuraEnabled(cacheable=true)
    public static List<sObject> getFilterData(String objectApiName, String comboboxSelectField, String comboboxSelectOperator, String inputStringValue, String inputIntegerValue, String InputDateValue, String InputBooleanValue ){
        
        //get object Fields
        List<String> ApiName = new List<String>();
        
        Map<String, Schema.SObjectType>  schemaMap =  Schema.getGlobalDescribe();
        schema.SObjectType objType = schemaMap.get(objectApiName);
        
        if(objType != null){
            schema.DescribeSObjectResult objDescribe = objType.getDescribe();
            Map<String,Schema.SObjectField> fieldMap = objDescribe.fields.getMap();
            for(String field :fieldMap.keySet() ){
                ApiName.add(field);
            }
            //  system.debug('ApiName-->'+ApiName);
        }
        
        String fieldApiName  = String.join(ApiName, ', ');
        //  system.debug('fieldApiName->'+fieldApiName);
        
        
        
        String sQuery;
        
        String stringValue;    
        
        String numberValue = inputIntegerValue;
        Integer integerValue;
        if( numberValue != '' ){
            integerValue = Integer.valueOf(numberValue); 
        }
        
        String dtValue = InputDateValue;
        Date dateValue;
        if(dtValue != '' ){
            dateValue = Date.valueOf(dtValue);   
        }
        
        String boolvalue = InputBooleanValue;
        Boolean booleanValue;
        if(boolvalue != '' ){
            booleanValue = Boolean.valueOf(boolvalue);   
        } 
   
        
        
        if(!String.isEmpty(inputStringValue) ){
            
            if(comboboxSelectOperator == 'LIKE'){
                stringValue = '%' + inputStringValue + '%';
                sQuery =  ' Select ' + fieldApiName + ' from ' + objectApiName;
                sQuery += ' where ' + comboboxSelectField + ' ' + comboboxSelectOperator + ' : stringValue ';   
                
            }else if(comboboxSelectOperator == 'NOT'){
                stringValue = '%' + inputStringValue + '%';
                sQuery =  ' Select ' + fieldApiName + ' from ' + objectApiName;
                sQuery += ' where ' + comboboxSelectOperator + ' ' + comboboxSelectField  +  ' LIKE ' +  ' : stringValue '; 
                
            }else if(comboboxSelectOperator == 'START'){
                stringValue = inputStringValue + '%';
                sQuery =  ' Select ' + fieldApiName + ' from ' + objectApiName;
                sQuery += ' where ' + comboboxSelectField + ' LIKE ' +  ' : stringValue ';   
                
            }else{
                if(comboboxSelectOperator != '' || comboboxSelectOperator != 'undefined'){
                    stringValue = inputStringValue;
                    sQuery =  ' Select ' + fieldApiName + ' from ' + objectApiName;
                    sQuery += ' where ' + comboboxSelectField + ' ' + comboboxSelectOperator + ' : stringValue ';
                }
                
            }
            
            
        } else if( integerValue != null ){
            
            if(comboboxSelectOperator != '' ){
                sQuery =  ' Select ' + fieldApiName + ' from ' + objectApiName;
                sQuery += ' where ' + comboboxSelectField + ' ' + comboboxSelectOperator + ' ' + integerValue;
            } 
            
        }else if(dateValue != null){
            
            if(comboboxSelectOperator != '' ){
                sQuery =  ' Select ' + fieldApiName + ' from ' + objectApiName;
                sQuery += ' where ' + comboboxSelectField + ' ' + comboboxSelectOperator + ' : dateValue ';
            }  
            
        }else if(booleanValue != null){
            
            if(comboboxSelectOperator != '' ){
                sQuery =  ' Select  ' + fieldApiName + ' from ' + objectApiName;
                sQuery += ' where ' + comboboxSelectField + ' ' + comboboxSelectOperator + ' : booleanValue ';
            }  
            
        }
        
        
        
        List<sObject> resultQuery= Database.query(sQuery);
        system.debug('resultQuery-->'+resultQuery);
        return resultQuery; 
        
    } 
    
    
    
    
    
    
}