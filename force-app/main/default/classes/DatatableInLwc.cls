public class DatatableInLwc {
    
    @AuraEnabled(cacheable=true)
    public static List<Account> getObjectData(){
        List<Account> accObj = [select Id,Name,Phone,Type,Industry from Account ];
        //  system.debug('accObj'+accObj);
        return accObj;
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
    
    /*    
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
*/    
    
    //custom wrapper class
    public class saveFilter {
        @AuraEnabled public String field { get; set; }
        @AuraEnabled public String operator { get; set; }
        @AuraEnabled public String value { get; set; }
        
        public saveFilter(String field, String operator, String value ){
            this.field = field;
            this.operator = operator;
            this.value = value;
        }
    }
    
    @AuraEnabled(cacheable=true)
    public static List<SObject> getFilterSavaData(String objectApiName, String filterMain ){
        
        List<SObject> filteredData = new List<SObject> ();
        
        try {
            List<saveFilter> LwcArray = (List<saveFilter>) JSON.deserialize(filterMain, List<saveFilter>.class);
            Schema.DescribeSObjectResult objectDescribe = Schema.getGlobalDescribe().get(objectApiName).getDescribe();
            Schema.DescribeFieldResult fieldDescribe;
            String DataType;
            
            string field;
            string operator;
            string value;
            
            String stringQuery;
            String WhereCon = '';
            
            for(saveFilter a : LwcArray ){
                field = a.field;
                operator = a.operator;
                value = a.value;
                
                fieldDescribe = objectDescribe.fields.getMap().get(field).getDescribe();                
                DataType = fieldDescribe.getType().name();
                System.debug('Field Data Type:-->> ' + DataType);  
                
                if(DataType == 'STRING' || DataType == 'PICKLIST' || DataType == 'URL'){
                    String StrValue;
                    if(!String.isEmpty(value)){
                        if(operator == 'LIKE'){
                            StrValue = '%' + value + '%';
                            if (!String.isEmpty(WhereCon)){
                                WhereCon += ' AND ';
                                WhereCon += '(' + field + ' ' + operator + ' ' + ('\'' + StrValue + '\'') + ')' ;
                            }else{
                                WhereCon += '(' + field + ' ' + operator + ' ' + ('\'' + StrValue + '\'') + ')' ;
                            }  
                        }
                        else if(operator == 'NOT'){
                            StrValue = '%' + value + '%';
                            if (!String.isEmpty(WhereCon)){
                                WhereCon += ' AND ';
                                WhereCon += '(' + operator + ' ' + field + ' LIKE ' + ('\'' + StrValue + '\'') + ')' ;
                            }else{
                                WhereCon += '(' + operator + ' ' + field + ' LIKE ' + ('\'' + StrValue + '\'') + ')' ;
                            }  
                        }
                        else if(operator == 'START'){
                            StrValue = value + '%';
                            if (!String.isEmpty(WhereCon)){
                                WhereCon += ' AND ';
                                WhereCon += '(' + field + ' LIKE ' + ('\'' + StrValue + '\'') + ')' ;
                            }else{
                                WhereCon += '(' + field + ' LIKE ' + ('\'' + StrValue + '\'') + ')' ;
                            }  
                        }
                        else {
                            StrValue = value;
                            if (!String.isEmpty(WhereCon)){
                                WhereCon += ' AND ' ;
                                WhereCon += '(' + field + ' ' + operator + ' ' + ('\'' + StrValue + '\'') + ')' ;   
                            }else{                                                         
                                WhereCon += '(' + field + ' ' + operator + ' ' + ('\'' + StrValue + '\'') + ')' ;    
                            }
                        }
                    } 
                    
                }
                
                if( DataType == 'INTEGER' || DataType == 'PERCENT' || DataType == 'CURRENCY' ){
                    Integer IntegerValue;
                    if(!String.isEmpty(value)){
                        IntegerValue = Integer.valueOf(value); 
                        if (!String.isEmpty(WhereCon)){
                            WhereCon += ' AND ';
                            WhereCon += '(' + field + ' ' + operator + ' ' + IntegerValue + ')' ;   // this query short form of upper query 
                        }else{                                                         				// if (!String.isEmpty(WhereCon)) WhereCon += ' OR ';
                            WhereCon += '(' + field + ' ' + operator + ' ' + IntegerValue + ')' ;   // WhereCon += field + ' ' + operator + ' ' + IntegerValue;
                        } 
                    }
                }
                
                if( DataType == 'DATE'){ 
                    // this date issues timeStamps in date variable 
                    Date DateValue;
                    if(!String.isEmpty(value)){
                        DateValue = Date.valueOf(value);
                        if (!String.isEmpty(WhereCon)){
                            WhereCon += ' AND ';
                            WhereCon += '(' + field + ' ' + operator + ' : DateValue ' + ')';
                        }else{
                            WhereCon += '(' + field + ' ' + operator + ' : DateValue ' + ')';
                        }
                    } 
                }
                
                if( DataType == 'BOOLEAN'){
                    Boolean BooleanValue;
                    if(!String.isEmpty(value)){
                        BooleanValue = Boolean.valueOf(value);   
                        if (!String.isEmpty(WhereCon)){
                            WhereCon += ' AND ';
                            WhereCon += '(' + field + ' ' + operator + ' ' + BooleanValue + ')' ;
                        }else {
                            WhereCon += '(' + field + ' ' + operator + ' ' + BooleanValue + ')' ;
                        }
                    }
                }
            }
            
            // system.debug('WhereCon--->>>'+WhereCon);
            stringQuery = ' select Id,Name From ' + objectApiName + ' WHERE ' + WhereCon  ;
            system.debug('stringQuery--->>'+stringQuery);
            filteredData = Database.query(stringQuery);
            //  system.debug('filteredData finall-->'+filteredData); 
            
            
        } catch (Exception e) {
            System.debug('Error: ' + e.getMessage());
        }
        
        return filteredData;
    }
    
}