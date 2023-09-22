public class contactobj {

    
    public static Void INSERTCON( integer value ){
        List<Contact> a1 = new list<Contact>();
        
    integer    R = 1;
        while( R <= value){
            Contact b1 =new Contact();
            b1.Phone ='48567845674' +R ;
            b1.FirstName = 'Dhruvil' ;
            b1.LastName = 'Patel' +R;
            a1.add(b1);
            system.debug(b1);
            R =R + 1;
        }
        insert a1;
    }
}