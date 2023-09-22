({ 
    handleSFFields:function(cmp, event, helper  )
    {
        var action = cmp.get('c.getObjectFields');
        action.setParams({
            objName: 'Account' 
        });
        
        action.setCallback(this, function(response){
            var lstSFField = [];
            var fieldMap = response.getReturnValue(); 
            
            if (fieldMap != undefined && fieldMap !=null) { 
                for (var k in fieldMap){
                    if(k == 'Account Name') {
                        lstSFField.push({
                            'Id':k,
                            'label':k,
                            'value':fieldMap[k][0], 
                            'datatype': fieldMap[k][1],
                            selected: true 
                        });
                    }
                    cmp.set('v.SFFields',lstSFField);          
                }
            }
        });
        $A.enqueueAction(action);  
    },
})