({
   /*  init : function(component, event, helper) {setParams
     	var searchKey = event.getParam("searchKey");                                              
        var action = component.get("c.fetchAcc");
        action.({
          'searchKey': searchKey
        });
        action.setCallback(this, function(response) {
            if(response.getState() === "SUCCESS") {
             var rec = response.getReturnValue();
             component.set('v.userlist',rec);
            }
        });
        $A.enqueueAction(action);
        
 } , */
   /* doInit : function(component, event) {
        var action = component.get("c.Details");
        action.setCallback(this, function(a) {
            component.set("v.userlist", a.getReturnValue());
        });
        $A.enqueueAction(action);
    }, */
    
    searchKeyChange: function(component, event) {
        console.log('enterrrr');
        var searchKey = component.find("searchKey").get("v.value");
        //var searchKey = event.getParam("searchKey"); 
        console.log(searchKey,'searchKey')
        var action = component.get("c.getuserList");
        console.log(action,'action')
      	action.setParams({
            'searchKey': searchKey }); 
      
        action.setCallback(this, function(a) {
            console.log('dsbj');
            var state = a.getState(); 
            console.log(state,'state');
            if (state === "SUCCESS") {
                var res = a.getReturnValue();
                console.log(res,'res');
                component.set('v.userlist',res);
           
            }  else if(state === "ERROR") {
                var errors = response.getError();
                if(errors){
                    if(errors[0] && errors[0].message){
                        console.log("Error Message: " + errors[0].message);
                    }
                }
                else{
                    console.log("Unknown Error");
                }
            }        
        });
        $A.enqueueAction(action);
      }, 
    
	 /*searchKeyonChange: function(component, event) {
        var myEvent = $A.get("e.c:SearchKeyChange");
        myEvent.setParams({"searchKey": event.target.value});
        myEvent.fire();
        },    */
    
     handleChange: function (component, event) {
        alert(event.getParam('options'));
        component.set("v.options",options);
    } ,
    
    handleClick : function(component, event, helper) {
        console.log('enter');
        var searchKey = event.getParam("searchKey"); 
        console.log('searchkey');
        var action = component.get("c.fetchAcc");
        action.setParams({
            'searchKey': searchKey});
        action.setCallback(this, function(response) {
            console.log('in setcallback');
            var state = response.getState(); 
            console.log(state,'state');
            if (state === "SUCCESS") {
                console.log('success');
                var res = response.getReturnValue();
                console.log(res,'res')
                component.set('v.userlist',response.res);
                console.log('wwww');
            }
        });
        $A.enqueueAction(action);
        
    }  
})