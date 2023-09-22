public class futureMethodExample {
    
    public futureMethodExample(){
        system.debug('i am in futureMethodExample constructor method');
        method1();
        method2();
       
        method4(11,'dhruvil'); 
        method5();
        
        
        List<String> Slist = new List<String>();
        Slist.add('saleforce');
        Slist.add('beginner');
        
        set<Id> sId = new set<Id> ();
        sId.add('123');
        sId.add('456');
        sId.add('789');
        
         method3(Slist,sId);
        
        
        Account a  = new Account();
        a.Name = 'Account1';
		
        insert a;
        
        List<Contact> conList = new List<Contact>();
        
        Contact c = new contact();
        c.LastName = 'Contact1';
        conList.add(c);
        
        Contact c1= new contact();
        c1.LastName = 'Contact2';
        
        conList.add(c1);
        insert conList;
    }
    
    
    
    public void method1(){
        system.debug('i am in method1 method');  
    }
    public void method2(){
        system.debug('i am in method1 method'); 
    }
    @future(callout = true)
    public static void method3( List<String> alist, set<Id> setId ){
        system.debug('i am in static void method3 method'); 
         system.debug('alist  == '+ alist);
        system.debug('setId  == '+ setId);
    }
    @future
    public static void method4(integer i, String j){
        system.debug('i am in static void method4 method'); 
        system.debug('i  am in '+ i);
        system.debug('i  am in '+ j);
        
    } 
    public static void method5(){
        system.debug('i am in static void method5 method'); 
    }
}