public class stringapex {
	/** public static void Assign()   //assign of user defined permissions
    {
        String selectedValue;
        String parameterValue = ApexPages.currentPage().getParameters().get('Permission_Set_ID'); //Permission_Set_ID reference from URL

       //update Object permission for Account field 
        ObjectPermissions acc = new ObjectPermissions();
        //List<ObjectPermissions> ps = new List<ObjectPermissions>();
        
         List<ObjectPermissions> ps = [select Id 
                                   	  FROM FieldPermissions 
                                   	  where parentid=:parameterValue 
                                   	  AND SobjectType='Account'  
                                   	  AND Field='Account.Customer_Priority__c'
                                   	  AND Field='Account.sales_priority__c']; 
       
        if(!ps.isempty()){
            acc.Id=ps[0].Id;
        }else{                
            acc.parentid          = parameterValue ;
            acc.SobjectType       ='Account'; 
            
        }
                                  
        if(selectedValue == 'readselected')          
        {
            
            acc.PermissionsRead   = true;
            acc.PermissionsEdit   = false;
            }else{
           
            acc.PermissionsRead   = true;
            acc.PermissionsEdit   = true;
        }  
        upsert acc;
        //return null;
    } **/
}