public class dmlhospital {

    
    public static void parentreco(){
        
        List<grensi__Hospital__c> a1 = new List<grensi__Hospital__c>();
        system.debug('a1 value :'+ a1);
        
        grensi__Hospital__c h1 = new grensi__Hospital__c();
        h1.Name = 'vegad';
        h1.grensi__Phone__c = '34325443';
        
        a1.add(h1);
        system.debug('h1 value ' + h1);
        
        if(!a1.isEmpty()){
            insert a1;
            system.debug('a1 value updated :' + a1);
             system.debug('a1 value updated :' + a1[0].Id);
    childrecord(a1[0].Id);
        }
        
    }
    
    public static void childrecord(string d){
        
        grensi__Patient__c p1 = new grensi__Patient__c(
       Name = 'dhruvil',
        grensi__Phone__c = '999999999',
        
        grensi__RoomNumber__c = d
            );
        system.debug('p1 value :'+ p1);
        insert p1;
    }
}