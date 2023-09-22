({
	CopyText : function(cmp, event, helper) {
		var copidInput = cmp.find('input_text').get('v.value');
        console.log('copidInput',copidInput);
        helper.copyTheText(cmp,event,copidInput);
	}
})