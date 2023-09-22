public  class InputUser {
    @AuraEnabled(cacheable=true)
    public static list<contact> input(string searchKey) {
        string searchKeyword = '%' + searchKey + '%';
		
       // create contact list to store search result 
        list<contact> contactListRecord = new list<contact>();
     
	   // query contact records
        for(contact conObj : [Select id
                            From Contact
                            WHERE name LIKE : searchKeyword]){
           contactListRecord.add(conObj);
        }
        
         if(contactListRecord.size() == 0){
            throw new AuraHandledException('No Record Found..'); 
         }
         
        return contactListRecord;
    }
}