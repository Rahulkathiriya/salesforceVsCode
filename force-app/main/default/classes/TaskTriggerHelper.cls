public class TaskTriggerHelper {
    
    // Write a trigger, when a new Account is created then create a contact related to that account.
    // Hint: Contact would be inserted after the account has been inserted.
    
    public static void afterInsertCon(List<Account> acList){
        List<Contact> conList = new List<Contact>();
        for(Account a : acList){
            Contact c = new Contact();
            c.LastName = a.Name + ' contact';
            c.AccountId = a.Id;
            conList.add(c);
        }
        insert conList;
    }
    
    //Write a trigger, if the owner of an account is changed then the owner for the related contacts should also be updated.
    // (this can happen if a user leaves a company, then it is required to update the owner field for all the accounts and contacts he/she owns)
    
    public static void afterUpdateCon(Map<Id,Account> acOldmap, List<Account> acList, Map<Id,Account> acNewMap){   
        List<Id> IdList = new List<Id>();
        for(Account a : acList){
            if(a.OwnerId != acOldmap.get(a.Id).OwnerId){
                IdList.add(a.Id); 
            }
        }
        if(IdList.size() != 0){
            List<Contact> conList = [select Id,OwnerId,AccountId From Contact where AccountId IN : IdList ];
            for(Contact con : conList){
                con.OwnerId = acNewMap.get(con.AccountId).OwnerId;
            }
            update conList; 
        } 
    }
    
    // Create a new Opportunity whenever an account is created/updated for Industry – Agriculture.
    // Opportunity should be set as below:
    // Stage = ‘Prospecting’, Amount = $0, CloseDate = ’90 days from today’.
    
    public static void afterInsertOpp(List<Account> acList,Map<Id,Account> acOldmap, String TriggerType){
        
        if(TriggerType == 'insert'){
            List<Opportunity> newOppList = new List<Opportunity>();
            for(Account a : acList){
                if(a.Industry == 'Agriculture'){
                    newOppList.add( new Opportunity ( Name = a.Name + ' Oppotunity', AccountId = a.Id, StageName = 'Prospecting', Amount = 0, CloseDate = system.today() + 90 ));    
                } 
            }
            if(newOppList.isEmpty() == false){
                insert newOppList;
            }   
        }
        
        if(TriggerType == 'update'){
            List<Opportunity> OppList = new List<Opportunity>();
            for(Account ac : acList){
                if(ac.Industry == 'Agriculture' && ac.Industry != acOldmap.get(ac.Id).Industry ){
                    OppList.add( new Opportunity ( AccountId = ac.Id, Name = ac.Name + ' Opportunity', StageName = 'Prospecting', Amount = 0, CloseDate = system.today() + 91 ) );
                }
            }
            if(OppList.isEmpty() == false){
                insert OppList;
            }            
        }
        
    }
    
    // Given: There is any associated Contact to an Account,
    // When: User tries to delete the Account,
    // Then: User should get the error that Account with associated Contact can not be deleted.
    
    public static void beforeDeleteAcc(Map<Id,Account>acOldMap, List<Account> acOldList){
        Map<Id,Account> mapAccounts = new Map<Id,Account> ([select Id, (select Id from Contacts) from Account where Id IN : acOldMap.keySet()]);
        for(Account a : acOldList){
            if(!mapAccounts.get(a.Id).Contacts.isEmpty()){
                a.addError('Account with associated contacts can not be delete');
            }
        }
    }
    
    // If an opportunity is closed then, no one should be able to delete it except user having System Administrator profile.
    // Once an opportunity is marked as closed won, send an email to the following users:
    // A. Opportunity Owner
    // B. Account Owner
    
    public static void beforeDeleteAfterupdate(List<Opportunity> oppOld,Map<Id,Opportunity> oppNewMap, String TriggerType){
        if(TriggerType == 'Delete'){
            Profile adminProfile = [select Id,Name from Profile where Name = 'System Administrator' limit 1];
            for(Opportunity opp : oppOld){
                if(system.UserInfo.getProfileId() != adminProfile.Id && (opp.StageName == 'Closed Won' || opp.StageName == 'Closed Lost') ){
                    opp.addError('You do not have necessary permissions to delete Closed opportunities.'); 
                }
            } 
        }
        
        if(TriggerType == 'update'){
            List<Opportunity> oppList = [select Id, Name, StageName, Owner.Email, OwnerId, Account.Id, Account.OwnerId, Account.Owner.Email from Opportunity
                                         where Id IN : oppNewMap.keyset() 
                                         AND StageName = 'Closed Won' ];
            if(!oppList.isEmpty()){
                List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
                
                for(Opportunity opp : oppList){
                    Messaging.SingleEmailMessage emailMessage = new Messaging.SingleEmailMessage();
                    if(opp.OwnerId == opp.Account.OwnerId){
                        emailMessage.setToAddresses(new List<String> {opp.Owner.Email});
                    }
                    else{	
                        emailMessage.setToAddresses(new List<String> {opp.Owner.Email, opp.Account.Owner.Email}); 
                    }
                    emailMessage.setSubject('Opportunity - close won');
                    emailMessage.setPlainTextBody('below  opportunity with opportunity id and name is now close won. \n'+ 
                                                  'Opportunity Id: '+ opp.Id  + '\n' +
                                                  'Name: '+ opp.Name);
                    mails.add(emailMessage);
                }
                Messaging.sendEmail(mails);
            } 
        }
        
    }
    
    // Count the total number of contacts associated to an Account whenever a Contact is, 
    
    // Inserted, Updated or Deleted related to the Account.
    // Field Total_Contacts_Count__c should get updated with the latest count.
    // Pre-requisite: Create a Number field with API name “Total_Contacts_Count__c” on Account.
    
    public static void afterInsertUpdateDelete(List<Contact> conNewList, Map<Id,Contact> conOldMap, List<Contact> conOldList, String triggerType ){
        
        /////////////////////////// ************  after Insert  ************///////////////////////////
        
        if(triggerType == 'afterInsert'){
            Map<Id,Integer> accMapCountContact = new Map<Id,Integer>();
            for(Contact con : conNewList ) {
                if(!accMapCountContact.containsKey(con.AccountId)) {
                    accMapCountContact.put(con.AccountId,1); 
                }
                else {
                    accMapCountContact.put(con.AccountId,accMapCountContact.get(con.AccountId) + 1 );
                } 
            }
            
            List<Account> accUpdate = [select Id, grensi__Total_Contact_Count__c from Account where Id IN :accMapCountContact.keySet()];
            
            for(Account acc : accUpdate) {
                // acc.grensi__Total_Contact_Count__c = acc.grensi__Total_Contact_Count__c + accMapCountContact.get(acc.Id);
            }
            update accUpdate;
        }
        
        /////////////////////////// ************  after Update  ************///////////////////////////
        
        if(triggerType == 'afterUpdate'){
            Map<Id,Integer> accConCount = new Map<Id,Integer>();
            for(Contact con : conNewList){
                if(con.AccountId != conOldMap.get(con.Id).AccountId){
                    if(conOldMap.get(con.Id).AccountId == null) {
                        if(!accConCount.containsKey(con.AccountId)) {
                            accConCount.put(con.AccountId,1);   
                        }
                        else{
                            accConCount.put(con.AccountId,accConCount.get(con.AccountId) + 1 );
                        }
                    }
                    
                }
                
                // Check when previously there was some value in the Account field but during updation the account was removed
                // and new value is null
                
                else if (conOldMap.get(con.Id).AccountId != null && con.AccountId == null) {
                    if(!accConCount.containsKey(conOldMap.get(con.Id).AccountId) ) {
                        accConCount.put(conOldMap.get(con.Id).AccountId, -1);
                    }
                    else {
                        accConCount.put(conOldMap.get(con.Id).AccountId, accConCount.get(conOldMap.get(con.Id).AccountId) - 1 ); 
                    }
                }
                
                // Check when account associated to contact before and after updation was different.
                
                else {
                    if(!accConCount.containsKey(con.AccountId)) {
                        accConCount.put(con.AccountId, 1);  
                    }
                    else {
                        accConCount.put(con.AccountId, accConCount.get(con.AccountId) + 1 );
                    }
                    Id oldId = conOldMap.get(con.Id).AccountId;
                    if(!accConCount.containsKey(oldId)) {
                        accConCount.put(oldId, -1);
                    }
                    else {
                        accConCount.put(oldId, accConCount.get(oldId) - 1 );
                    } 
                }
            }
            
            List<Account> accountsToBeUpdated = [select Id, grensi__Total_Contact_Count__c from Account where Id IN : accConCount.keySet() ];
            for(Account acc : accountsToBeUpdated ) {
                //	acc.grensi__Total_Contact_Count__c = acc.grensi__Total_Contact_Count__c + accConCount.get(acc.Id);
            }
        }
        
        
        /////////////////////////// ************  after Delete  ************///////////////////////////
    
        if(triggerType == 'afterDelete') {
           Map<Id,Integer> accConDelete = new Map<Id,Integer>();
            for(Contact con : conOldList ) {
                if(!accConDelete.containsKey(con.AccountId)) {
					accConDelete.put(con.AccountId, -1);
                }
                else {
					accConDelete.put(con.AccountId, accConDelete.get(con.AccountId) - 1 );
                }
            }
            
            List<Account> accConDeleteList = [select Id, grensi__Total_Contact_Count__c from Account where Id IN : accConDelete.keySet() ];
            for(Account a : accConDeleteList ) {
			//	a.grensi__Total_Contact_Count__c = a.grensi__Total_Contact_Count__c + accConDelete.get(a.Id);
            }
            update accConDeleteList;
            
        }
        
    }
    
    
    
    
    
    
}