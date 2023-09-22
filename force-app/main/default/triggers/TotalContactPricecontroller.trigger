trigger TotalContactPricecontroller on Contact (after insert) {

    
    Set<Id> accIds = new Set<Id>();//account id ni value aama mali
    for(Contact con:Trigger.new){
       accIds.add(con.AccountId);
             
    }
List<Contact> conList = [select Id,AccountId, Contact_Price__c    from Contact where AccountId IN :accIds]; //query thrue contact obj ma account id ni ander je id set kari se te se k ny to te is conList ma add thay jay
    
    Map<Id,Decimal> accpricemap = new Map<Id,Decimal>();
    
    for(Contact con:conList){
        if(accpricemap.containsKey(con.AccountId)){
           Decimal price =accpricemap.get(con.AccountId) +con.Contact_Price__c  ;
            accpricemap.put(con.AccountId,price);
        } 
        else{
            accpricemap.put(con.AccountId,con.Contact_Price__c  );
        }
    }
    
    List<Account> accList = new List<Account>();
    for(Id accId : accpricemap.keySet()){
        
        Account acc = new Account();
        acc.Total_Contact_price__c = accpricemap.get(accId);
        acc.Id =accId;
        accList.add(acc);
    }
    update acclist;
    
}