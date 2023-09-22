public class seconDataTable {

    @AuraEnabled (cacheable=true)
    public static List<grensi__Demo_School__c> getObject(){
        List<grensi__Demo_School__c> sList = [select Id,Name,grensi__EmployName__c,grensi__Total_Marks_Student_obj__c from grensi__Demo_School__c];
        if(!sList.isEmpty()){
            system.debug('sList' +sList);
            return sList;
        }else{
            return Null;
        }
    }
    
    // user input value get apex method
    
    @AuraEnabled
    public static void updateObject(List<grensi__Demo_School__c> schData){
      //  system.debug('data school -->'+schData);
       // return 'Done';
      
      //  List<grensi__Demo_School__c> s1 = schData;
        update schData;
  
    }
}