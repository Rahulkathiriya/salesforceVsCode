public class BasicTriggerHalper {
    
    //Before Insert
    
    public static void BeforeInsert(List<Account> acList){
        for(Account a : acList){
            a.Name = 'Mr/Ms' + a.Name;
        } 
    }    
    
    //before update
    
    public static void BeforeUpdate( Map<Id,Account> accMap, List<Account> acList){
        for(Account newAcc : acList){
            Account oldAcc = new Account();
            oldAcc = accMap.get(newAcc.Id);
            if(newAcc.Phone != oldAcc.Phone){
                newAcc.Phone.addError('account name cannot be modifired');
            }
        }
    }
    
    // before delete     trigger found this account record has an associated contact record because not delete 
    
    public static void BeforeDelete(List<Account> acList){
        Set<Id> IdList = new Set<Id> ();
        for(Account acc : acList){
            IdList.add(acc.Id);
        }        
        List<Contact> conList = [select Id,Name,AccountId from Contact where AccountId In : IdList];
        Map<Id,Contact> conMap = new Map<Id,Contact>();
        for(Contact con : conList){
            conMap.put(con.AccountId,con); 
        }
        for(Account a : acList){
            if(conMap.containsKey(a.Id)){
                a.addError('this account record has an associated contact record');
            }
        }  
    }
    
    // Inserting a new contact for a new account
    
    public static void afterInsert(List<Account> acList){
        List<Contact> conList = new List<Contact>();
        for(Account a : acList){
            Contact c = new Contact (LastName = a.Name + 'Contact' ,AccountId = a.Id);
            conList.add(c);
        }
        insert conList;
    }
    
    // Update contact mailing city to account Billing city 
    
    public static void afterUpdate(Map<Id,Account> accMap){
        List<Contact> conList = [select LastName from Contact where AccountId IN : accMap.keySet()];
        for(Contact c : conList){
            Account a = accMap.get(c.AccountId);
            a.BillingCity = c.MailingCity;
        }
        Update conList;
    }
    
    // this method delete all recycle bin record  ---> afterDelete
    
    public static void afterDelete(List<Account> acList){
        Database.emptyRecycleBin(acList);
    }
    
    // this method undelete perticular record 
    
    public static void afterUndelete( Map<Id,Account> accMap){
        list<Account> UndeleteAcc = new list<Account>();
        UndeleteAcc = [SELECT id,Description FROM Account WHERE Id IN :accMap.keyset()];  
        for(Account c : UndeleteAcc) {
            c.Description = 'Succesfully Undelete';
        }
        update UndeleteAcc;     
    }
    
    
    
}