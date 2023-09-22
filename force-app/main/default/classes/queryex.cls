public class queryex {

    
   /* public static void soql(){
        insert new account (name  = 'dhruvil');
         account acc= [select id from account where name = 'dhruvil' limit 1 ];
        system.debug(acc);
   
    }*/
    
    public static void listsoql(){
     /*   list<account> lists =[select id from account where name = 'dhruv' limit 1];
        system.debug(lists);*/
  
      /* list<account> a1 = [select id from account where name = 'abc' limit 1];
        
        for(account a:a1);
        system.debug(a1); */
    
       list<string> s1 =new list<string>{'dhruvil','smit','dhrunal'};
            list<contact> contact1 =[SELECT firstname, lastname, email From contact where name IN:s1];
        
        system.debug(contact1);
        
    /*     list<String> s2 =new list<String>();
        list<contact> contact2 =[SELECT id firstname, lastname, email From contact where name NOT IN:s2];
          system.debug(contact2);
        
        
      /*  set<id> idset = new set<id>();
            list<contact> conlist2 = [SELECT id firstname,lastname,email FROM contact WHERE id IN:idset];

       system.debug(conlist2);*/
        
        
      
    }
    
}