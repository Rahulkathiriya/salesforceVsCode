public class CheckPermission {
    
    @AuraEnabled
	public static void permission(){
        if (Schema.sObjectType.Contact.isDeletable() || 
          	Schema.sObjectType.Contact.isUpdateable() ||
          	Schema.sObjectType.Contact.isCreateable() ||
          	Schema.sObjectType.Contact.isAccessible() ) {
   		  	system.debug('All');
        }
 	 }
    
  /*@AuraEnabled
	public static List<Object> searchRecords(String searchKey, String custObj) 
	{
        String name = '%' + searchKey + '%';
    if(!Schema.getGlobalDescribe().get().getSObjectType().getDescribe().isAccessible()){
        return null;
    }else{
        
    }
        } */
    
    public static void profilePermission(){
       String getUserId = '2F0055g00000F2CTf';
       User user_temp = [SELECT ProfileId FROM User where Id = :UserInfo.getUserId()]; //0055g00000F2CTf
       //  User user_temp = [SELECT ProfileId FROM User where Id = :0055g00000F2CTf]; 
         system.debug('ProfileId' + user_temp);
       Profile temp_profile = [SELECT PermissionsApiEnabled FROM Profile Where Id = :user_temp.ProfileId]; //00e5g0000014gNU
        
       // List<profile> pcheck  = [SELECT Id, SObjectType, PermissionsRead, PermissionsCreate FROM ObjectPermissions Where Id = :user_temp.ProfileId];
       
       /* User usercheck = [SELECT Id, SObjectType, PermissionsRead, PermissionsCreate
								FROM ObjectPermissions
								WHERE parentid in (select id from PermissionSet where
								PermissionSet.Profile.Name = 'Sales User Lead')];*/
        
      /* User usercheck = [SELECT Id, SObjectType, PermissionsRead, Parent.label, Parent.IsOwnedByProfile
						     FROM ObjectPermissions
						     WHERE (ParentId
						     IN (SELECT PermissionSetId
						     FROM PermissionSetAssignment
						     WHERE Assignee.Name = 'IPLead user'))
						     AND (PermissionsRead = true)
						     AND (SobjectType = 'Account')];	*/		
						  
								
        Boolean api_permission= temp_profile.PermissionsApiEnabled;
        System.debug('api_permission '+ api_permission); 
        

    }
       // The permissions required by the application.
    private static List<String> getPermissionList() {
        return new List<String>{
            'PermissionsApiEnabled',
            'PermissionsModifyAllData'
             
         };
       }

    
     public static Map<String, Boolean> permissionCache;
     private static User p_userWithPermissions { get; set; }
      
    public static User getUserWithPermissions() {

        if (p_userWithPermissions == null) {

            List<String> permissionList = CheckPermission.getPermissionList();

            List<String> userFieldsList = new List<String>{ 'Id', 'Name' };
            for (String permission : permissionList) {
                userFieldsList.add('Profile.' + permission);
            }

            List<String> permissionSetAssignmentFieldsList = new List<String>();
            for (String permission : permissionList) {
                permissionSetAssignmentFieldsList.add('PermissionSet.' + permission);
            }

            p_userWithPermissions = Database.Query(
                String.join(
                    new List<String> {
                        'SELECT',
                        String.join(userFieldsList, ', '),
                        ',',
                        '(SELECT Id,',
                        String.join(permissionSetAssignmentFieldsList, ', '),
                        'FROM PermissionSetAssignments WHERE',
                        String.join(permissionSetAssignmentFieldsList, ' = TRUE OR '),
                        ' = TRUE)',
                        'FROM User WHERE Id = \'' + UserInfo.getUserId() + '\' LIMIT 1'
                    },
                    ' '
                )
            );

        }
			return p_userWithPermissions;

    }

    
    public static Boolean userHasPermission() {
        String permissionName = 'PermissionsApiEnabled';
        if (permissionCache == null)
            
            permissionCache = new Map<String, Boolean>();
        else {
            //  for permission.
            if (permissionCache.containsKey(permissionName) == true) {
                return permissionCache.get(permissionName);
            }
        }

        // Get the user with permissions ( if possible)
        User u = getUserWithPermissions();

        //user has given Permission   
        Boolean hasPermission = false;

        if (u != null) {    
            //  check the Profile          
            SObject profile = u.getSObject('Profile');
            if (profile != null && Boolean.valueOf(profile.get(permissionName)) == true) {
                hasPermission = true;
            }
            //  check Permission Set
            else {
                List<SObject> psaList = u.getSObjects('PermissionSetAssignments');
                System.Debug('psaList: ' + psaList);
                if (psaList != null && psaList.isEmpty() == false) {
                    for (SObject psa : psaList) {
                        SObject ps = psa.getSObject('PermissionSet');
                        if (ps.get(permissionName) != null && Boolean.valueOf(ps.get(permissionName)) == true) {
                            hasPermission = true;
                            break;
                        }
                    }
                }
            }
        }

        // Cache the permission and return the result.
        permissionCache.put(permissionName, hasPermission);
        return hasPermission;
   
    }
    
    
    //SELECT ProfileId FROM User WHERE Id = '{SystemUserID}' //2F00e5f000000n3nj
    //Account.sObjectType.getDescribe().isCreateable();
    //Account.sObjectType.getDescribe().isDeletable();
	//Schema.sObjectType.Account.isDeletable()
	//WITH SECURITY_ENFORCED
	
    
    @AuraEnabled
    public static List<Contact> getContacts(Integer queryLimit, Integer queryOffset) {
        List<Contact> contacts;
        try {
            contacts = [SELECT Name, Phone FROM Contact WITH SECURITY_ENFORCED LIMIT :queryLimit OFFSET :queryOffset];
        } catch(System.QueryException qe) {
            System.debug(qe.getMessage());
        }
        return contacts;
    }
    
     @AuraEnabled
    public static List<Contact> getContact(Integer queryLimit, Integer queryOffset) {
        List<Contact> contacts;
        if(
            Contact.SObjectType.getDescribe().isAccessible() &&
            Schema.SObjectType.Contact.fields.Name.isAccessible() &&
            Schema.SObjectType.Contact.fields.Phone.isAccessible()
        ) {
            contacts = [SELECT Name, Phone FROM Contact LIMIT :queryLimit OFFSET :queryOffset];
        }
        return contacts;
    }
    
    /*@AuraEnabled
	public static List<Object> searchRecords(String searchKey, String custObj) 
	{
        String name = '%' + searchKey + '%';
    if(!Schema.getGlobalDescribe().get().getSObjectType().getDescribe().isAccessible()){
        return null;
    }else{
        
    }
        } */
    
    public static Map<String, Schema.SObjectType> allObjects { get; set; }

	/* @AuraEnabled
	public static void searchRecords(){
        if (Schema.sObjectType.Contact.isDeletable()) {
         // (Schema.sObjectType.Contact.isUpdateable())  
         // (Schema.sObjectType.Contact.isCreateable()) && ||
          //(Schema.sObjectType.Contact.isAccessible()) {
   		  system.debug('test');
        }else if (Schema.sObjectType.Contact.isUpdateable()){
            system.debug('updatable');
        } else if(Schema.sObjectType.Contact.isCreateable()){
            system.debug('creatable');
        }else(Schema.sObjectType.Contact.isAccessible()){
            system.debug('Accessible');
        }
 	 }  
*/
    
}