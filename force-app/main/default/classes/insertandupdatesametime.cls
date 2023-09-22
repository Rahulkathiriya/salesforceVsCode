public class insertandupdatesametime {

    public static void insertrecord(){
        grensi__Hospital__c a1 = new grensi__Hospital__c();
        a1.Name = 'bharat';
        insert a1;
        
        system.debug('a1 value :'+ a1.Id);
        
        grensi__Hospital__c hosipitalupdate = [select Id,Name,grensi__Phone__c from grensi__Hospital__c where id =:a1.Id];
        hosipitalupdate.grensi__Phone__c = '1232132341431242345';
        update hosipitalupdate;
    }
}