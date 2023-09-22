({
    copyTheText : function(cmp,event,copiedInputText) {
        var copyInput = document.createElement("input");
        copyInput.setAttribute("value",copiedInputText);
        
        document.body.appendChild(copyInput);
        copyInput.select();
        
        document.execCommand("copy");
        document.body.removeChild(copyInput);
        
        var beforeClickLabel = event.getSource().get('v.label'); 
        
        event.getSource().set('v.label','copied');
        event.getSource().set('v.iconName','utility:check');
        
        setTimeout(function(){
            event.getSource().set('v.label',beforeClickLabel);
            event.getSource().set('v.iconName','utility:copy_to_clipboard');
        },2000)
    }
})