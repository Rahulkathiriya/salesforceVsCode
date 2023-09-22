public class dmldelete {

   /* public static void deleterecord(){
        Account acc = [select id,Name from Account where Name = 'abcdefg'];
        delete acc;
    } */
    public static void undeleterecord(){
        Account a1 = [select id,Name from Account where Name = 'dddddd' ALL ROWS];
        undelete a1;
    }
}