trigger ReverseController on Opportunity (before insert,before update) {
    
    
    if((trigger.isinsert || trigger.isupdate) && trigger.isbefore){
        
        for(Opportunity op:trigger.new)
        {
            List<Opportunity> oppList =[select Id,Name,Description,StageName,CloseDate from opportunity ];
            Opportunity opp = new Opportunity();
            
            
            string s1 =op.Description;
            string reverse = s1.reverse();
            opp.Description =reverse;
            
            opp.Name = op.Name +'opp';
            opp.CloseDate = op.CloseDate;
            opp.StageName = op.StageName;
            oppList.add(opp);
            
                    
         system.debug('op value '+ op);
         system.debug('opp value '+ opp);
       
        }
    }
}