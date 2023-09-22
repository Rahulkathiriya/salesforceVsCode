public class TAskDay3 {
    @AuraEnabled
    public static List<Account> getAccData(){
        List<Account> accList = [select Id,Name,Industry,Phone,Website from Account limit 30]; //  system.debug('list account-->'+accList);
        return accList;  
    }
    @AuraEnabled
    public static void GetDraftValueUpdate(  List<Account> a1 ){
        update a1;  
    }
    
    @AuraEnabled
    public static void getIdDeleteRec(String deletId){
        
        Account acc = new Account();
        acc.Id = deletId;
        delete acc;
    }
    
    @AuraEnabled  
    public static List<Account> filterData(String fAcc){  
        string strQuery = 'select Id,Name,Industry,Phone,Website from Account where (Name like \'%' + fAcc + '%\')  OR  (Industry like \'%' + fAcc + '%\')  OR  (Phone like \'%' + fAcc + '%\')  OR (Website like \'%' + fAcc + '%\')  ' ; 
        return database.query(strQuery);
    }
    
    // filter icon code
    @AuraEnabled
    public static map<string,list<object>> getObjectFields (String objName)
    {
        map<string,list<object>> retVal = new map<string,list<object>>();
        Map<String, Schema.SObjectField> fieldMap = Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
        for (String fieldName: fieldMap.keySet())
        {
            string fieldType = String.ValueOf(fieldMap.get(fieldName).getDescribe().getType());
            if(fieldType != 'ID'  && fieldType != 'REFERENCE' )
            {
                String FieldAPI=fieldMap.get(fieldName).getDescribe().getName();
                if(FieldAPI != 'IsDeleted'  && FieldAPI != 'CreatedDate' && FieldAPI != 'LastModifiedDate' && FieldAPI != 'SystemModstamp' && FieldAPI != 'LastActivityDate' && FieldAPI != 'LastViewedDate' && FieldAPI != 'LastReferencedDate' && FieldAPI != 'Jigsaw' && FieldAPI != 'JigsawCompanyId' && FieldAPI != 'Ownership' ){
                    
                    List<String> listStrings = new List<String>();
                    listStrings.add(FieldAPI);
                    listStrings.add(fieldType); //Adding field type 
                    string FieldLabelName=fieldMap.get(fieldName).getDescribe().getLabel();
                    retVal.put(FieldLabelName,listStrings);   
                }
            }
            
        }
        return retVal;
    }  
    
    @AuraEnabled
    public static  map<string, List<object>> getPickListValuesIntoList(string ObjectName, string picName){
        //  system.debug('ObjectName-->'+ObjectName);
        //  system.debug('picName-->'+picName);
        
        List<String> pickListValuesList= new List<String>();
        
        Map<String, SObjectType> globalDescribe = Schema.getGlobalDescribe();
        
        DescribeSObjectResult describeSObjectResult = globalDescribe.get(ObjectName).getDescribe();
        
        Schema.DescribeFieldResult fieldResult = describeSObjectResult.fields.getMap().get(picName).getDescribe();
        
        map<string, List<object>> apiPicklistValue = new map<string, List<object>>();
        
        List<Schema.PicklistEntry> ple = fieldResult.getPicklistValues();
        
        for( Schema.PicklistEntry pickListVal : ple){
            pickListValuesList.add(pickListVal.getLabel());
        }  
        
        apiPicklistValue.put('Type',pickListValuesList);
        return apiPicklistValue;
    } 
    
    @AuraEnabled	
    public static List<sObject> filteredTable(String selectedField, String selectedOprater , String inputValue ,String selectedPicValue, string Alldate ){
        String Value ;
        string sQuery;
        string formatDate = Alldate;
        Date dt;
        if(formatDate != null){
            dt = date.valueOf(formatDate);
        }
        
        system.debug('dt-->'+dt);
        if(!string.isEmpty(inputValue)){
            if(selectedOprater == 'LIKE'){
                Value =  '%' + inputValue + '%'; 
            } else{
                Value =  inputValue ;  
            }
        }else if(!string.isEmpty(selectedPicValue)){
            Value = selectedPicValue;
        }
        
        if(!string.isEmpty(Value)){
            sQuery = 'SELECT Id,Name,Industry,Phone,Website from Account';
            sQuery+= ' where ' + selectedField + ' ' +  selectedOprater   + ' : Value '  ;
            
        }else if(dt != null){
            
            sQuery = 'SELECT Id,Name,Industry,Phone,Website from Account';
            sQuery+= ' where ' + selectedField + ' ' +  selectedOprater   + ' : dt' ;
        }    
        //   system.debug('sQuery-->'+sQuery);
        
        List<sObject> resultquery = Database.query(sQuery);
        system.debug('resultquery-->'+resultquery);
        
        return resultquery;
    }
    
    // list View Code
    @AuraEnabled
    public static List<ListView> GetListData(){
        List<ListView> getData = [SELECT Name, DeveloperName, SObjectType FROM ListView where SObjectType = 'Account'];
        return getData;
    } 
    
    @AuraEnabled
    public static String WhiteSpacetoUnderscore (string getvalue){
        string a;
        a = getvalue.replaceAll('\\s+', '_');
        system.debug('a--->'+a);
        return a;
    }
    
    @AuraEnabled
    public static void getDataListview( String getListName, String getListApiName ){
   /*    String a =  getListName;
       String b =  getListApiName; 
     List<string> s1 = new List<string>();
        
      ListView abc = new  ListView();
            abc.SobjectType = 'Account'; */
        
        
    }
    
}