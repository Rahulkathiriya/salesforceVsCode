public class Testdatabasemethod {

    
    public static void insertmethod(){
        
     /*   List<Contact> c1 = new List<Contact>{
            new Contact(FirstName = 'Patel', LastName = 'Dhruvil', Department = 'Finance'),
            new Contact(FirstName = 'Patel', LastName = 'Chintan', Department = 'Tecnology'),
            new Contact(FirstName = 'Patel', LastName = 'Smit', Department = 'Finance'),
                new Contact()
        };
            
            Database.SaveResult[] srList = Database.insert(c1, false);
        
        for(Database.SaveResult sr : srList){
            if(sr.isSuccess()){
                
                //opration successfully work to get get record id
                system.debug('Successfully inserted contact :' + sr.getId());
            }else{
                
                //opration insert error to see what is error    
                for(Database.Error err : sr.getErrors()){
                  system.debug('The following error has occurred.');  
                    
                 system.debug(err.getStatusCode() + ':' + err.getMessage());
                    
                    system.debug('Contact fields that affected this error: '+ err.getFields());
                }        
                
            
            }
        }  */
        
        
     /*   Account acct = new Account(Name='SFDC Account');
insert acct;
// Once the account is inserted, the sObject will be 
// populated with an ID.
// Get this ID.
ID a1 = acct.ID;
// Add a contact to this account.
Contact mario = new Contact(
    FirstName='Mario',
    LastName='Ruiz',
    Phone='415.555.1212',
    AccountId=a1);
insert mario; */
        
        
        Account ac1 = new Account (Name = 'saleforce beginer');
        insert ac1;
   
        id a11 = ac1.Id;
        
        Contact co1 = new Contact();
        co1.FirstName = 'sfdc';
        co1.LastName = 'saleforce';
        co1.Phone = '666666666';
     
  id  AccountId = ac1.Id;
        
        insert co1;
        
        
    }
}