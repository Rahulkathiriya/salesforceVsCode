public class dmlmerge {

    public static void mergerecord(){
        
        Account masterAccount =[select id,Name from Account where Name = 'abcdefg'];
        Account mergeAccount = [select id,Name from Account where Name = 'Ravi'];
        
        merge masterAccount mergeAccount;
        system.debug('value'+ masterAccount + mergeAccount);
    }
}