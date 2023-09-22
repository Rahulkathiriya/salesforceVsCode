public class methodrefrence {

    public static void demomethod1(){
        
        
        // pass by refrence
          List <integer> emptylist = new List<integer>();
         system.debug('empylist :'+ emptylist);
         nonprimitivemethod(emptylist);
         system.debug('empylist :'+ emptylist);
     /*   emptylist.add(109);
         system.debug('empylist :'+ emptylist); */
        
       
         
    }
    public static void nonprimitivemethod(List <integer> listtofill){
        system.debug('listtofill : '+listtofill);
        listtofill.add(10);
        listtofill.add(50);
        listtofill.add(70);
        
            system.debug('listtofill : '+listtofill);
    }
}