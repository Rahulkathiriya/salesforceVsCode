trigger fieldRecord on Contact (after insert) {

    for(Contact con :Trigger.new){
        system.debug('con'+ con);
    }
}