public class GetChild {

    @AuraEnabled
    public static List<Account> getConData(){
		List<Account> accList = [select Id,Name,(select Name,FirstName,LastName from Contacts) from Account LIMIT 3];
        
        if(!accList.isEmpty()){
			return accList;
        }
        return null;
    }
}