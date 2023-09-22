({
    doInit : function(cmp, event, helper) {

        
        var actionButton = [
            {label:'Edit', name:'Edit'},
            {label:'Delete', name:'Delete'}
        ];
        cmp.set('v.COLUMNS',[
            {label:"Contact", fieldName : "linkName", editable:"true", sortable: true, type:'url', typeAttributes :{label:{fieldName: 'Name'}}},
            {label:"LastName", fieldName : "LastName", editable:"true",sortable: true} ,
            {label:"Phone", fieldName : "Phone", editable:"true",sortable: true} ,
            {label:"LeadSource", fieldName : "LeadSource", editable:"true",sortable: true},
            {type :'action', typeAttributes :{rowActions : actionButton} }
        ]);
        helper.helperInit(cmp,event,helper);
        helper.FilterAllData(cmp,event,helper);
        //default select value
        var selectedField = cmp.get('v.selectedField');
        cmp.set('v.StringOprator',true);
        var selectedOpratorValue = cmp.get('v.selectedOpratorValue');
        
    },
    handlerRowAction: function(cmp,event,helper){
        var GetId = event.getParam('action');
        var rowId = event.getParam('row').Id;
        if(GetId.name == 'Edit'){
            cmp.set('v.editButton',rowId);
            cmp.set("v.EditPopUp",true); 
        }
        if(GetId.name == 'Delete'){
            cmp.set('v.DeletePopUp',true);
            cmp.set('v.DeleteButton',rowId);
        }
    },
    handlerEditSubmit : function(cmp,event,helper){
        $A.get('e.force:refreshView').fire(); 
    },
    handlerdelete:function(cmp,event,helper){
        var DeleteId = cmp.get('v.DeleteButton');
        //  console.log('DeleteId',DeleteId);
        var action = cmp.get('c.DeleteRecord');
        action.setParams({
            'deleteId': DeleteId
        });
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                $A.get('e.force:refreshView').fire(); 
            } 
        });
        $A.enqueueAction(action);
    },
    handlerCancel: function(cmp,event,helper){
        cmp.set("v.EditPopUp",false); 
        cmp.set('v.DeletePopUp',false);
    },
    handlerSort : function(cmp,event,helper){
        helper.handleSort1(cmp, event);
    },
    handlerSearchFilter : function(cmp,event,helper){
        helper.handlerSearchFilter(cmp,event,helper);
    },
    handlerOprator: function (cmp, event,helper) {
        var selectedOpratorValue = event.getParam("value");
        
        if(selectedOpratorValue === 'equals'){
            selectedOpratorValue = '=';
        }else if(selectedOpratorValue === 'not equals to'){
            selectedOpratorValue = '!=';
        }else if(selectedOpratorValue === 'less than'){
            selectedOpratorValue = '<';
        }else if(selectedOpratorValue === 'greter than'){
            selectedOpratorValue = '>';
        }else if(selectedOpratorValue === 'less or equal'){
            selectedOpratorValue = '<=';
        }else if(selectedOpratorValue === 'greater or equal'){
            selectedOpratorValue = '>=';
        }else if(selectedOpratorValue === 'contains'){
            selectedOpratorValue = 'LIKE';
        }else if(selectedOpratorValue === 'does not contain'){
            selectedOpratorValue = 'NOT';
        }else if(selectedOpratorValue === 'Start With'){
            selectedOpratorValue = 'LIKE';
        }
        cmp.set('v.selectedOpratorValue',selectedOpratorValue); 
        // console.log('opraor',selectedOpratorValue);
    }, 
    handlerSelectField : function(cmp,event,helper){
        //    var selectedField = cmp.find("FilterSelectId").get('v.value');
        var selectedField = event.getParam('value');
        var DataType = cmp.get('v.AllFilterData');
        
        var filterDatatype = '';
        
        var filterValue =DataType.find(item =>{
            if(item.value ==  selectedField){
            filterDatatype  = item.type; 
        }
                                       });
        if(filterDatatype ==  'STRING' || filterDatatype ==  'TEXTAREA' ){
            cmp.set('v.StringOprator',true);  
            cmp.set('v.DoubleOprator',false); 
            cmp.set('v.DateOprator',false); 
            cmp.set('v.PicklistOprator',false); 
            
        }else if(filterDatatype ==  'DOUBLE'){
            cmp.set('v.DoubleOprator',true); 
            cmp.set('v.StringOprator',false); 
            cmp.set('v.DateOprator',false); 
            cmp.set('v.PicklistOprator',false);
            
        }else if(filterDatatype ==  'DATE'){
            cmp.set('v.DateOprator',true);
            cmp.set('v.DoubleOprator',false); 
            cmp.set('v.StringOprator',false); 
            cmp.set('v.PicklistOprator',false);
            
        }else if(filterDatatype ==  'PICKLIST'){
            cmp.set('v.PicklistOprator',true);
            cmp.set('v.DoubleOprator',false); 
            cmp.set('v.StringOprator',false); 
            cmp.set('v.DateOprator',false); 
            cmp.set('v.PicklistApiValue',selectedField);
        }
        cmp.set('v.selectedField',selectedField);
        cmp.set('v.FilterInputValue',null);
        cmp.set('v.FilterDateInputValue',null);
        helper.GetPickListValue(cmp,event,helper);
    },
    handlerPickListValue : function(cmp,event,helper){
        var getPicValue = event.getParam('value');
        cmp.set('v.FilterInputValue',getPicValue);
    },
    handlerApplyFilter: function(cmp,event,helper){
        var selectedField = cmp.get('v.selectedField');
        var selectedOpratorValue = cmp.get('v.selectedOpratorValue');
        var FilterInputValue = cmp.get('v.FilterInputValue');
        var FilterDateInputValue = cmp.get('v.FilterDateInputValue');
        if(FilterInputValue == undefined || FilterInputValue == null ){
            FilterInputValue = '';
        }
        if(FilterDateInputValue == undefined || FilterDateInputValue == null ){
            FilterDateInputValue = '';
        }
        var action = cmp.get('c.ApplyFilterData');
        action.setParams({
            'selectedField' : selectedField,
            'selectedOpratorValue' : selectedOpratorValue,
            'FilterInputValue' : FilterInputValue,
            'FilterDateInputValue' : FilterDateInputValue
        });
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                var ret = r.getReturnValue();
                console.log('ret------------>',ret);
                ret.forEach(function(record){
                    record.linkName ='/'+record.Id;
                });
                cmp.set('v.DATA',ret);
            }
        });
        $A.enqueueAction(action);
        cmp.set('v.filterSelectShow',true);
        
    },
    handlerFilter:function(cmp,event,helper){
        var filter =  cmp.get('v.FilterOpen');
        if(filter){
            cmp.set('v.FilterOpen',false);  
            $A.get('e.force:refreshView').fire();
        }else{
            cmp.set('v.FilterOpen',true);
            
        }
        
    },
    closeFilter:function(cmp,even,helper){
        cmp.set('v.FilterOpen',false);
        cmp.set('v.filterSelectShow',false); 
        $A.get('e.force:refreshView').fire();
    },
    handlerAddFilter : function(cmp,event,helper){
        cmp.set('v.addFilter',true);
    },
    handlerAddFilterRemove:function(cmp,event,helper){
        cmp.set('v.addFilter',false); 
        
    },
    handlerAddFilterLogic : function(cmp,event,helper){
        cmp.set('v.addFilterLogic',true);
    },
    handlerLogicRemove : function(cmp,event,helper){
        cmp.set('v.addFilterLogic',false);
    },
    handlerConditionRemove:function(cmp,event,helper){
        cmp.set('v.addFilter',false);
        cmp.set('v.filterSelectShow',false); 
    },
    handlerSelectPage:function(cmp,event,helper){
        helper.totalPageCount(cmp,event,helper);
    },
    
    onFirst:function(cmp,event,helper){
        var pageNumber = cmp.set('v.currentPageNumber',1);
        helper.setDataPagination(cmp,event,helper); 
    },
    onPrev:function(cmp,event,helper){
        var pageNumber = cmp.get('v.currentPageNumber');
        cmp.set('v.currentPageNumber',pageNumber-1);
        helper.setDataPagination(cmp,event,helper);
    },
    onNext:function(cmp,event,helper){
        var pageNumber = cmp.get('v.currentPageNumber');
        cmp.set('v.currentPageNumber',pageNumber+1);
        helper.setDataPagination(cmp,event,helper);
    },
    onLast:function(cmp,event,helper){
        cmp.set('v.currentPageNumber',cmp.get('v.totalPages'));
        helper.setDataPagination(cmp,event,helper);
    },
    
    
})