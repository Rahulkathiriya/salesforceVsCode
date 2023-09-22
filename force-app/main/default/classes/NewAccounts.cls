public class NewAccounts {

    

   /* public static void sObjectsInsert(){
        Account store = new Account();
        store.Name = 'The name is dhruvil';
        store.AccountNumber = '356281';
        store.Phone = '826234623742234324324';
        store.Industry = 'vegad brother';
        store.AccountSource = 'sdfsdf';
        insert store;
    } */
    
    
 /*  public static void insertobj(){
        
    Contact store1 = new Contact();
    Contact store2 = new Contact();
        
        store1.FirstName ='dhruvil';
        store1.LastName ='bhai';
		store1.Email ='dhruvil123@gmail.com';
        store1.Phone ='4537283465';
        store1.AssistantName = '18/3/1999';
        
        store2.LastName ='bhai';
		store2.FirstName ='patel';
        store2.Email ='patel567@gmail.com';
        store2.Phone ='453728345654654564564465';
        store2.AssistantName = '1/8/1989';
    


 		insert store1;
		insert store2;
            } */

    
 /*   public static void inserta1(){

        Account store1 = new Account();
Account store2 = new Account();
store1.Name = 'The Tea Factory 1';
store1.AccountNumber = '356281';
store1.Phone = '555-0158';
store2.Name = 'The Tea Factory 2';
store2.AccountNumber = '356282';
store2.Phone = '555-4012';
insert store1;
insert store2;
    } */
    
    
    // PROBLEM
 /*   public static void insertcases(){
        
        Case store1 =new Case();
        store1.SuppliedPhone = '89859345345';

        store1.Subject ='my name dhruvil';
    } */
    
     
   public static void sObjectsInsert(Integer value){
        Integer counter = 1;
      
        //create a list to add our accounts
        List<Account> myfactory = new List<Account>();
        while(counter <= value){
            //display the current counter value
            System.debug('Counter Value before Incrementing ' + counter);
            
            
            //create a new account
            Account store = new Account();
            store.Name = 'my factory ' + counter;
            store.AccountNumber = '35629' + counter;
            store.Phone = '8995554654'+ counter;
            myfactory.add(store);
            System.debug(myfactory);
            
            
            //increment the counter
            counter = counter + 1;
          // System.debug('Counter Value after incrementing ' + counter);
        }
        //System.debug('Size of Account List: ' + myfactory.size() );
      //  System.debug('Elements in Account List: ' + myfactory);
       
       
        //insert all of the accounts in the list
   insert myfactory;
  
}  
}