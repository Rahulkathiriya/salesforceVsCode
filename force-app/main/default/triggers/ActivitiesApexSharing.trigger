trigger ActivitiesApexSharing on Activities__c (after insert) {
   if(trigger.isInsert){
        
        List<Activities__Share> activity = new List<Activities__Share>();
        
        Activities__Share IEPlantShare;
       
        //activity = [select Id FROM Activities__c WHERE Id =:ApexPages.currentPage().getParameters().get('id')];
        
        for(Activities__c act : trigger.new){
            // Instantiate the sharing objects
            IEPlantShare = new Activities__Share();
            
            // Set the ID of record being shared.
            IEPlantShare.ParentId =  act.Id;
            
            
            // Set the ID of user  being granted access.
            IEPlantShare.UserOrGroupId	 = act.IEPlant__c;
            
            
            // Set the access level.
            IEPlantShare.AccessLevel = 'controlled by parent';
           
            
            // Set rowCause to 'manual' for manual sharing.
            // This line can be omitted as 'manual' is the default value for sharing objects.
            IEPlantShare.RowCause = Schema.Activities__Share.RowCause.IEPlant__c ;
            
            activity.add(IEPlantShare);
        }
        
        // Insert the sharing record and capture the save result. 
        // The false parameter allows for partial processing if multiple records passed 
        // into the operation.
        
        Database.SaveResult[] lsr = Database.insert(activity,false);
        
        //create counter
        Integer i=0;
        
        // Process the save results.
        for(Database.SaveResult sr : lsr){
            if(!sr.isSuccess()){
                // Get the first save result error
                Database.Error err = sr.getErrors()[0];
                
                
                // Check if the error is related to trivial access level.
                // access level not allowed
                // Access level must be more permissive than the object's default.
                // These sharing records are not required and thus an insert exception is acceptable. 
                if(!(err.getStatusCode() == StatusCode.FIELD_FILTER_VALIDATION_EXCEPTION  &&  
                     err.getMessage().contains('AccessLevel'))){
                         // Throw an error when the error is not related to trivial access level.
                         trigger.newMap.get(activity[i].ParentId).
                             addError(
                                 'Unable to grant sharing access due to following exception: '
                                 + err.getMessage());
                     }
            } 
                
            i++;
        } 
    } 
}