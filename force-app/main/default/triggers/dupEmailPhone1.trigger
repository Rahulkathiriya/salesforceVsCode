trigger dupEmailPhone1 on Contact (before insert, before update) {
    
    Map<String,Contact> emailMap = new Map<String,Contact>();
    Map<String,Contact> phoneMap = new Map<String,Contact>();
    
    for (Contact con :trigger.new){
        if(trigger.isInsert){
            emailMap.put(con.Email,con);  
            phoneMap.put(con.Phone,con);
        }
        if(trigger.isUpdate){
            if(trigger.oldMap.get(con.Id).Email != con.Email){
                emailMap.put(con.Email,con);
                
            }
            if(trigger.oldMap.get(con.Id).Phone != con.Phone){
                phoneMap.put(con.Phone,con);
            }
        }
    }
    
    String errorMessage ='';
    List<Contact> existingContactList = [select Id,Email,Phone from Contact where Email IN: emailMap.keySet() OR Phone IN : phoneMap.keySet()];
    if(existingContactList.size() > 0){
        for(Contact  conRec :existingContactList ){
            if(conRec.Email != null){
                if(emailMap.get(conRec.Email)  != null){
                    errorMessage='Email ';
                }
                
            }
            if(conRec.Phone  != null){
                if(phoneMap.get(conRec.Phone) != null){
                    errorMessage= errorMessage +(errorMessage != '' ? 'and Phone' : 'Phone' );
                }  
            }
            if(errorMessage != ''){
                trigger.new[0].addError('Your Contact '+ errorMessage + ' Already exists in System');	
            }
        }
    }
    
}