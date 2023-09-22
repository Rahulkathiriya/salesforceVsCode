({
      /*  doInit : function(component, event, helper) {
            var action = component.get("c.getCon");
            action.setCallback(this, function(response) {
                var state = response.getState();
                if (state === "SUCCESS") {
                    component.set("v.contact", response.getReturnValue());
                    console.log(response.getReturnValue());
                }
            });
            $A.enqueueAction(action); 
        },
        
        handleChange: function(cmp, event, helper) {
            var firstname = cmp.find("firstname").get("v.value");
            var lastname = cmp.find("lastname").get("v.value");
        },
        
        abc : function(cmp,event,helper){
            var action = cmp.get("c.getAcc");
            action.setCallback(this, function(response){
                var s1 = response.getState();
                if(s1 == 'SUCCESS'){
                    cmp.set("v.Account1",response.getReturnValue());
                    console.log(response.getReturnValue());
                    alert(response.getReturnValue());
                }
            });
            $A.enqueueAction(action);
        },
        handlc : function(cmp,event,helper){
            var f1 =cmp.find("firstname").get("v.value");
            var p1 = cmp.find("phone").get("v.value");
        }, 
        
        
        
        aaa : function(cmp,event,helper){
            var action = cmp.get("c.a111");
       
            
            action.setCallback(this, function(response){
               var s1 = response.getState();
             
                if(s1 === "SUCCESS"){
                    
                    var r1 =response.getReturnValue();
                //    console.log('dhruv  ' +r1);
                  cmp.set("v.a1",r1);
                    
                   
                }
                
            });
            $A.enqueueAction(action);
        }, */
        
        save : function(cmp,event,helper){
            cmp.find("edit").get("e.recordSave").fire();
        }
    })