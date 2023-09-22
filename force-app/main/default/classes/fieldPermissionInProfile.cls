public class fieldPermissionInProfile {
    public static void  permission(){
        
       
         List<FieldPermissions> fpList = [SELECT Id, Field, SObjectType, PermissionsRead, PermissionsEdit 
                                          FROM fieldPermissions 
                                          WHERE SObjectType = 'Account' 
            							  AND field='Account.Phone'
                                          AND PermissionsRead = true 
                                          AND PermissionsEdit = true 
                                          AND parentId in 
                                          ( SELECT id 
                                          FROM permissionSet 
            							WHERE PermissionSet.Profile.Name = 'System Administrator') ];
        
        system.debug('....' + fpList);
        	
            if(!fpList.isEmpty()){
            Boolean hasReadPermission = fpList[0].PermissionsRead;
            Boolean hasEditPermission = fpList[0].PermissionsEdit;
            system.debug('..');
            }
            else {
               system.debug('fpList is empty');
            } 
        //FieldPermissions op = new FieldPermissions();
       
        
         //FOR A SPECIFIC PROFILE
      //string selectedvalue;
		/** List<FieldPermissions> fpList = [SELECT Id, SobjectType, Field, PermissionsRead, PermissionsEdit, Parent.ProfileId
										     FROM FieldPermissions
                                             WHERE SobjectType = 'Account' 
                                             and Field='Account.Customer_Priority__c'
                                             and Field='Account.sales_priority__c' 
                                             and Parent.ProfileId IN 
                                            (SELECT Id FROM PermissionSet WHERE PermissionSet.Profile.Name = 'System Administrator')]; **/
        
        
        
        
      /**   SELECT Parent.Profile.Name, Parent.Label, Parent.IsOwnedByProfile, SobjectType, Field, PermissionsEdit, PermissionsRead 
        FROM FieldPermissions
        WHERE SobjectType = 'Contact' AND Field = 'Contact.AccountId' AND PermissionsEdit = true  **/

   		/** List<FieldPermissions> fpList = [SELECT Id, Field, SObjectType,PermissionsRead, PermissionsEdit,   Parent.ProfileId,Parent.Profile.Name
            							  FROM fieldPermissions 
            							  WHERE SObjectType = 'Account'  
                                         // AND Field='Account.Name'
            							  AND Field='Account.Customer_Priority__c'
            							  AND Field='Account.sales_priority__c'
										  AND PermissionsEdit = true
            							  AND parentId in ( SELECT id 
                              			  FROM permissionSet 
                  			  			  WHERE PermissionSet.Profile.Name = 'System Administrator')];**/
        
        
        /**List<FieldPermissions> fpList  = [SELECT Id,Parent.Profile.Name, Parent.Label, Parent.IsOwnedByProfile, SobjectType, Field, PermissionsEdit, PermissionsRead 
										  FROM FieldPermissions
										  WHERE SobjectType = 'Account'
                                          AND Field='Account.Customer_Priority__c'
                                          AND Field='Account.sales_priority__c'
                                          AND PermissionsEdit = true ];**/
        
        //List<Account> acc = [select Id, Phone from Account];
			
            
            
        
        
       //FOR CURRENT USER
       
       /** List<FieldPermissions> fpList = [SELECT SobjectType, Field, PermissionsRead, PermissionsEdit, Parent.ProfileId 
        									FROM FieldPermissions 
       										WHERE SobjectType = 'Account' 
        									and Field='Account.Customer_Priority__c'
         									and Field='Account.sales_priority__c' 
         									AND Parent.Profileid=:Userinfo.getProfileId()];
        
        if(!fpList.isEmpty()){
            Boolean hasReadPermission = fpList[0].PermissionsRead;
            Boolean hasEditPermission = fpList[0].PermissionsEdit;
         }  **/
        
        
        
        
        /**
        String selectedValue;
        String parameterValue = ApexPages.currentPage().getParameters().get('Permission_Set_ID'); //Permission_Set_ID reference from URL

       //update Object permission for Account Field 
        ObjectPermissions op = new ObjectPermissions();
        //List<ObjectPermissions> ps = new List<ObjectPermissions>();
        list<ObjectPermissions> ps=[select id FROM FieldPermissions
                                   where parentid=:parameterValue 
                                   AND SobjectType='Account'  
                                   AND Field='Account.Customer_Priority__c'
                                   AND Field='Account.sales_priority__c' ];
       if(!ps.isempty()){
            op.id=ps[0].id;
        }else{                
            op.parentid          = parameterValue ;
            op.Sob
jectType       ='Account'; 
            
        }
        if(selectedValue == 'readselected')          
        {
            
            op.PermissionsRead   = true;
            op.PermissionsEdit   = false;
            }else{
           
            op.PermissionsRead   = true;
            op.PermissionsEdit   = true;
        }  
        upsert op; **/
          }
}


/**
 * 
 * Schema.SObjectType currentObjectType = AppointmentTopicTimeSlotFeed.getSObjectType();
Schema.DescribeSObjectResult currentSObjectResult = currentObjectType.getDescribe();
System.debug('API Name = ' + currentSObjectResult.getName());
System.debug('Is Custom Object = ' + currentSObjectResult.isCustom());
System.debug('Is Accessible = ' + currentSObjectResult.isAccessible());
System.debug('Is Creatable = ' + currentSObjectResult.isCreateable());
System.debug('Is Updateable = ' + currentSObjectResult.isUpdateable());
System.debug('Is Deletable = ' + currentSObjectResult.isDeletable()); 
**/