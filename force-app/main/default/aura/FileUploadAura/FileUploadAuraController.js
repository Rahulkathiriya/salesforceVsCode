({
	handleruploadfinished : function(component, event, helper) {
		var uploadedFiles = event.getParam("files");
        alert("Files uploaded :" + uploadedFiles.length);
        
        uploadedFiles.forEach(file => console.log(file.name));
	}
})