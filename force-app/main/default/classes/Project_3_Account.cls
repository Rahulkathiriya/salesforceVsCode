public class Project_3_Account {
    public Account acc {set;get;}
    public Contact con {set;get;}
    public Project_3_Account(Apexpages.StandardController controller){
        
        /*  Sobject obj = controller.getRecord();
system.debug(obj.getSObjectType()); */
        
        List<String> fields = new List<String>{'Name','Industry','Rating','Ownership'};
            controller.addFields(fields);
        acc = (Account)controller.getRecord();
        
        con = [select Id,LastName, FirstName, Phone, OtherPhone, MobilePhone,  Email from Contact where grensi__Primary__c = true AND AccountId =: acc.Id];   
    }
}