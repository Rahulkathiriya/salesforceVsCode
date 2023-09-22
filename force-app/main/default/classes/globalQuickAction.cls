public class globalQuickAction {
    public static QuickAction.QuickActionResult performQuickAction(){//QuickAction.QuickActionRequest quickActionRequest, Boolean allOrNothing){
        Contact c;
        QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
        req.quickActionName = 'CreateContact';
        //req.quickActionName = QuickAction.CreateContact;
        req.record = c;
        QuickAction.QuickActionResult res = QuickAction.performQuickAction(req);
        res.isCreated();			//Returns true if the action is created

		Boolean b = Boolean.valueOf('true');
		System.assertEquals(true, b);
        return null;
    }  
    
    
    /**
     public static QuickAction.QuickActionResult performQuickAction(QuickAction.QuickActionRequest quickActionRequest, Boolean allOrNothing){
        Contact c;
        QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
        req.quickActionName = Schema.Account.Name.QuickAction.CreateContact;
        req.record = c;
        QuickAction.QuickActionResult res = QuickAction.performQuickAction(req);

		Boolean b = Boolean.valueOf('true');
		System.assertEquals(true, b);
        return null;
    } **/
    
    
        /**
        public Id globalCreate(Contact c) { 
		
        QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
        req.quickActionName = QuickAction.CreateContact;
        req.record = c;
        QuickAction.QuickActionResult res = QuickAction.performQuickAction(req);
        return c.id;
            }
            **/
    
    
    
    	/**
	    if (c.getQuickActionName() == QuickAction.CreateContact) {
            c.WhereFrom__c = 'GlobaActionl';
        } else if (c.getQuickActionName() == Schema.Account.Name.QuickAction.CreateContact) {
            c.WhereFrom__c = 'AccountAction';
        } else if (c.getQuickActionName() == null) {
            c.WhereFrom__c = 'NoAction';
        } else {
            System.assert(false);
        }
		 **/
    
    
    
     /**  public static QuickAction.QuickActionResult performQuickAction(QuickAction.QuickActionRequest quickActionRequest, Boolean allOrNothing){
     
         // Called at global level, not entity level.
	 	 	List<QuickAction.DescribeQuickActionResult> result = 
            	QuickAction.DescribeQuickActions(new List<String> {
                 	'Global.CreateNewContact' });
        
			QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
            req.quickActionName = QuickAction.CreateContact;
            //req.quickActionName = Schema.Account.Name.QuickAction.AccountCreateContact; 
       
     		return null;
         } **/
    

    
    /** public static QuickAction.QuickActionResult performQuickAction(QuickAction.QuickActionRequest quickActionRequest, Boolean allOrNothing){
        
        QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
    	// Some quick action name
    	req.quickActionName = Schema.Account.QuickAction.AccountCreateContact; 
    
        // Define a record for the quick action to create
        Contact c = new Contact(); 
        c.lastname = 'last name';
        req.record = c; 
        
        // Provide the context ID (or parent ID). In this case, it is an Account record.
        req.contextid = '001xx000003DGcO'; 
        
        QuickAction.QuickActionResult res = QuickAction.performQuickAction(req);
            return null;
    	}  **/
        
         
    
        
        /**public static QuickAction.QuickActionResult performQuickAction(QuickAction.QuickActionRequest quickActionRequest, Boolean allOrNothing){
        QuickAction.QuickActionRequest req = new QuickAction.QuickActionRequest();
        req.quickActionName = Schema.Account.QuickAction.AccountCreateContac;
        Contact con = new Contact();
        req.setQuickActionName('Account.QuickCreateContact');
        req.setRecords(new SObject[] { con });  //you can only save one record here
    	PerformQuickActionResult[] pResult = 
        conn.performQuickActions(new PerformQuickActionRequest[] { req } );
    	for(PerformQuickActionResult pr : pResult) { 
        assert pr.getSuccess();
        assert pr.getCreated();
        assert pr.getErrors().length == 0;
        System.out.println('Id of the record created: ' + pr.getIds()[0]);
        System.out.println('Id of the feeditem for action performed: ' + 
            pr.getFeedItemIds()[0]);
    }
        QuickAction.QuickActionResult res = QuickAction.performQuickAction(req);
        } **/
    
    
    
  		/**
		public Map<String, Schema.SObjectType> objs {get; set;}
        public List<SelectOption> objList {get;set;}
        public String objectName {get;set;}   
        public String customButtonName {get;set;}
        
        public createCustomButtonLink() {
        objList = new List<SelectOption>();
        objs = Schema.getGlobalDescribe();
        List<Schema.Sobjecttype> temp = objs.values();
        for(Schema.SObjectType objec: objs.values()) {
            objList.add(new SelectOption(String.valueOf(objec),String.valueOf(objec)));
        }
        objectName = 'Account';
        }
                **/
            
       
        
           /** // * Initializing Map
                    Map<String, String> objectAPINameToLabelMap = new Map<String, String>();
                    
              // * Getting all objects metadata
                    Map<String, Schema.SObjectType> globalDescribeMap = Schema.getGlobalDescribe();
                    
              // * Processing each sObject one by one
                   for(String globalDescribeKey : globalDescribeMap.keySet()) {
            
            // * Getting the current sObject type
            Schema.SObjectType currentSObjectType = globalDescribeMap.get(globalDescribeKey);
        
            // * Getting the current sObject description result from sObject Type
            Schema.DescribeSObjectResult currentSObjectResult = currentSObjectType.getDescribe();
        
            // * Getting the API name and value of current sObject and adding it to the map
            objectAPINameToLabelMap.put(currentSObjectResult.getName(), currentSObjectResult.getLabel());
        }
        
            // * Processing each entry of the map one by one and displaying sObject API Name and Label
            for(String objectAPIName : objectAPINameToLabelMap.keySet()) {
                System.debug(objectAPIName + ' --> ' + objectAPINameToLabelMap.get(objectAPIName));
            }**/

 }