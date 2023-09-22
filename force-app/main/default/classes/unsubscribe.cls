Global class unsubscribe implements Messaging.inboundEmailHandler{

    Global Messaging.InboundEmailResult handleInboundEmail(Messaging.InboundEmail email, 
                         Messaging.InboundEnvelope env ) {
    
        Messaging.InboundEmailResult result = new Messaging.InboundEmailResult();
                             
        List<Contact> lc = new List <contact>();
        List<Lead> ll = new List <lead>();
                             
        String mySubject = email.subject.toLowerCase();
                             system.debug('mySubject->'+mySubject);
        String s = 'unsubscribe';
        Boolean unsubMe;
        unsubMe = mySubject.contains(s);
        if (unsubMe == true) {
            
            try {
            for (Contact c : [SELECT Id, Name, Email, HasOptedOutOfEmail
                          FROM Contact
                          WHERE Email = :env.fromAddress
                          AND hasOptedOutOfEmail = false
                          LIMIT 100]) {  
                c.hasOptedOutOfEmail = true;
                lc.add(c);
            }
            update lc;
        }
        catch (System.QueryException e) {
            System.debug('Contact Query Issue: ' + e);
        }   
        
        try {
            for (Lead l : [SELECT Id, Name, Email, HasOptedOutOfEmail
                     FROM Lead
                     WHERE Email = :env.fromAddress
                     AND isConverted = false
                     AND hasOptedOutOfEmail = false
                     LIMIT 100]) {     
                l.hasOptedOutOfEmail = true;
                ll.add(l);
                   
                System.debug('Lead Object: ' + l);   
            } 
            update ll;
        }
        
        catch (System.QueryException e) {
            System.debug('Lead Query Issue: ' + e);
        }   
        
        System.debug('Found the unsubscribe word in the subject line.');
         } 
         else {
            System.debug('No Unsuscribe word found in the subject line.' );
         } 
        result.success = true;
        return result;
    }   
}