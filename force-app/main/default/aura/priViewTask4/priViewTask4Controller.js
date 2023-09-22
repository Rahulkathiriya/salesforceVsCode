({
    abcd : function(cmp, event, helper) {
        var  action = cmp.get("c.getAccData");
        action.setCallback(this,function(response){ 
            if(response.getState() == 'SUCCESS'){
                cmp.set("v.AddRecord",response.getReturnValue());
                console.log('response----->',response.getReturnValue());
            }
        });
        $A.enqueueAction(action);  
        
        //  record count init
        var  ac = cmp.get("c.countRecord");
        ac.setCallback(this,function(response){ 
            if(response.getState() == 'SUCCESS'){
                cmp.set("v.CoountNumOfRec",response.getReturnValue());
                console.log('response----->',response.getReturnValue());
            }
        });
        $A.enqueueAction(ac); 
        
        
    },
    Addrecord : function(cmp,event,helper){
        var inputName = cmp.find("addId").get("v.value");
        var action = cmp.get("c.inputIdValue");
        action.setParams({
            'a1'  : inputName,
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                $A.get('e.force:refreshView').fire();
                cmp.set("v.AddRecord",response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
    },
    
    
    
    redirect:function (cmp,event,helper){
        window.close();
    }, 
    PrintTable :function(cmp,event,helper){
        window.print();
    },
    
    RecordCountChange :function(cmp,event,helper){
        
        var count = cmp.get("v.CoountNumOfRec");
        //   console.log('count--->',count );
        
        var e = document.getElementById("select");
      //  console.log('e--->',e);
        var value = e.value;
        console.log('vallue--->',value);
      //  var text = e.options[e.selectedIndex].text;
      //  console.log('text--->',text );
        
        
      //  console.log('set-->',"v.selectedValue",value);
        
      var action = cmp.get("c.optionRecord");
        action.setParams({
            'recordValue' : value
        });
        action.setCallback(this,function(response){
          if(response.getState() == 'SUCCESS'){   
               console.log(response.getReturnValue());
             cmp.set("v.AddRecord",response.getReturnValue());
              
            }
        });
        $A.enqueueAction(action);
        
    },
    
    
})