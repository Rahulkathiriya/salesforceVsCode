trigger contactcontroller on Contact (after insert) {

    Set<Id> s1 = new Set<id>();
    
    for(Contact con:trigger.new){
        s1.add(con.AccountId);
    }
    system.debug(s1);
}