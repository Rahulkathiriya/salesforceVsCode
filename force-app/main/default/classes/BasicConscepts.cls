public class BasicConscepts {
    
    public static void getData(){
        
        /*   Integer[] a1 = new List<Integer>();
a1.add(10);
a1.add(20);
a1.add(30);
a1.add(40);


system.debug('a1--->'+a1);
system.debug('a1--->'+a1.size()); */
        
        /*     Set<Account> sSet = new Set<Account>();

Account a1 = new Account(Name='Amazon', NumberOfEmployees = 20000);
Account a2 = new Account(Name='Walmark', NumberOfEmployees = 20000);
Account a3 = new Account(Name='Amazon', NumberOfEmployees = 20000);
Account a4 = new Account(Name='Amazon');

sSet.add(a1);
sSet.add(a2);
sSet.add(a3);
sSet.add(a4);

system.debug('sSet--->'+sSet);
system.debug('sSet--->'+sSet.size()); */
        
        
        /*  Map<Integer,String> m1 = new Map<Integer,String> { 1 => 'Dustin', 2 => 'Will', 3 => 'Lucas'};

system.debug('m1--->'+m1);

Map<Integer,String> mMap = new Map<Integer,String>(); 
mMap.putAll(m1);

system.debug('mMap--->'+mMap);
system.debug('mMap.get method--->'+mMap.get(1));

List<String> s1 = new List<String>();
s1 = mMap.values();
system.debug('s1--->'+s1);

Map<Integer,String> o = new Map<Integer,String>();
o = mMap.clone();
system.debug('o--->'+o);

system.debug(' o.Keyset() --->'+ o.Keyset());
system.debug(' o.containKey() --->'+ o.containsKey(2)); */
        
        /*    integer I1 = 3500;
double D1 = 5;

system.debug('I1--->'+(I1-D1));
system.debug('I1--->'+(I1+D1));

date d = Date.newInstance(2019,01,01);
system.debug('date to integer '+ (d + I1));

dateTime dt = DateTime.newInstance(2018,05,15,09,20,30);
system.debug('dt-->'+(dt - D1)); */
        
        
        
        
        /*   // equelity Operator

List<Integer> a = new Integer[5];
List<Integer> b = new Integer[5];
List<Integer> c = new Integer[]{1,2,3,4,5};

for(Integer i=0; i<5; i++){
a[i]=i+1;

}
system.debug('a-->'+a);
system.debug('a-->'+b);
system.debug('a-->'+(a==b));
system.debug('a-->'+(a==c)); */
        
        
        
        //**************************While Loop ************************//
        
        
        /*    Integer a = 1;
Integer b = 0;

while(a <= 11){
b = b + a;
a++;
}
system.debug('b-->'+b); 

List<Account> accList = [select Id,Name,Phone from account];

for(Integer i=0; i<accList.size(); i++){
system.debug('for Loop ********* '+ accList[i].Name);
}

for(Account a : accList){
system.debug('for each loop in apex ---------->'+ a.Name);
} */
        
        
        //*********************SOQL keyWord **************************//
        
        
        /*    List<object> conList = [select Amount from opportunity Order By Amount DESC];
system.debug('conlist'+conList);


set<Id> a = new Set<Id>{'0035g000013BoFRAA0','0035g00000oQ8vnAAC'};
List<Contact> con = [select Id,Name from contact where Id Not IN : a];
system.debug('con ------------->'+con);
*/
        
        /*      List<AggregateResult> agre1 = [select StageName from Opportunity GROUP BY StageName ];
system.debug('agre1->'+agre1);


List<AggregateResult> agre2 = [select COUNT(Name),StageName from Opportunity GROUP BY StageName HAVING COUNT(Name) < 3 ];
system.debug('agre2->'+agre2);
*/
        
        
        
        
    /*    Integer a1 = [select COUNT() from opportunity];
        system.debug('a1---->'+a1);
        
        AggregateResult agre1 = [select COUNT(Amount) from opportunity];
        system.debug('agre1---->'+agre1);
        
        
        AggregateResult agre2 = [select Count_Distinct(Amount) from opportunity];
        system.debug('agre2---->'+agre2);
        
     //   List<AggregateResult> i2 = agre2.get('expr0');
     //   system.debug('i2---->'+i2);
     */
        
    /*    string s1 = 'select Name,Phone from account';
        List<sobject> l1 = Database.query(s1);
        system.debug('l1---->'+l1); */
        
     /*  List<contact> a1 = [select Id,Name,Account.Rating from contact];
        
        
        system.debug('query'+ a1); */
        
        
    /*    List<OpportunityLineItem> OList = [select id,Name, Opportunity.Amount, Opportunity.Account.Name, Opportunity.account.NumberOfEmployees from OpportunityLineItem];
        system.debug('OList'+OList);  */
        
        List<List<sObject>> l1 = [ find 'Record' Returning Account, Contact ];
        system.debug('l1----->'+l1);
        
        List<List<sObject>> l2 = [ Find 'Record' Returning Account(Name,NumberofEmployees), contact(Name,Phone) ];
        system.debug('l2------>'+l2);
        
        
        List<Account> accList = l2[0];
        system.debug('accList--->'+accList);
        
        List<contact> conList = l2[1];
        system.debug('conList--->'+conList);
        
       
        
        
        
        
        
        
        
        
    } 
}