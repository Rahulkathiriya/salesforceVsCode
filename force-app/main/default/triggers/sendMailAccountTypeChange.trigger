trigger sendMailAccountTypeChange on Account (after update) {
    set<Id> accId = new set<Id>();
    for(Account acc: Trigger.new){
        if(acc.Type != trigger.oldMap.get(acc.Id).Type){
            accId.add(acc.Id);
        }
    }
    List<Contact> conList =[select Id,LastName,Email,AccountId,Account.Name from Contact where AccountId=:accId]; 
    List<Messaging.SingleEmailMessage> emailList = new List<Messaging.SingleEmailMessage>();
    if(conList.size() >0){
        for(Contact con:conList){
            if(con.Email != null){
                Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
                mail.setTargetobjectId(con.Id);
                mail.setSenderDisplayName('System Adminitrator');
                mail.setUseSignature(false);
                mail.setBccSender(false);
                mail.setSaveAsActivity(false);
                mail.setSubject(' Account Update Info');
                
                String body = 'Dear '+ con.LastName +' , </br>';
                body +=' Your account information has been update succesfully .<br/></br/> Account Name : '+ con.Account.Name;
                mail.setHtmlBody(body);
                mail.toAddresses = new String[]{con.Email};
                    emailList.add(mail);
            }
        }
    }
    if(emailList.size() > 0){
        Messaging.SendEmailResult[] results = Messaging.sendEmail(emailList);
        if(results[0].success){
            system.debug('The Email was send Successfully.');
        }else{
            system.debug('The email failed to send: '+ results[0].errors[0].message);
        }
    }
}