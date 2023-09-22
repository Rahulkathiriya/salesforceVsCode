public class printViewTask4 {
    
    @AuraEnabled
    public static List<Account> getAccData(){
        return [select  Id,Name from account Order by  Name ASC ];
    }
    @AuraEnabled
    public static boolean inputIdValue(string a1 ){
        Account acc = new Account();
        acc.Name = a1;
        insert acc;
        return true;
    }
    @AuraEnabled
    public static  Account getAccById(String Ids){
        return[select Id,Name from Account where Id =:Ids];
    }
    @AuraEnabled
    public static boolean getupdaterecord(String name,String justId){
        Account acc = new Account();
        acc.Name = name;
        acc.Id = justId;
        update acc;
        return true;
    }
    
    @AuraEnabled
    public static void deleteRecordById(String DeleteId){
        Account acc =new Account();
        acc.Id = DeleteId;
        delete acc;
    }
    @AuraEnabled
    public static integer countRecord(){
        List<AggregateResult> groupedResults = [SELECT Count(Name)name FROM Account];
        Integer accountCount = (Integer)groupedResults[0].get('name');
        System.debug('Account Count: ' + accountCount);
        return accountCount;
    }
    
    @AuraEnabled
    public static List<Account> optionRecord( integer recordValue){
	  List<Account> a1 = [select Name from Account  limit :recordValue ]	;	
	 system.debug('parameter-->'+recordValue);
        return a1;
    }
    
}