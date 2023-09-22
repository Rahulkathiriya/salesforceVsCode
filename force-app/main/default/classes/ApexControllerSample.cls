public  class ApexControllerSample {
    @AuraEnabled
    public static List<String> getCountries(){
        List<String> countries = new List<String>();
        countries.add('USA');
        countries.add('India');
        return countries;
    }

    @AuraEnabled
    public static List<Contact> get10COntacts()
    {
        return [SELECT Id, NAME FROM Contact Limit 10] ;

    }


    @AuraEnabled
    public static List<Contact> getAllContact(){
        return  [Select FirstName,LastName,  Email, Title from Contact Limit 1];
    }

    @AuraEnabled
    public static List<Contact> deleteContact(String conid) {
    if(conid != null){
    Contact delContact=[Select Id from Contact where id=:conid];
    delete delContact;
    }
    //Below Query is for after delete the record again we have reload the page and show the remaning contact
    return [Select FirstName, LastName, Email From Contact ];
    }

    @AuraEnabled
    public static List <Contact> fetchContact() {
        return [SELECT Id, FirstName, LastName, Phone FROM Contact Limit 10];
    }
    
    @AuraEnabled
    public static void updateRecord(List <String> lstRecordId) {
        List<Contact> lstUpdate = new List<Contact>();
        for(Contact con : [SELECT Id, FirstName, LastName, Phone FROM Contact WHERE Id IN : lstRecordId]){
            con.Phone = '999999'; // Add fields which you want to update
            lstUpdate.add(con);
        }
        
        if(lstUpdate.size() > 0){
            update lstUpdate;
        }
    } 

    /** @AuraEnabled
    public static List<User> getUserList() {
        return [Select id,name,email FROM User ];
    } **/

   /**  @AuraEnabled
    public static List<Contact> getContact() {
        return [select Id, FirstName, LastName from Contact Limit 1];
    } **/


    

}