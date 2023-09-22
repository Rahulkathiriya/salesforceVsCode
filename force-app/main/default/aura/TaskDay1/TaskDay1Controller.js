({
    abc : function(component, event, helper) {
       
        var today = new Date();         //first example set date
        var h = today.getHours();
        var m = today.getMinutes();
        var all =(m +":"+h);     
        component.set("v.CurrentTime",all); 
        
        
        //var time = ($A.localizationService.formatDate(today, "hh:mm  a"));   //second example date
        // component.set("v.CurrentTime",time);
        
        
        var greeting ="";
        var hour = today.getHours();       
        if(hour >= 0 && hour <= 12){
            greeting = "Goodmorning";   
        }else if(hour <= 17 && hour >=12){
            greeting = "GoodAfternoone"; 
        }else{
            greeting = "GoodEvening"; 
        }
        component.set("v.message",greeting); 
    }
    
})