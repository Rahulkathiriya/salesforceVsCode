({
    init: function(cmp, event, helper) 
        { 
            
            var operationList =[
                { 
                    'label':'equals',
                    'value':'='
                },
                { 
                    'label':'not equal to',
                    'value':'!='
                },
                { 
                    'label':'less than',
                    'value':'<'
                },
                { 
                    'label':'greater than',
                    'value':'>'
                },
                { 
                    'label':'less or equal',
                    'value':'<='
                },
                { 
                    'label':'contain',
                    'value':'contain'
                },
                { 
                    'label':'does not contain',
                    'value':'not_contain'
                },
                { 
                    'label':'start with',
                    'value':'start_with'
                },
                { 
                    'label':'end with',
                    'value':'end_with'
                }
            ] 
            cmp.set('v.ListOperator',operationList); 
            helper.handleSFFields(cmp, event, helper );    
        },
    handleSFFields : function(cmp, event, helper)   
    {
        var pagesize =cmp.find('idPageSize').get('v.value');   
        var intKey=cmp.get("v.intKey");     
        var SFFieldsValue= cmp.find('lcSF').get('v.value'); 
        
        
        var SFFields= cmp.get("v.SFFields");
        var index = SFFields.findIndex(p => p.value === SFFieldsValue);
        var  field_type =SFFields[index].datatype;  
        cmp.set('v.flt_field_datatype', field_type); 
        cmp.set('v.isLoading', true);
        if(SFFieldsValue=='')
        {
            cmp.set('v.SFfieldswithout__c','Name');
            
        }
        else
        { 
            
            var iscustomfld=SFFieldsValue.includes('__c');
            if(iscustomfld==true)
            {   
                cmp.set('v.SFfieldswithout__c',SFFieldsValue.replace("__c", ""));
                
            }
            else
            {  
                cmp.set('v.SFfieldswithout__c',SFFieldsValue);
            } 
            
        }
        
    },
    get_filter: function(cmp, event, helper){
        var pagesize =cmp.find('idPageSize').get('v.value'); 
        var intKey=cmp.get("v.intKey"); 
        var filter_query = '';
        var query_list = cmp.get("v.query_list");
        
        for(var a in query_list){
            
            var SFFieldsValue = query_list[a].field;
            var operation=query_list[a].operator;
            var filter_value=query_list[a].value
            var field_type=query_list[a].datatype
            var temp_query ='';
            if(operation == 'contain')
            {
                temp_query= ' and '+SFFieldsValue +' like '+"'%"+filter_value+"%'";
                
            }
            else if(operation == 'not_contain')
            {
                temp_query= ' and (not '+SFFieldsValue +' like '+"'%"+filter_value+"%' )";
                
            }
                else if(operation == 'start_with')
                {
                    temp_query= ' and '+SFFieldsValue +' like '+"'"+filter_value+"%'";
                    
                }
                    else if(operation == 'end_with')
                    {
                        temp_query= ' and '+SFFieldsValue +' like '+"'%"+filter_value+"'";
                        
                    }
                        else
                        {
                            temp_query= ' and '+SFFieldsValue +' '+operation+' '+"'"+filter_value+"'";
                            
                        }
            
            if(field_type=='DATETIME')
            {
                temp_query = temp_query.replaceAll("'", " ");
                
                filter_query = filter_query + ' '+temp_query;
            }
            else
            {
                filter_query = filter_query + ' '+temp_query;
            }
            
        }
        cmp.set('v.filter_query', filter_query );
        if(filter_query == '' || filter_query ==null || filter_query == undefined){
            CommonFunction.showerror('','Please add Filter First');   
        } 
        helper.getAccounts(cmp, event,intKey,pagesize);
    },
    
    add_filter: function(cmp, event, helper){
        var filter_query = '';
        
        var SFFieldsValue= cmp.find('lcSF').get('v.value');
        var operation= cmp.find('Operator').get('v.value'); 
        var filter_value= cmp.find('filter_value').get('v.value');
        var query_list = cmp.get("v.query_list"); 
        var ListOperator= cmp.get("v.ListOperator");
        var index = ListOperator.findIndex(p => p.value === operation);
        var  operation_label =ListOperator[index].label; 
        
        var SFFields= cmp.get("v.SFFields");
        var index = SFFields.findIndex(p => p.value === SFFieldsValue);
        var  field_type =SFFields[index].datatype;
        query_list.push(
            {
                'field':SFFieldsValue,
                'operator':operation,
                'value':filter_value,
                'operation_label':operation_label,
                'datatype':field_type
            })
        
        cmp.set('v.query_list', query_list );        
       cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','=');
        cmp.set('v.flt_field_datatype','text');  
    },
    
    remove_filter: function(cmp, event, helper){
        
        var index = event.currentTarget.dataset.index;
        //alert('index'+index);
        
        var query_list = cmp.get("v.query_list");
        query_list.splice(index, 1);
        cmp.set("v.query_list",query_list); 
        
        var edit_index  = cmp.get("v.edit_filterindex"); 
        if(edit_index!=undefined || edit_index!='undefined')
        { 
            if( edit_index == index)
            {
                cmp.find('filter_value').set('v.value','');
                cmp.find('lcSF').set('v.value','Name');
                cmp.find('Operator').set('v.value','='); 
                cmp.set('v.flt_field_datatype','text'); 
                cmp.set('v.edit_filter',false);   
                cmp.set('v.edit_filterindex',undefined);
            }
            
        }
        
    },
    clear_filter: function(cmp, event, helper){ 
       cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','='); 
        cmp.set('v.flt_field_datatype','text'); 
        cmp.set('v.edit_filter',false);   
        console.log('edit_filterindex--->',edit_filterindex);
        cmp.set('v.edit_filterindex',undefined);
    },
    Remove_All: function(cmp, event, helper){ 
       cmp.set("v.query_list",[]);
       cmp.set("v.filter_query", '');
        cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','='); 
            console.log('flt_field_datatype--->',flt_field_datatype);
        cmp.set('v.flt_field_datatype','text');  
        
    },
    open_filter: function(cmp, event, helper){
        var index = event.currentTarget.dataset.index;  
       var query_list = cmp.get("v.query_list"); 
        cmp.find('lcSF').set('v.value',query_list[index].field); 
        cmp.find('Operator').set('v.value', query_list[index].operator );
        cmp.find('filter_value').set('v.value',query_list[index].value);
         var  field_type =query_list[index].datatype;  
        cmp.set('v.flt_field_datatype', field_type);
        cmp.set('v.edit_filter',true);  
        cmp.set('v.edit_filterindex',index);  
         
        cmp.find('filterrr').scrollTo('Top',0,0);
        
},
    edit_filter: function(cmp, event, helper){ 
        
        var edit_index  = cmp.get("v.edit_filterindex");
        if(edit_index!=undefined || edit_index!='undefined')
        {
            var SFFieldsValue= cmp.find('lcSF').get('v.value');
            var operation= cmp.find('Operator').get('v.value'); 
            var filter_value= cmp.find('filter_value').get('v.value');     
            var query_list = cmp.get("v.query_list"); 
            
            query_list[edit_index].field = SFFieldsValue ;
            query_list[edit_index].operator  = operation ;
            query_list[edit_index].value  = filter_value
            
            
            var ListOperator= cmp.get("v.ListOperator");
            var index = ListOperator.findIndex(p => p.value === operation);
            var  operation_label =ListOperator[index].label; 
            
            query_list[edit_index].operation_label = operation_label;
            
            
            cmp.set("v.query_list",query_list); 
            
        }
        cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','='); 
        cmp.set('v.flt_field_datatype','text');      
        cmp.set('v.edit_filter',false);  
        cmp.set('v.edit_filterindex',undefined);  
    }
    
});