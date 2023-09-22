public class fieldlevelsecurity {
    public static void withsecurityenforced(){
        try {
            List<Account> accList = [Select Name,Phone from Account WITH SECURITY_ENFORCED ];
            //List<Account> accList = [Select Name,Phone,sales_priority__c from Account WITH SECURITY_ENFORCED ];
        } catch(System.QueryException ee) {
            System.debug('You dont have access to all Account fields ');
        }
    }
}