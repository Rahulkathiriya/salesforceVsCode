public class DebugingSkill {
    /*  @future                                    // set ID thruogh future method 
public static Void updateAccount(Set<Id> Ids){

List<Contact> conList = new List<Contact>();
List<Account> accList= [select Id from Account where Id IN:Ids];
for(Account acc : accList){
Contact con = new Contact();
con.Phone = acc.Phone;
con.LastName = acc.Name;
con.AccountId = acc.Id;
conList.add(con);
}
insert conList;
} */
    
    @future
    public static Void updateAccount(String newData){
        
        List<Contact> conList = new List<Contact>();
        List<Account> accList= (List<Account>) JSON.deserialize(newData,List<Account>.class);
        for(Account acc : accList){
            Contact con = new Contact();
            con.Phone = acc.Phone;
            con.LastName = acc.Name;
            con.AccountId = acc.Id;
            conList.add(con);
        }
        insert conList; 
        
        
    }
}