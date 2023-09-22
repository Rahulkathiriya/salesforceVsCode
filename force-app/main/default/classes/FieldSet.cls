public class FieldSet {
    
    static String restGet(String endPoint, String method, String sid) {
    Http h = new Http();
    HttpRequest hr = new HttpRequest();
    hr.setHeader('Authorization', 'Bearer ' + sid);
    hr.setTimeout(60000);
    hr.setEndpoint(endPoint);
    hr.setMethod(method);
    HttpResponse r = h.send(hr);
    return r.getBody();
		}
		static String toolingAPISOQL( String query) {
    	String baseURL = URL.getSalesforceBaseUrl().toExternalForm();
    	return restGet( baseURL +
		'/services/data/v41.0/tooling/query?q='+ (query.replace(' ', '+'))
	,
	'GET', UserInfo.getSessionId() );
	} 

	static String getLayoutNameForCurrentUserProfile( Id recordId ) {
    	String body = toolingAPISOQL('select Layout.Name from ProfileLayout where ProfileId = \'' + UserInfo.getProfileId() + '\' AND RecordTypeId = \'' + [ select RecordTypeId  from Account where id = :recordId].RecordTypeId + '\'');
    	System.debug(LoggingLevel.ERROR, '@@@ v: ' + body );
    	String name = body.substringBetween('"Name":"', '"');
        System.debug(LoggingLevel.ERROR, '@@@ v: ' + name );
    	return name;
	}
//getLayoutNameForCurrentUserProfile('2F00e5j000002FGRz');
    
    @AuraEnabled
    public static List<String> getFieldSet(String fieldSetName, String sObjectName) {
        List<String> fsmList = new List<String>();
        Schema.FieldSet fieldSet;
        
        Schema.SObjectType myObjectType = Schema.getGlobalDescribe().get(sObjectName);
        Schema.DescribeSObjectResult describe = myObjectType.getDescribe();
        
        //Contains all fieldSets in that object
        Map<String, Schema.FieldSet> FsMap = describe.fieldSets.getMap();
        
        if(FsMap.containsKey(fieldSetName)) {

            fieldSet = describe.fieldSets.getMap().get(fieldSetName);
            
            for(Schema.FieldSetMember fsm : fieldSet.getFields()) {
                fsmList.add(String.valueOf(fsm.getSObjectField()));
            }
        }
        
        if(fsmList != null && fsmList.size() > 0)
            return fsmList;
        else
            return null;
    }
    
    @auraEnabled
    public static List<sObject> getRelatedRecords(String childObjectName, String referenceFieldName, String referenceFieldValue) {
        List<sObject> objList = new List<sObject>();
        
        try {
            
            String query = 'Select Id, Name from ' +childObjectName+ ' where ' +referenceFieldName+ ' =: referenceFieldValue';
            objList = database.query(query);
            return objList;
        }
        catch(exception e) {
            system.debug('e'+e);
            return null;
        }
    }
}