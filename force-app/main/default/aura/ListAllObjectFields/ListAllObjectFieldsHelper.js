({
    helperMethod : function(cmp,event,helper) {
        var action = cmp.get('c.getAllObject');
        
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                
                var result = r.getReturnValue();
                // console.log(result);
                var listofObjects = [];
                
                for(var key in result){
                    listofObjects.push({key:key , value: result[key]});  
                    //  console.log(listofObjects);
                }
                cmp.set("v.allObject", listofObjects);
                console.log('assas-->',listofObjects);
                
            }else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
        });                
        
        $A.enqueueAction(action);
        
    },
    getAllFields : function(cmp,event,helper){
        
        var objectData = cmp.find("objectId").get('v.value');
        console.log('objectData-->',objectData);
        
        var action = cmp.get('c.getFieldData');
        action.setParams({
            'SelectedField': objectData
        });
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                var result = r.getReturnValue();
                console.log('result-->',result);
                cmp.set('v.allField',result);
            }else if (status === "INCOMPLETE") {
                console.log("No response from server or client is offline.");
            }else if (status === "ERROR") {
                if (errors) {
                    if (errors[0] && errors[0].message) {
                        console.log("Error message: " + errors[0].message);
                    }
                } else {
                    console.log("Unknown error");
                }
            }
            
        });
        $A.enqueueAction(action);
    }
})