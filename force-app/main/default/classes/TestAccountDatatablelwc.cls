public class TestAccountDatatablelwc {
    
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContact(){
        List<Contact> conList= [select Id,Name,Email,MobilePhone,IndividualId from Contact limit 15];
        if(!conList.isEmpty()){
            system.debug('conList :' +conList);
            return conList;
        }
        return Null;
    }
    
    @auraenabled
    public static String updateContactdetails(object conData){            //lwc pass update Data to apex class but not know which object data atle paramiter is object
        system.debug('conData'+ conData);
     
        List<Contact> contactList = (List<Contact>) json.deserialize(
            json.serialize(conData), List<Contact>.class);
        system.debug('contactList :' +contactList);
        
        if(!contactList.isEmpty()){
            update contactList;
            return 'Success';
        }
        return 'failed';
    }
    
  /*  @AuraEnabled(cacheable=true)
    public static List<Account> getAccount(){
        List<Account>accList =[select Id,Name ,Website,Phone from Account Limit 10];
        if(!accList.isEmpty()){
            system.debug('acclist :' +accList);
            return accList;
        }
        return Null;
    }
    
    
    @AuraEnabled
    public static string updateAccountDetails(object accountData){
        system.debug('accountData :' +accountData);  
        return 'done';
    } 
    */
        }