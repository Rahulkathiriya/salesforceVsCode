Trigger AccountDemoTrigger on Account (before insert,before update) {
    
    for(Account acc :Trigger.new){
        if(acc.BillingCity == 'LATHI'){
            acc.phone='1234';
        }
        
    }
    
    
}