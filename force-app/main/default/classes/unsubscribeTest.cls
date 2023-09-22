@isTest
private class unsubscribeTest {
    // The following test methods provide adequate code coverage 
    // for the unsubscribe email class.
    // There are two methods, one that does the testing
    // with a valid "unsubcribe" in the subject line
    // and one the does not contain "unsubscribe" in the
    // subject line.        
    static testMethod void testUnsubscribe() {
    
       // Create a new email and envelope object.
       Messaging.InboundEmail email = new Messaging.InboundEmail() ;
       Messaging.InboundEnvelope env    = new Messaging.InboundEnvelope();
    
       // Create a new test lead and insert it in the test method.
       Lead l = new lead(firstName='abc', 
                lastName='dcg',
                Company='Salesforce', 
                Email='dhruvil@mahardhi.com', 
                HasOptedOutOfEmail=false);
       insert l;
    
       // Create a new test contact and insert it in the test method.
       Contact c = new Contact(firstName='king', 
                    lastName='kong', 
                    Email='dhruvil@mahardhi.com', 
                    HasOptedOutOfEmail=false);
       insert c;
       
       // Test with the subject that matches the unsubscribe statement.
       email.subject = 'test unsubscribe test';
       env.fromAddress = 'dhruvil@mahardhi.com';
       
       // Call the class and test it with the data in the testMethod.
       unsubscribe unsubscribeObj = new unsubscribe();
       unsubscribeObj.handleInboundEmail(email, env );
                            
    }
}