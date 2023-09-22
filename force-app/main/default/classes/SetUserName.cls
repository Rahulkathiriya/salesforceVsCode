public class SetUserName {
    
    /** @AuraEnabled
public static boolean shareRead(Id userOrGroupId,Id recordId){

List<Activities__Share> share = [SELECT Id,AccessLevel, UserOrGroup.Id ,ParentId from Activities__Share ];
Activities__Share activity;


// Set the ID of record being shared.
activity.ParentId = recordId; //a015g00000j1fcxAAA

// Set the ID of user  being granted access.
activity.UserOrGroupId	 = userOrGroupId;
//system.debug('get id' + UserOrGroupId );
// Set the access level.
activity.AccessLevel = 'edit';

// Set rowCause to 'manual' for manual sharing.
// This line can be omitted as 'manual' is the default value for sharing objects.
activity.RowCause = Schema.Activities__Share.RowCause.Manual;

share.add(activity);
// Insert the sharing record and capture the save result. 
// The false parameter allows for partial processing if multiple records passed 
// into the operation.
Database.SaveResult sr = Database.insert(activity,false);
return true;
} **/
    @AuraEnabled
    public static Boolean shareRead(Id userOrGroupId,Id recordId){
        //Id userOrGroupId ;//0055g00000F2CTf(IPLead user);
        //Id recordId;
        
        List<Activities__Share> share = new List<Activities__Share>();
        //List<Activities__Share> share = [SELECT Id,AccessLevel, UserOrGroup.Id ,ParentId from Activities__Share ];
        Activities__Share activity;
        for(Activities__Share acc : share)
        {
            
            // Set the ID of record being shared.
            activity.ParentId = acc.Id; //a015g00000j1fcxAAA
            
            // Set the ID of user  being granted access.
            activity.UserOrGroupId	 = acc.userOrGroupId;
            //system.debug('get id' + UserOrGroupId );
            // Set the access level.
            activity.AccessLevel = 'edit';
            
            // Set rowCause to 'manual' for manual sharing.
            // This line can be omitted as 'manual' is the default value for sharing objects.
            activity.RowCause = Schema.Activities__Share.RowCause.Manual;
            
            share.add(activity);
        }
        // Insert the sharing record and capture the save result. 
        // The false parameter allows for partial processing if multiple records passed 
        // into the operation.
        
        Database.SaveResult sr = Database.insert(activity,false);
        
        // Process the save results.
        if(sr.isSuccess()){
            // Indicates success
            return true;
        }
        else {
            // Get first save result error.
            Database.Error err = sr.getErrors()[0];
            
            // Check if the error is related to trival access level.
            // Access level must be more permissive than the object's default.
            // access level not allowed
            // These sharing records are not required and thus an insert exception is acceptable. 
            if(err.getStatusCode() == StatusCode.FIELD_FILTER_VALIDATION_EXCEPTION  &&  
               err.getMessage().contains('AccessLevel')){
                   // Indicates success.
                   return true;
               }
            else{
                // Indicates failure.
                return false;
            }
        } 
        
    } 
}