public class GetFieldsList {
   @AuraEnabled
   public static map<string,list<object>> getObjectFields (String objName)
   {
    
    //CustomException.IsLightning=true;
    map<string,list<object>> retVal = new map<string,list<object>>();
    Map<String, Schema.SObjectField> fieldMap =  Schema.getGlobalDescribe().get(objName).getDescribe().fields.getMap();
    
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
     return retVal;
  }
      @AuraEnabled
    public static Object Cue_GetRecordList(String objName, String fields, String conditionalField, String value) {
        system.debug('conditionalField' + conditionalField + '    ' +  value);
        
        String sQuery = 'SELECT Id, ' + fields + ' FROM ' + objName;
        if(!String.isEmpty(conditionalField)) sQuery += ' where ' + conditionalField + ' = : value';
        sQuery += ' ORDER BY Name asc';
        system.debug('sQuery' + sQuery);
        List<sObject> recordList = Database.query(sQuery);
        return recordList;
    }
    
    
    @AuraEnabled
    public static Map<String, String> Cue_DeleteRecord(String id, String objName) {
        Map<String, String> resultMap = new Map<String, String>();
        List < sObject > data = new List <sObject> ();

        try {
            String query = 'SELECT Id FROM ' + objName + ' WHERE Id =: id';
            data = Database.query(query);
            delete data;
                
            resultMap.put('status', 'success');
            resultMap.put('message', !String.isEmpty(objName) ? (objName + ' Deleted') : 'Invalid object');
	    }
        catch(Exception e) {
            system.debug(e);
            resultMap.put('status', 'error');
            resultMap.put('message', e.getMessage());
        }
        return resultMap;
    }
     @AuraEnabled
    public static List<sObject> Cue_GetRecordDetail(string recordId, string objName, string filedList) {
        List <sObject> data = new List <sObject>();
        try {
            String query = 'SELECT '+ filedList +' from ' + objName + ' WHERE Id = :recordId';
			data = Database.query(query);
        } catch(Exception e) {
            System.debug('Error ....' + e);
        }
        return data;
    } 
    
    @AuraEnabled
    public static List<sObject> Cue_GetUserByRole(string role) {
        system.debug('role  ' + role);
        List <sObject> data = new List <sObject>();
        List <sObject> userData = new List <sObject>();
        try {
            String query = 'SELECT Id, Name from Profile WHERE Name = :role';
			data = Database.query(query);
            if(data.size() > 0) {
                system.debug('data');
                String profileId = (String)data[0].get('Id');
                system.debug('profileId  ' + profileId);
                String userQuery = 'SELECT Id, Name, ProfileId, Email from User WHERE (ProfileId = :profileId) AND (IsActive = true)';
				userData = Database.query(userQuery);
            }
        } catch(Exception e) {
            System.debug('Error' + e);
        }
        return userData;
    }
    
     @AuraEnabled
    public static list<user> getuserList(string searchKey) {
        system.debug('jdbfjs');
     string searchKeyword = '%' + searchKey + '%';
	
       // create user list to store search result 
        list<user> userListRecord = new list<user>();
     
	  //  query user records
        for(user conObj : [Select Id,Name From User where name LIKE:searchKeyword]){
             userListRecord.add(conObj);
            system.debug(conObj);
       }
        if(userListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
          return userListRecord;
       }
    
     @AuraEnabled
    public static List<user> fetchAcc (String searchKey){
        String query= 'Select Id,Name From User';
        if ( searchKey != Null ) {
            String key = '%' + searchKey + '%';
             system.debug('key');
              query += ' WHERE Name LIKE :key';
         }
         system.debug(Database.query( query ));
       return Database.query( query );
        }  
    
     @AuraEnabled  
    public static List<User> Details() {  
        List<User> userlist = [Select Id,Name From User];         
          return userlist;  
    }  
    
   
}