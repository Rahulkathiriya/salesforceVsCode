public class dml {

    
  /*  public static void s1(string acco){
        Account acc1 =new Account();
        acc1.Name = acco;
        insert acc1;
    } */
    
    public static void l1(list<string> dh1){
    list<Account> mylist1 = new list<Account>();
    for( string name:dh1){
        Account acc = new Account();
        acc.Name = name;
        mylist1.add(acc);
    }
    insert mylist1; 
    }
}