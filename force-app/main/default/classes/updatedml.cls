public class updatedml {

    public static  void updaterelatedrecord(){
        
        //child to perent record value
        Contact co1= [select Id,AccountId,Account.Industry from Contact  where id = '0035g00000rMzAFAA0'];
        co1.Phone = '2342353453454326536';
        co1.Account.Industry = 'Media';
       
        
        update co1; // updating contact record value
        update co1.Account; //update related account record value of the contact
        
    }
}