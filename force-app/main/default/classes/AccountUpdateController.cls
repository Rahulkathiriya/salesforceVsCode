public class AccountUpdateController {

   /* public static void accUpdate(){
        
       /* list<account> acclist = [SELECT Id,NAme FROM Account];
        for(Account a1:acclist){
            system.debug('ID :'+ a1.Id); 
    }*/
        
        
        //specific 1 id only gather this id example
      
     
    /*   Id addId = [SELECT Id FROM Account limit 1].Id;
        system.debug('addId  :'+addId); */
        
      /*  list<Account> accList = [SELECT Id,Name from Account];
        list<Account> updateAccList =new list<Account>();
        for(Account acc:accList){
            Account updateAcc =new Account();
            updateAcc.phone = '5678589095';
            updateAcc.Id =acc.Id;
            updateAccList.add(updateAcc);
        }
        
		update  updateAccList;           
        
    } */

    
       //list<string> n1 =new list<string>{'0015g000015xVWAAA2'};
//AccountUpdateController.acUpdatecontroller(n1);
//
   /* public static void acUpdatecontroller(list<string> accId){
        
        list<Account> a1 = new list <Account>();
        
        for(string id:accId){
            Account c1 = new Account();
            c1.Name = 'dhruvil patel 111';
            c1.Phone = '455789546';
            c1.Id = id;
            a1.add(c1);
        }
            update a1;
        
    }*/ 
    
  /*  public static void a1(){
        
      /*  list<Account> b1 =[SELECT id from Account where BillingState =null limit 10];
        delete b1; */
        
      /*   list<Account> b1 =[SELECT id from Account where Id ='0015g000015xVW7AAM' ];
        delete b1; */
        
/*        string accId= '0015g000015xVWAAA2';
        account a1 =new account();
        a1.Id =accId;
        delete a1;
        
        
    } */
    
    
    public static void a1(list<string> idinc){
        
       list<account> b1 = new list<account>();
  
        for(string s1:idinc){
            account acc = new account();
            acc.Id = s1;
            b1.add(acc);
        }
        delete b1;
    }
}