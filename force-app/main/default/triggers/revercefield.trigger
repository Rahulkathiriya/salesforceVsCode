trigger revercefield on Opportunity (before insert,before update) {

    
    if((Trigger.isinsert || trigger.isupdate)) {
     
    for(Opportunity op:trigger.new){
        
      Opportunity opp = new Opportunity();
       
        
        string s1 =op.Description;
        string reverse = s1.reverse();
        opp.Description =reverse;
        
        opp.Name = op.Name +'opp';
        opp.CloseDate = op.CloseDate;
        opp.StageName = op.StageName;
        
       // oppList.add(opp);
        
         system.debug('op value '+ op);
         system.debug('opp value '+ opp);
         
    }
  
    }
 

    
}
//List<Opportunity> oppList =new List<Opportunity>();