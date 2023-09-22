public class trgHelperCls {
  /*  public static void trgMethod (List<grensi__Employee__c> empList, Map<Id,grensi__Employee__c> oldMap){
        
        Set<Id> parentIds = new Set<Id>();
        
        if(!empList.isEmpty()){
            
            for(grensi__Employee__c newEmp : empList){
                
                if(oldMap != null){
                    
                    grensi__Employee__c oldEmp = oldMap.get(newEmp.Id);
                    
                    if(oldEmp.grensi__Tech_Firm__c != newEmp.grensi__Tech_Firm__c){
                        
                        parentIds.add(oldEmp.grensi__Tech_Firm__c);
                        parentIds.add(newEmp.grensi__Tech_Firm__c);
                        
                    }else{
                        
                        parentIds.add(newEmp.grensi__Tech_Firm__c); 
                    }
                }else{
                    parentIds.add(newEmp.grensi__Tech_Firm__c);
                }
            }
        }
        
        List<AggregateResult>  aggrList = [select grensi__Tech_Firm__c tfId, max(Salary__c) maxSalary,
                                           min(Salary__c) minSalary from grensi__Employee__c where grensi__Tech_Firm__c IN : parentIds];
        
        if(!aggrList.isEmpty()){
            
        }
    }*/
}