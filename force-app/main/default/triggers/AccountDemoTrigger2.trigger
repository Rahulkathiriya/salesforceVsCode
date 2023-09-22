trigger AccountDemoTrigger2 on Account (before insert,before update) {

    for(Account acc :Trigger.new){
        if(acc.phone == '1234'){
            acc.BillingCity='LATHI';
        }
        
    }

}