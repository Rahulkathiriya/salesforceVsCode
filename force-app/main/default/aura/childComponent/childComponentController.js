({
    getMessage : function(component, event, helper) {
        
        var a1= event.getParam('arguments');
        if(a1){
            var p1 = a1.p1;
            var p2 = a1.p2;
            alert(p1 + "   " +p2);
        }
    },
    
    
    init :function(component,event,helper){
    var  y1 = event.getParam('arguments');
    
    if(y1){
    var b1 = y1.b1;
    var b2 = y1.b2;
    alert(b1 + "   " + b2);
}
 }
 })