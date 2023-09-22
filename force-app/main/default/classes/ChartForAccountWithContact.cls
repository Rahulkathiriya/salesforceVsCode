public class ChartForAccountWithContact {
    
    @AuraEnabled 
    public static List<Contact> getContactData(){
        List<Contact> con = [select Id,Name,Account.Name From Contact];
        system.debug('con value-->'+con);
        return con;
        
    }

}