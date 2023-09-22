trigger sendEmailWithPdfFileAttached on Lead (after insert) {
    List<Messaging.SingleEmailMessage> emailList= new List<Messaging.SingleEmailMessage>();

    EmailTemplate emailTemplate = [Select Id,Subject,Description,HtmlValue,DeveloperName,Body from EmailTemplate where name='Sales: New Customer Email'];
    for(Lead lObj:Trigger.new){
        if(lObj.Email!=null){
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setTargetObjectId(lObj.Id);
            mail.setSenderDisplayName('System Administrator');
            mail.setUseSignature(false);
            mail.setBccSender(false);
            mail.setSaveAsActivity(false);
            mail.setTemplateID(emailTemplate.Id);
            mail.toAddresses = new String[]{lObj.Email};
                emailList.add(mail);
        }
    }
    if(emailList.size()>0){
        Messaging.SendEmailResult[] results = Messaging.sendEmail(emailList);
        if (results[0].success)
        {
            System.debug('The email was sent successfully.');
        } else {
            System.debug('The email failed to send: '+ results[0].errors[0].message);
        }
    }
}