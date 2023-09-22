trigger accTrig on Contact (before insert) {
     
    /** for(Contact c:Trigger.New){
        if (c.getQuickActionName() == QuickAction.CreateContact) {
            c.Level__c  = 'GlobaActionl';
        } else if (c.getQuickActionName() == Schema.Account.QuickAction.CreateContact) {
            c.Level__c  = 'AccountAction';
        } else if (c.getQuickActionName() == null) {
            c.Level__c  = 'NoAction';
        } else {
            System.assert(false);
        }
    } **/
}