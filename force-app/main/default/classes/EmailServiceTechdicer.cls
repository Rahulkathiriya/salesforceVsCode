global class EmailServiceTechdicer implements Messaging.InboundEmailHandler{
 
 global Messaging.InboundEmailResult handleInboundEmail(Messaging.inboundEmail email, Messaging.InboundEnvelope env){
  // Create an InboundEmailResult object for returning the result of the Apex Email Service
  Messaging.InboundEmailResult emailResult = new Messaging.InboundEmailResult();
  try{
       List<Contact> contList= [SELECT Id, Email FROM Contact WHERE Email = :email.fromAddress LIMIT 1];
        
       EmailMessage emailMessage = new EmailMessage();  
       emailMessage.Status = '0';
       emailMessage.FromAddress = email.FromAddress;
        
       if(email.toAddresses.size() > 0){
           emailMessage.ToAddress = String.join( email.toAddresses, ';' );
       }
        
       if(email.ccAddresses != null && email.ccAddresses.size() > 0){
           emailMessage.CcAddress = String.join( email.ccAddresses, ';' );
       }
       emailMessage.FromName = email.FromName; // from name  
       emailMessage.Subject = email.Subject; // email subject  
       emailMessage.TextBody = email.plainTextBody; // email body  
       emailMessage.RelatedToId = contList[0].Id;
       insert emailMessage;
 
       if (email.binaryAttachments != null && email.binaryAttachments.size() > 0) {
          for (integer i = 0 ; i < email.binaryAttachments.size() ; i++) {
            Attachment attachment = new Attachment();
            // attach to the newly created contact record
            attachment.ParentId = contList[0].Id;
            attachment.Name = email.binaryAttachments[i].filename;
            attachment.Body = email.binaryAttachments[i].body;
            insert attachment;
          }
       }    
        
  }
  catch (Exception e){
     System.debug('Error : ' + e);
  }
  emailResult.success = true;
  return emailResult;
 }
}