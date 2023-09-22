({
	 handleSFFields:function(cmp, event, helper )
   {
       
       var action = cmp.get('c.getObjectFields');
      	action.setParams({
            
           objName: 'Account' 
       });
            action.setCallback(this, function(response)
            {
                var lstSFField = [];
                console.log(lstSFField,'lstSFField');
                var fieldMap = response.getReturnValue(); 
                     if (fieldMap != undefined && fieldMap !=null) 
                         console.log('nottt')
                { 
                    for (var k in fieldMap)
                    {
                            lstSFField.push
                            ({
                                'Id':k,
                                'label':k,
                                'value':fieldMap[k][0], 
                                'datatype': fieldMap[k][1],
                                selected: true 
                            });
                                  
                    }
                    cmp.set('v.SFFields',lstSFField); 
                }
       });
      $A.enqueueAction(action);
            },        
})