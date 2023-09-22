({
    submitHandler : function(cmp,event,helper){
        event.preventDefault();
        const field1 = event.getParam('fields');
        field1.LastName = 'my custom lastname ';
		cmp.find('myRecordForm').submit('field1');
    }
})