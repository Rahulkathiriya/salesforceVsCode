public class SimpleServerSideController {

   @AuraEnabled 
    
    public static Contact getContact12(){
        return[select Id,FirstName,LastName from Contact Limit 1];
    }
    
}