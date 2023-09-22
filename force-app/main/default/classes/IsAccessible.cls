public class IsAccessible {
   /** public static void ExecuteFields(){
        List<String> permission = new List<String>{'phone','Marketing_priority__c' , 'Industry' , 'sales_priority__c ' ,'Type '};
        String fieldpermission;
        for(String field : permission ){
            system.debug('check permission' +  Schema.SObjectTypeFields.Account .Fields[field].isAccessible());
            //Schema.DescribeFieldResult meterNameLength = field.getDescribe().isAccessible(); 
    		//if (field.getDescribe().isAccessible())
          //{
            //List<Account> accList = [Select Name,Phone from Account Limit 100];
          //}
               }
       
    } **/
}



/** 

  @AuraEnabled
    public static List<Expense__c> getExpenses() {
        // Check to make sure all fields are accessible to this user
        String[] fieldsToCheck = new String[] {
            'Id', 'Name', 'Amount__c', 'Client__c', 'Date__c',
            'Reimbursed__c', 'CreatedDate'
        };
        Map<String,Schema.SObjectField> fieldDescribeTokens =
            Schema.SObjectType.Expense__c.fields.getMap();
        for(String field : fieldsToCheck) {
            if( ! fieldDescribeTokens.get(field).getDescribe().isAccessible()) {
                throw new System.NoAccessException();
            }
        }
        // OK, they're cool, let 'em through
        return [SELECT Id, Name, Amount__c, Client__c, Date__c,
                       Reimbursed__c, CreatedDate
                FROM Expense__c];
    }
**/