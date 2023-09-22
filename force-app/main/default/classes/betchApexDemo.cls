public class betchApexDemo  implements Database.Batchable<sObject>{
    
    public Database.QueryLocator start(Database.BatchableContext bx){
        return Database.getQueryLocator([select Id,Name,Phone,Website from Account]);
    }
    
    public void execute(Database.BatchableContext bxc,List<Account> scope){
        system.debug(' current  scope  is== '+scope.size());
               
        List<Account> updateAccLlist = new List<Account>();
        for(Account a : scope){
            if(a.Website == ''){
                system.debug('i am in account if'  );
				a.Website = 'www.MahardhiTechnology.com';      
            }else{
                system.debug('i am in account else');
            }
           updateAccLlist.add(a); 
        }
        update updateAccLlist;
    }
    
    public void finish(Database.BatchableContext bxc){
        system.debug(' i am  finish method ');
        List<String> mailToList = new List<String>();
        mailToList.add('vegaddhruvil2323@gmail.com');
        
        List<String> ccMailToList = new List<String>();
        ccMailToList.add('rahul.kathiriya.61@gmail.com');
        
   
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        email.setToAddresses(mailToList);
        email.setCcAddresses(ccMailToList);
        email.setSubject('Batch proccesing email');
        email.setPlainTextBody('your  records has been updated');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {email});
        system.debug('mail send');
    }
}