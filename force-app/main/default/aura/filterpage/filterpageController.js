({
    /* Add filter logic */
    
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
            
            console.log('dsg')
            helper.handleSFFields(cmp, event, helper );    
        },
    handleSFFields : function(cmp, event, helper)   
    {
        console.log('jghd');
        var pagesize =cmp.find('idPageSize').get('v.value');   
        console.log(pagesize , 'pagesize');
        var intKey=cmp.get("v.intKey");  
        console.log(intKey ,'intKey');
        var SFFieldsValue= cmp.find('lcSF').get('v.value'); 
        
        console.log(SFFieldsValue ,'SFFieldsValue');
        var SFFields= cmp.get("v.SFFields");
        console.log(SFFields,'SFFields');
        var index = SFFields.findIndex(p => p.value === SFFieldsValue);
        var  field_type =SFFields[index].datatype;  
        cmp.set('v.flt_field_datatype', field_type); 
        cmp.set('v.isLoading', true);
        if(SFFieldsValue=='')
        {
            cmp.set('v.SFfieldswithout__c','Name');
            console.log('SFFieldsValue');
        }
        else
        { 
            var iscustomfld=SFFieldsValue.includes('__c');
            if(iscustomfld==true)
            {   
                cmp.set('v.SFfieldswithout__c',SFFieldsValue.replace("__c", ""));
                console.log('dfsf');
            }
            else
            {  
                cmp.set('v.SFfieldswithout__c',SFFieldsValue);
                console.log('jghd');
            } 
            
        }
        
    },
    get_filter: function(cmp, event, helper){
        console.log('jfgd');
        var pagesize =cmp.find('idPageSize').get('v.value'); 
        console.log(pagesize , 'pagesize');
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
        console.log('djf');
        cmp.set('v.filter_query', filter_query );
        if(filter_query == '' || filter_query ==null || filter_query == undefined){
            CommonFunction.showerror('','Please add Filter First');   
        } 
        helper.getAccounts(cmp, event,intKey,pagesize);
    },
     add_filter: function(cmp, event, helper){
        console.log('dkfji');
        
        cmp.set('v.changeFilterValue', true);
         cmp.set('v.addfilterlogict',true);
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
        console.log('adddd')
        query_list.push(
            {
                'field':SFFieldsValue,
                'operator':operation,
                'value':filter_value,
                'operation_label':operation_label,
                'datatype':field_type
            })
        
        console.log('dfjf');
        cmp.set('v.query_list', query_list );
        cmp.set('v.selected',false);
        cmp.set('')
        console.log('check');
         
      	cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','=');
        cmp.set('v.flt_field_datatype','text');  
        
         
       
    },
     Add_filter: function(cmp, event, helper){
        console.log('dkfji');
       cmp.set('v.selected',true);        
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
        console.log('adddd');
         query_list.push('New Filter')
       /*  query_list.push(
            {
                'field':SFFieldsValue,
                'operator':operation,
                'value':filter_value,
                'operation_label':operation_label,
                'datatype':field_type
            })*/
        
        console.log('dfjf');
        cmp.set('v.query_list', query_list ); 
        console.log('check');
       
      	cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','=');
        cmp.set('v.flt_field_datatype','text');  
         
       /* var itemsToPass = component.get("v.allItems");
        var ItemToSent = []; //Items that will be sent to 
        
        //Go through items in the component
        for (var i=0; i< itemsToPass.length; i++)
        {
            var item = itemsToPass[i];
          
            //Push each account to the array.
            ItemToSent.push( {
                'field':SFFieldsValue,
                'operator':operation,
                'value':filter_value,
                'operation_label':operation_label,
                'datatype':field_type
            });
        } */
    },
    remove_filter: function(cmp, event, helper){
        
        var index = event.currentTarget.dataset.index;
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
                cmp.set('selected',false)
                cmp.set('v.edit_filterindex',undefined);
            }  
        }  
    },
    clear_filter: function(cmp, event, helper){ 
       cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','='); 
        console.log('jds');
        cmp.set('v.flt_field_datatype','text'); 
        cmp.set('v.edit_filter',false);   
        cmp.set('v.edit_filterindex',undefined);
    },
    Remove_All: function(cmp, event, helper){ 
       cmp.set("v.query_list",[]);
       cmp.set("v.filter_query", '');
        cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','='); 
        cmp.set('v.flt_field_datatype','text');  
        
    },
    open_filter: function(cmp, event, helper){
        cmp.set('v.selected',true);
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
        //cmp.set('v.query_list', query_list ); 
      },
    
    edit_filter: function(cmp, event, helper){ 
        console.log('djjhj');
    	cmp.set('v.addfilterlogictaa',true)
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
            
            console.log('dsh');
            cmp.set("v.query_list",query_list);  
        }
        cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','='); 
        cmp.set('v.flt_field_datatype','text');      
        cmp.set('v.edit_filter',false);  
        cmp.set('v.edit_filterindex',undefined);  
    },
     Remove:function(cmp, event, helper){ 
         console.log('enterrr')
           //cmp.set('v.Clear','');
        document.getElementById("textarea-id-01").value = "";
    },
    hide : function(component,event,helper){
        component.set('v.NewFilter','');
    },
    
   /* End Filter Logic */
    
    // Init function run on page load
    initFn: function (cmp, event, helper) {
		var objName = cmp.get('v.dbObjectName');
        if (objName) {
            const pageName = helper.getPageName(cmp);
            cmp.set("v.pageName", pageName);

            helper.setActiveView(cmp, event, helper);
            helper.initObjectFields(cmp, event, helper);
            helper.setFormFields(cmp, event, helper);
            // 
            var loadDate = new Date();
            cmp.set('v.loadTime', loadDate.getTime());
            $A.enqueueAction(cmp.get('c.calculateLoadTime'));
            // INTERVAL
            var timeInterval = window.setInterval(
                $A.getCallback(function() { $A.enqueueAction(cmp.get('c.calculateLoadTime')); })
            , 20000);
            cmp.set("v.setIntervalId", timeInterval);
    
            //helper.getMultiChoosenFields(cmp);
            
            // Set form title
            var pageType = cmp.get('v.pageType');
            var formTitle = 'Accounts';
            
            cmp.set('v.formTitle', formTitle);
            //
            cmp.set('v.filterByOwnerLabel', 'All ' + formTitle);
            cmp.set('v.filterByOwnerOptions', [{ label: ('All ' + formTitle + 's'), value: 'all' }, { label: ('My ' + formTitle + 's'), value: 'my' }]);
           
            if (objName == 'Account') {
                helper.getAllRecordList(cmp, event, helper)
                //helper.getUserListByRole(cmp, 'Medical Lead');
            	//helper.getUserListByRole(cmp, 'Activity Owner');
            }
        }
    },
    handleMedicalPlanChange: function (cmp, event, helper) {
        cmp.set('v.medicalObjectives', []);
        cmp.set('v.selectedMedicalObjective', '');
        cmp.set('v.isMeicalObjectiveDisabled', false)
        const medicalPlanId = event.getSource().get('v.value')
        if(medicalPlanId) helper.getMedicalObjectiveData(cmp, medicalPlanId);
    },
    handleDestroy: function(cmp, event, helper) {
        window.clearInterval(cmp.get("v.setIntervalId"));
    },
    calculateLoadTime: function (cmp, event, helper) {
        // var loadTime = $A.localizationService.formatDate(new Date(), "YYYY-MM-DD");
        let diffValue = '';
        var loadTime = cmp.get('v.loadTime');
        var currentTime = new Date().getTime();
        const diffSec = Math.round((currentTime - loadTime) / 1000);
        if (diffSec > 60) {
            const diffMins = Math.round(diffSec / 60);
            if (diffMins > 60) {
                const diffHour = Math.round(diffMins / 60);
                if (diffHour > 24) {
                    // const diffDays = Math.round(diffHour / 24);
                    diffValue = 'a days ago';
                } else {
                    diffValue = (diffHour == 1) ? 'a hour ago' : (diffHour + ' hours ago');
                }
            } else {
                diffValue = (diffMins == 1) ? 'a min ago' : (diffMins + ' mins ago');
            }
        } else {
            diffValue = 'a few seconds ago';
        }
        cmp.set('v.updatedTime', diffValue);
        return diffValue;
    },
    //
    // Search
    keyPressController: function(cmp, event, helper) {
        var activeView = cmp.get('v.activeView');
        cmp.set("v.currentPage", 1)
        if(activeView != 'kanbanBoard') helper.fetchData(cmp, event, helper);
    },
    handleListControls: function (cmp, event, helper) {
        var selectedSettingValue = event.getParam("value");
        var viewMenuItems = cmp.find("settingItems");
        if (selectedSettingValue === 'settingReset') {
            helper.resetLocalStorage();
            helper.initObjectFields(cmp, event, helper);
        } else if (selectedSettingValue === 'settingFilter') {
            cmp.set('v.showFilter', true);
        } else if (selectedSettingValue === 'settingFields') {
            cmp.set('v.selectVisibleFieldModel', true);
        }
    },
    handleDisplayAs: function (cmp, event, helper) {
        const name = helper.getKanbanFieldName(cmp, event, helper);
        var selectedMenuItemValue = event.getParam("value");
        cmp.set('v.activeView', selectedMenuItemValue);
        localStorage.setItem(name + '_activeView', selectedMenuItemValue);
        if (selectedMenuItemValue == 'listView') {
            cmp.set('v.activeViewIcon', 'utility:side_list')
        } else {
            cmp.set('v.activeViewIcon', 'utility:table');
            cmp.set('v.isDataLoaded', false);
            helper.fetchData(cmp, event, helper);
        }
        //
        var loadDate = new Date();
        cmp.set('v.loadTime', loadDate.getTime());
        $A.enqueueAction(cmp.get('c.calculateLoadTime'));
    },
    // 
    handleFilterOwnerChange: function (cmp, event, helper) {
        console.log(cmp.get('v.filterByOwner'), 'Change');
    },
    showOwnerFilter: function (cmp, event, helper) {
        cmp.set('v.showFilterByOwner', true);
    },
    doneFilterOwner: function (cmp, event, helper) {
        if (cmp.get('v.filterByOwner') != cmp.get('v.filterByOwnerValue')) {
            cmp.set('v.changeFilterValue', true);
        } else {
            cmp.set('v.changeFilterValue', false);
        }
        cmp.set('v.showFilterByOwner', false);
    },
    cancelFilterChnage: function (cmp, event, helper) {
        cmp.set('v.changeFilterValue', false);
    },
    saveFilterChnage: function (cmp, event, helper) {
        const newValue = cmp.get('v.filterByOwner')
        if (newValue != cmp.get('v.filterByOwnerValue')) {
            const value = cmp.get('v.filterByOwnerLabel')
            const activeView = cmp.get('v.activeView');
            if (newValue == 'my') {
                cmp.set('v.filterByOwnerLabel', value.replace('All', 'My'));
            } else {
                cmp.set('v.filterByOwnerLabel', value.replace('My', 'All'));
            } 
            cmp.set('v.filterByOwnerValue', newValue)
            // Call Fetch Function
            if(activeView != 'kanbanBoard') helper.fetchData(cmp, event, helper);
        }
        cmp.set('v.changeFilterValue', false);
        console.log('save add filter');
    	cmp.set('v.addfilterlogictaa',false)
        var edit_index  = cmp.get("v.edit_filterindex");
       // if(edit_index!=undefined || edit_index!='undefined')
        //{
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
            
            console.log('dsh');
            cmp.set("v.query_list",query_list); 
            
       // }
        cmp.find('filter_value').set('v.value','');
        cmp.find('lcSF').set('v.value','Name');
        cmp.find('Operator').set('v.value','='); 
        cmp.set('v.flt_field_datatype','text');      
        cmp.set('v.edit_filter',false);  
        cmp.set('v.edit_filterindex',undefined);
        
    },
    //
    // Table actions
    doSelectRecord: function(cmp, event, helper) {
        const selectedRow = JSON.parse(JSON.stringify(event.getParam('selectedRows')))
        cmp.set('v.selectedRowCount', selectedRow.length)
        if (selectedRow.length > 0) {
        }
    },
    handleRowAction: function(cmp, event, helper) {
        var objName = cmp.get('v.dbObjectName');
        var action = event.getParam('action')
        var row = event.getParam('row')
        //var data = cmp.get('v.data');
        //var index = data.indexOf(row);
        //var obj = JSON.parse(JSON.stringify(data[index]))
       	var obj = JSON.parse(JSON.stringify(row))
        cmp.set("v.recordId", obj.Id)
        helper.resetFormFields(cmp, event, helper)
        switch(action.name) {
            case 'edit' :
                //if (obj.Id) helper.fetchMultiSelectedObjectList(cmp, event, helper);
                if (obj && obj.Id && objName && (objName == 'Account')) {
                    console.log('obj data', obj)
                    //if(obj.Cue_Medical_Lead__c) cmp.set("v.selectedMedicalLead", obj.Cue_Medical_Lead__c)
                    //if(obj.Cue_Activity_Lead__c) cmp.set("v.selectedActivityLead", obj.Cue_Activity_Lead__c)
                   
                    if(obj.Cue_MedicalPlanId__c) {
                        cmp.set('v.isMeicalObjectiveDisabled', false)
                        cmp.set("v.selectedMedicalPlan", obj.Name)
                        helper.getMedicalObjectiveData(cmp, obj.Name);
                        if(obj.Cue_MedicalObjectiveId__c) cmp.set("v.selectedMedicalObjective", obj.Cue_MedicalObjectiveId__c)
                    } 
                    helper.getAllRecordList(cmp, event, helper)
                    //helper.getUserListByRole(cmp, 'Medical Lead');
            		//helper.getUserListByRole(cmp, 'Activity Owner');
                    helper.getRecordDetail(cmp, helper, objName, 'Type')
                }
                cmp.set('v.isFormFieldLoading', true);
                cmp.set("v.isAddEdit", true);
                cmp.set("v.addEditModal", true);
                break;
            case 'view' :
                if (obj && obj.Id && objName && (objName == 'Account')) helper.getRecordDetail(cmp, helper, objName, 'Type')
                cmp.set('v.isFormFieldLoading', true);
                cmp.set("v.addEditModal", true);
                cmp.set("v.isAddEdit", false);
                cmp.set("v.currentData", row)
                break;
            case 'delete' :
                //helper.sendEmailHelper(cmp, event, helper)
                cmp.set("v.deleteModal", true);
         		//data.splice(index, 1);
                //cmp.set('v.data', data);
                break;
            case 'detail' :
                var navService = cmp.find("navService");
                var pageReference = {
                   "type": "standard__recordPage",
                   "attributes": {
                       "recordId": obj.Id,
                       "objectApiName": objName,
                       "actionName": "view"
                   }
                }
                navService.navigate(pageReference);
                break;
        }
    },
    submitModalForm: function(cmp, event, helper) {
        document.getElementById('btnUpdateForm').click();
    },
    handleEdit: function(cmp, event, helper) {
        event.preventDefault(); // Stop default event
        // cmp.set("v.isOpen", false);
        cmp.set("v.isDisabled", true);
        var objName = cmp.get('v.dbObjectName');
        helper.editRecord(cmp, event, helper);
    },
    handleDelete: function(cmp, event, helper) {
        event.preventDefault(); //Stop default event
        var row = event.getParam('row');
        //cmp.set("v.isOpen", false);
        helper.deleteRecord(cmp, event, helper);
    },
    handleSort : function(cmp, event, helper){
        helper.sortData(cmp, event, helper);
    },
    storeColumnWidths: function (cmp, event, helper) {
        helper.storeColumnWidths(event.getParam('columnWidths'));
    },
    refreshRecordList: function (cmp, event, helper) {
        var activeView = cmp.get('v.activeView');
        cmp.set('v.searchKeyWord', '');
        cmp.set('v.sortBy', 'Name');
        cmp.set('v.sortByFieldLabel', 'Name');
        cmp.set('v.sortDirection', 'asc');
        cmp.set("v.currentPage", 1);

        cmp.set("v.isDataLoaded", false);
        helper.fetchData(cmp, event, helper);
        //
        var loadDate = new Date();
        cmp.set('v.loadTime', loadDate.getTime());
        $A.enqueueAction(cmp.get('c.calculateLoadTime'));
    },
    toggleFilter: function (cmp, event, helper) {
        const value = cmp.get('v.showFilter');
        cmp.set('v.showFilter', !value);
    },
    selectVisibleField: function (cmp, event, helper) {
        var selectedOptionValue = event.getParam("value");
        selectedOptionValue = JSON.stringify(selectedOptionValue);
        cmp.set('v.selectedOptionValue', selectedOptionValue);
    },
    handleFormOnFieldLoad: function (cmp, event, helper) {
        cmp.set('v.isFormFieldLoading', false);
    },
    handleSelectionChange: function (cmp, event, helper) {
        var activeView = cmp.get('v.activeView');
        cmp.set("v.currentPage", 1);
        if(activeView != 'kanbanBoard') {
            cmp.set("v.isDataLoaded", false);
            helper.fetchData(cmp, event, helper);
        }
        //
        var loadDate = new Date();
        cmp.set('v.loadTime', loadDate.getTime());
        $A.enqueueAction(cmp.get('c.calculateLoadTime'));
    },
    //
    // Modal
    addEditModal: function(cmp, event, helper) {
		helper.resetFormFields(cmp, event, helper)
        cmp.set("v.recordId", event.getSource().get("v.value"))
        cmp.set("v.addEditModal", true);
        cmp.set("v.isAddEdit", true);
        cmp.set('v.isFormFieldLoading', true);
        cmp.set('v.isMeicalObjectiveDisabled', true);
        
    },
    closeModel: function(cmp, event, helper) {
        helper.resetFormFields(cmp, event, helper)
        cmp.set("v.selectVisibleFieldModel", false);
        cmp.set("v.addEditModal", false);
        cmp.set("v.deleteModal", false);
        cmp.set("v.isAddEdit", false);
        cmp.set('v.isSelectedRelationalField', false);
    },
    savedVisibleFields: function(cmp, event, helper) {
        var toastEvent = $A.get('e.force:showToast')
        const visibleFields = cmp.get('v.selectedOptionValue')
        const pageType = cmp.get('v.pageType')
        if (JSON.parse(visibleFields).length) {
            const objName = cmp.get("v.dbObjectName");
            localStorage.setItem(objName, visibleFields);
            helper.initObjectFields(cmp, event, helper);
            helper.fetchData(cmp, event, helper);
            cmp.set("v.selectVisibleFieldModel", false);
            toastEvent.setParams({
                'title': 'Success',
                'type': 'success',
                'mode': 'dismissible',
                'message': 'List view updated'
            });
            toastEvent.fire();
            cmp.set('v.isDataLoaded', false);
        } else {
            toastEvent.setParams({
                'title': 'Error',
                'type': 'error',
                'mode': 'dismissible',
                'message': 'Select at least one field to display.'
            });
            toastEvent.fire();
        }
    },
    handleFileChange: function(cmp, event, helper) {
        var files = event.getSource().get("v.files");
        var reader = new FileReader();
        reader.onloadend = function () {
            cmp.set("v.selectedImage", reader.result);
        };
        reader.readAsDataURL(files[0]);
    },
    //
    // Pagination
    onNext : function(cmp, event, helper) {        
        var pageNumber = cmp.get("v.currentPage");
        cmp.set("v.currentPage", pageNumber+1);
        
        helper.paginationFn(cmp, event, helper);
        helper.fetchData(cmp, event, helper);
    },
    onPrev : function(cmp, event, helper) {        
        var pageNumber = cmp.get("v.currentPage");
        cmp.set("v.currentPage", pageNumber-1);
        
        helper.paginationFn(cmp, event, helper);
        helper.fetchData(cmp, event, helper);
    },
    processMe : function(cmp, event, helper) {
        cmp.set("v.currentPage", parseInt(event.target.name));
        
        helper.paginationFn(cmp, event, helper);
        helper.fetchData(cmp, event, helper);
    },
    onFirst : function(cmp, event, helper) {
        cmp.set("v.currentPage", 1);
        helper.fetchData(cmp, event, helper);
    },
    onLast : function(cmp, event, helper) {
        cmp.set("v.currentPage", cmp.get("v.totalPages"));
        helper.paginationFn(cmp, event, helper);
        helper.fetchData(cmp, event, helper);
    },
    handlePagination : function(cmp, event, helper) {
        helper.handlePagination(cmp, event.getParam('total'));
    },
    //
    print : function(cmp, event, helper) {
        console.log('open print view') 
        
    },
    handleValueChange: function (cmp, event, helper) {
        const objName = cmp.get("v.dbObjectName");
        const Id = event.getSource().get('v.value')
        if (Id && (objName == 'Account')) helper.getMedicalActivityTypeData(cmp, Id);
        else {
          //  cmp.set('v.selectedGeography', '');
        }
    },
    
   
});