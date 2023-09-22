trigger taskThatCanBeDeletedBySA on Task (before delete) {
Id pid = Userinfo.getProfileId();
    Profile pname = [select Name from Profile where id=: pid];
    for(Task taskObj:Trigger.old){
        if(pname.Name != 'System Administrator'){
            taskObj.addError('no Access for Deletion');
        }
    }
}