({
    /*  handleClick : function (cmp, event, helper) {
        alert("You clicked: " + event.getSource().get("v.label"));
    } */
    
   /* "echo" : function(cmp) {
        
        var action = cmp.get("c.serverEcho");
        action.setparams({firstName : cmp.get("v.firstName")});
        
        
        action.setCallback(this, function (response)){
                           var state = response.getState();
        if(state == "SUCCESS"){
            alert("From server" +response.getReturnValue());
        }
        else if(state == "INCOMPLETE")
        {
            
        }
            else if(state == "ERROR")
            {
                
                var errors = response.getError();
                
                if(errors){
                    if(error[0] && error[0].message){
                        console.log("Error message :"+ errors[0].message);   
                    } 
                }else{
                    console.log("unknown error");
                }
            }
    }
} */
    
    
    doInit :function(cmp,event,helper){
        
        var action = cmp.get("c.getContact12")
    }
    
    
 })