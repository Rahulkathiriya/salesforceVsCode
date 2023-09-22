trigger updateSerialNoOnOppoLineItem on OpportunityLineItem (before insert) {
    
    set<Id> oppId = new Set<Id>();
    for(OpportunityLineItem oppProd:Trigger.new){
        oppId.add(oppProd.OpportunityId);
    }
    List<OpportunityLineItem> oppProdListTOUpdate = new List<OpportunityLineItem>();
    Map<Id,String> oppIdSerialNoMap =new Map<Id,String>();
    
    List<OpportunityLineItem> oppProdList = [select Id,grensi__Serial_No__c,OpportunityId from OpportunityLineItem where OpportunityId =:oppId];
    if(oppProdList.size() > 0 ){
        for(OpportunityLineItem oppoPrd : oppProdList){
            if(oppoPrd.grensi__Serial_No__c != null){
                String lastword = oppoPrd.grensi__Serial_No__c.right(1);
                Integer num = Integer.valueOf(lastword);
                num++;
                
                oppoPrd.grensi__Serial_No__c = oppoPrd.grensi__Serial_No__c + ',' +(num);
                oppProdListTOUpdate.add(oppoPrd);
                
                oppIdSerialNoMap.put(oppoPrd.OpportunityId,oppoPrd.grensi__Serial_No__c);
            }else {
                oppoPrd.grensi__Serial_No__c='1';
                oppProdListTOUpdate.add(oppoPrd);  
            }
        }
    }
    
    if(oppProdListTOUpdate.size() > 0){
        update oppProdListTOUpdate;
    }
    for(OpportunityLineItem oppProd: Trigger.new){

        if(oppIdSerialNoMap.containsKey(oppProd.OpportunityId)){
          oppProd.grensi__Serial_No__c = oppIdSerialNoMap.get(oppProd.OpportunityId);  
        }else{
            oppProd.Serial_No__c='1';
        }
    }
    
}