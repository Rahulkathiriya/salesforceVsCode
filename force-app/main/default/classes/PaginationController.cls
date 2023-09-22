public class PaginationController {
@AuraEnabled
    public static List<Contact> showContacts(){
        List<Contact> contactList = new List<Contact>();
        contactList = [Select Id, Name,  Email, AccountId From Contact LIMIT 100 ];
        return contactList;
    }

}