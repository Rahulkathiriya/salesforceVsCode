({
    handleUpload : function(component, event, helper) {
        var uploadedFiles = event.getParam("files");
        
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "title": "Success!",
            "type" : "success",
            "message": uploadedFiles.length +" files has been uploaded successfully!"
        });
        toastEvent.fire();
      helper.helperMethod(component,event,helper); //auto refresh 
     //   $A.get('e.force:refreshView').fire();
        
        
    },
    HandlerPreview : function(component,event,helper){
       helper.helperMethod(component,event,helper);
    }  
})