({
    abc: function(cmp,event,helper){
        var actions = [
            {label: 'edit', name:'edit'},
            {label:'delete', name:'delete'}
        ];
        
        cmp.set('v.COLUMNS', [
            {label: 'Account Name' , fieldName : 'linkName' , type: 'url', editable:'true', sortable: true, typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}}, 
            { label: 'Industry', fieldName: 'Industry', type: 'text' ,editable:'true', sortable: true },
            { label: 'Phone', fieldName: 'Phone', type: 'text' ,editable:'true', sortable: true },
            { label: 'Website', fieldName: 'Website', type: 'text' ,editable:'true', sortable: true },
            {type:  'action', typeAttributes: { rowActions: actions } }
            
        ]);  
        var selectedField = cmp.get('v.selectedField');
        //   console.log('selectedField--->',selectedField);
        cmp.set('v.StringValue',true);
        
        var selectedOprater = cmp.get('v.selectedOprater');
        //  console.log('selectedOprater--->',selectedOprater);
        cmp.set('v.selectedOprater',selectedOprater);
        
        helper.fetchData(cmp,event,helper);
        helper.allFieldName(cmp,event,helper);
        helper.allListView(cmp,event,helper);
    },
    
    handlerSave : function(cmp,event,helper){
        
        var dValue = event.getParam('draftValues');   //event through get dreaftvalue 
        var action= cmp.get("c.GetDraftValueUpdate");
        
        action.setParams({
            'a1' : dValue
        });
        
        action.setCallback(this, function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                $A.get('e.force:refreshView').fire();
            }  
        });
        $A.enqueueAction(action);
    },
    
    handlerRowAction : function(cmp,event,helper){
        
        
        var act = event.getParam('action');
        var row = event.getParam('row').Id;
        if(act.name == 'edit'){
            cmp.set("v.editable",true); 
            cmp.set("v.edit",row); 
        } 
        if(act.name == 'delete'){
            cmp.set("v.deletable",true); 
            cmp.set("v.delete",row); 
        } 
    },
    handleSubmit : function(cmp,event,helper){
        $A.get('e.force:refreshView').fire();  
        cmp.set("v.editable",false); 
    },
    handlerdelete : function(cmp,event,helper){
        var dId = cmp.get("v.delete");
        var action = cmp.get("c.getIdDeleteRec");
        action.setParams({
            'deletId' : dId
        });
        action.setCallback(this,function(response){
            if(response.getState()  == 'SUCCESS'){
                $A.get('e.force:refreshView').fire(); 
            }
        });
        $A.enqueueAction(action);
    },
    handlerCancel : function(cmp,event,helper){
        cmp.set("v.deletable",false);  
    },
    handleredCancel : function(cmp,event,helper){
        cmp.set("v.editable",false); 
    },
    handlerSort : function(cmp,event,helper){
        helper.handleSort1(cmp, event);
        
    },
    handlerSearch : function(cmp,event,helper){   // filter method
        helper.getAccRecord(cmp,event,helper);  
    },
    
    handlerFilter : function(cmp,event,helper){
       cmp.set("v.OpenFilter",open);
    },
    closeFilter : function(cmp,event,helper){
        cmp.set("v.OpenFilter",false);
           cmp.set("v.AddFilterOpen",false);
        
    },
    handlerFieldChange :function(cmp,event,helper){
        var selectedField = cmp.find("filedId").get('v.value');    // lightning select ui option select id and get value
        var typeget = cmp.get("v.F_fields");
        var filterType = '';
        var filterValue = typeget.find(item => {
            if(item.value == selectedField){
            filterType = item.type;
        }                               
       });  
        if(filterType == 'PICKLIST'){
            cmp.set('v.pickListValue',true);
            cmp.set('v.StringValue',false);
            cmp.set('v.DoubleValue',false);
            cmp.set('v.DateValue',false);
            cmp.set('v.PicApiValue',selectedField);
            //   console.log('PicApiValue--->',cmp.get('v.PicApiValue'));
            
        }else if(filterType == 'STRING' || filterType == 'TEXTAREA' ){
            
            cmp.set('v.StringValue',true);
            cmp.set('v.pickListValue',false); 
            cmp.set('v.DoubleValue',false);
            cmp.set('v.DateValue',false);
        }else if(filterType == 'DOUBLE'){
            cmp.set('v.DoubleValue',true);
            cmp.set('v.DateValue',false);
            cmp.set('v.StringValue',false);
            cmp.set('v.pickListValue',false);  
        }else if( filterType == 'DATE' ){
            cmp.set('v.DateValue',true);
            cmp.set('v.StringValue',false);
            cmp.set('v.pickListValue',false); 
            cmp.set('v.DoubleValue',false);
        }
        cmp.set('v.filterType',filterType);
        cmp.set('v.inputValue',null);
          cmp.set('v.DateApiValue',null);
        cmp.set("v.selectedField",selectedField);
        
        helper.GetPicklist(cmp,event,helper); 
    },
    handlerOpratorChange :function(cmp,event,helper){
        var OpraterValue = cmp.find("opratorId").get('v.value');
        if( OpraterValue == 'lessorequal'){
            OpraterValue  = '<='; 
        }else if( OpraterValue == 'lessthan'){
            OpraterValue = '<';
        }
        cmp.set('v.OpraterValue',OpraterValue);
    },
    
    handlerApplyFilter :function(cmp,event,helper){
        
        var selectedField = cmp.get('v.selectedField');
        var selectedOprater = cmp.get('v.selectedOprater');
        var selectedPicValue = cmp.get('v.selectedPicValue');
        
        var DateApiValue = cmp.get('v.DateApiValue');
        
        var inputValue = cmp.get('v.inputValue');
        if(DateApiValue != 'null'){
	inputValue = DateApiValue;
        }else if(selectedPicValue != 'null'){
inputValue = selectedPicValue;
        }
        
        if(inputValue == undefined || inputValue == null ){
            inputValue = '';
        }
        //   console.log('inputValfghghfghgfhue---->',inputValue); 
        
        var action = cmp.get("c.filteredTable");
        action.setParams({
            'selectedField' : selectedField,
            'selectedOprater' : selectedOprater,
            'inputValue' : inputValue,
            'selectedPicValue' : selectedPicValue,
            'Alldate' : DateApiValue
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                var ret = response.getReturnValue();
                ret.forEach(function(record){
                    record.linkName ='/'+record.Id;
                });
                cmp.set('v.DATA',ret);
            } 
        });
        $A.enqueueAction(action);
    },
    
    handlerListView :function(cmp,event,helper){
        var ListView  = cmp.find("ListViewId").get('v.value');
        
    },
    handlernewList : function(cmp,event,helper){
   
        cmp.set('v.newBattonPopup',true);
    },
    handlerListViewClose  : function(cmp,event,helper){
        cmp.set('v.newBattonPopup',false);
    },
    handlerListNameBlue : function(cmp,event,helper){
         var getvalue = cmp.find("ListNameId").get('v.value');       
        var action =cmp.get("c.WhiteSpacetoUnderscore");
        action.setParams({
            'getvalue': getvalue
        });
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                cmp.set('v.ListViewNameApiValue',r.getReturnValue());
            }
        });
        $A.enqueueAction(action);
       
    },
    handlerListViewSave : function(cmp,event,helper){
     var getListName = cmp.get('v.ListViewNameValue');
       
         var getListApiName = cmp.get('v.ListViewNameApiValue');
        
        var action = cmp.get("c.getDataListview");
        action.setParams({
            'getListName' :getListName,
            'getListApiName' : getListApiName
			});
    },
    handlerAddFilter : function(cmp,event,helper){
         cmp.set("v.AddFilterOpen",true); 
    },
    handlerRemoveAll : function(cmp,event,helper){
         cmp.set("v.AddFilterOpen",false);
    },
    handlerFilterLogic : function(cmp,event,helper){
         cmp.set("v.filterLogic",true); 
    },
    handlerInfo : function(cmp,event,helper){
         cmp.set("v.infoValue",fgfghfghfgh); 
    },
    handlerInfoRemove : function(cmp,event,helper){
         cmp.set("v.filterLogic",false); 
    },
    handlerRefreshPage : function(cmp,event,helper){
    
         $A.get('e.force:refreshView').fire(); 
    }
})