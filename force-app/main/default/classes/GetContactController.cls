public class GetContactController {
   @AuraEnabled
    public static List<Contact> getCon(){
        return [select  Id,Name,Email,Phone from Contact Order by  Name ASC limit 10];
    }
    @AuraEnabled
    public static Boolean insertcon(String lastname, String phoneno, String  emailId){
        Contact con = new Contact();
        con.LastName = lastname;
        con.Phone = phoneno;
        con.Email = emailId;
        insert con;
        return true;
    }
    //gate recorId 
    @AuraEnabled
    public static Contact getConById(String Id){
       return[select  Id,Name,Email,Phone from Contact where Id =: Id]; 
    }
    //update record
    @AuraEnabled
    public static boolean editConMethod(String conName, String phoneNum,String emailId, String conId){
        Contact con = new Contact();
        con.LastName = conName;
        con.Phone =phoneNum;
        con.Email = emailId;
        con.Id =conId;
        update con;
        return true;
    }
    @AuraEnabled
    public static void deleteConData(String Id){
        Contact con = new Contact();
        con.Id = Id;
        delete con;
    }
}