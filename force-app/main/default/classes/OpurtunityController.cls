public class OpurtunityController {
	@AuraEnabled
    public static List<Opportunity> getOpp(){
        List<Opportunity> oppList =  [select Id,Name,CloseDate,StageName from Opportunity ];
        return oppList;
          
    }
    @AuraEnabled
    public static  Boolean insertOpp(String name1, Date	 Date1, String stage1){
        
        Opportunity oop = new Opportunity();
        oop.Name = name1;
       oop.CloseDate = Date1;
        oop.StageName = stage1;
       
        
        system.debug('o1 -->'+oop);
         insert oop;
        return true;
    }
}