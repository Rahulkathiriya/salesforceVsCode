({
    /* Add filter Logic */
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
    
    getTableColumns: function(objName, cmp, helper) {
        try {
            var visibleFields = localStorage.getItem(objName)
            
            if (typeof visibleFields != 'string') {
                visibleFields = []
                localStorage.removeItem(objName);
            }
            
        	if (visibleFields && visibleFields.length) {
                return JSON.parse(visibleFields)
            } else if (objName == 'Account') {
                return ['Name','Type']
            } else return []
        } catch (err) {
            console.log(err, 'error');
        }
    },
    setActiveView: function(cmp, event, helper) {
    	var fieldName = helper.getKanbanFieldName(cmp, event, helper);;
        var activeView = localStorage.getItem(fieldName + '_activeView');
        var activeViewIcon = 'utility:table';
        cmp.set('v.activeView', activeView ? activeView : 'tableView');
    	cmp.set('v.activeViewIcon', activeViewIcon);
    },
    storeColumnWidths: function (widths) {
        localStorage.setItem('datatable-in-action', JSON.stringify(widths));
    },
    resetLocalStorage: function () {
        localStorage.setItem('datatable-in-action', null);
    },
    getColumnWidths: function () {
        var widths = localStorage.getItem('datatable-in-action');

        try {
            widths = JSON.parse(widths);
        } catch(e) {
            return [];
        }
        return Array.isArray(widths) ? widths : [];
    },
    resetColumnWidths: function (cmp, event, helper) {
        helper.resetLocalStorage()
        var columnList = cmp.get('v.columns');
        var columnsWidths = helper.getColumnWidths();
        columnList = columnList.map(function (col, index) {
            return Object.assign(col, { initialWidth: null });
        });
        cmp.set('v.columns', columnList);
    },
    getFormFieldList: function(cmp, helper, objName) {
        return [{ fieldName: 'Name', required: true }, { fieldName: 'Type', required: false } ]
    },
    getRowActions: function(cmp, row, doneCallback) {
        var actions = [
            { label: 'Detail', name: 'detail', iconName: 'action:description' },
            { label: 'Edit', name: 'edit', iconName: 'action:edit' },
            { label: 'View', name: 'view', iconName: 'action:preview' },
            { label: 'Delete', name: 'delete', iconName: 'action:delete' }
        ]
        setTimeout($A.getCallback(function () { doneCallback(actions); }), 200);
    },
    initObjectFields : function(component, event, helper) {
        const pageName = helper.getPageName(component);
        var columnsWidths = this.getColumnWidths();
        var pageType = component.get("v.pageType")
        // 
        const objName = component.get("v.dbObjectName");
        var tableActions = [
            { label: 'Detail', name: 'detail', iconName: 'action:description' },
            { label: 'Edit', name: 'edit', iconName: 'action:edit' },
            { label: 'View', name: 'view', iconName: 'action:preview' },
            { label: 'Delete', name: 'delete', iconName: 'action:delete' }
        ]
        //

        var actionGetFields = component.get('c.getObjectFields');
        actionGetFields.setParams({ objName });
        actionGetFields.setCallback(this, function(response){
            var iColumnList = [];
            var columnList = [];
            var fieldMap = response.getReturnValue();
            var indexedFileds = {};
            component.set('v.fieldList', fieldMap)                      
            const layoutColumns = helper.getTableColumns(objName, component, helper);  
            const availableFields = []  
            component.set('v.visibleFields', layoutColumns)
            component.set('v.selectedOptionValue', JSON.stringify(layoutColumns))
                                   
            for (var k in fieldMap) {
                const value = fieldMap[k];
                if (value.type === 'REFERENCE' || value.type === 'EMAIL' || value.type === 'PICKLIST' || value.type === 'DOUBLE' || value.type === 'BOOLEAN' || value.type === 'STRING' || value.type === 'PHONE' || value.type === 'URL' || value.type === 'INTEGER' || value.type === 'DATE' || value.type === 'DATETIME' || value.type === 'TEXTAREA') {
                    availableFields.push(value)            
                }
                
                if (value && layoutColumns && layoutColumns.indexOf(value.name) != -1) {              
                    const visibleFields = component.get('v.visibleFields');
                    const index = visibleFields.indexOf(value.name);    
                    indexedFileds[value.label] = index
                    if (value.type === 'REFERENCE') {
                    	if (value.name.includes('__')) {
                            const fieldName = value.name.replace('__c', '__r');
                        	iColumnList.splice(index, 0, {label: value.label, fieldName: fieldName, type: 'text', sortable: true });           
                        } else {
    						const fieldName = value.name.replace('Id', '');
    						iColumnList.splice(index, 0, {label: value.label, fieldName: fieldName, type: 'text', sortable: true });
						}
                    } else {
                        iColumnList.splice(index, 0, {label: value.label, fieldName: value.name, type: value.type.toLowerCase(), sortable: true });
                    }
                    
                }
            }
            
            for (var k in iColumnList) {
                const index = indexedFileds[iColumnList[k].label]
                columnList.splice(index, 0, iColumnList[k])
            }

            columnList.push({ label: '', type: "action", typeAttributes: { rowActions: tableActions } })

            if (columnsWidths.length === columnList.length) {
                columnList = columnList.map(function (col, index) {
                    return Object.assign(col, { initialWidth: columnsWidths[index] });
                });
            }
			
			//
			columnList = columnList.map(function (col, index) {
                if (col.fieldName == 'Name') { //  && objName == 'Account'
                    col.fieldName = 'NameUrl'
                    col.type = 'url'
                    col.typeAttributes = { label: { fieldName: 'NameLabel' } }
                }
                if(col.type == 'date') col.typeAttributes = { year: "numeric", month: "numeric", day: "numeric" }
                if(col.type == 'datetime') {
                    col.type = 'date'
                    col.typeAttributes = { year: "numeric", month: "numeric", day: "numeric", hour:"2-digit", minute:"2-digit", hour12:"true" }
                }
                return col
            });
			//
			
			component.set('v.availableFields', availableFields)
            component.set('v.columns', columnList);
			console.log('columnList', columnList)  
            
            //
            const activeView = component.get('v.activeView');
            helper.fetchData(component, event, helper);
        });
		
        $A.enqueueAction(actionGetFields); 
    },
    setFormFields: function(cmp, event, helper) {
        const objName = cmp.get("v.dbObjectName");
        const formFieldList = helper.getFormFieldList(cmp, helper, objName)
        cmp.set('v.isFormFieldLoaded', true);
        cmp.set('v.formFieldList', formFieldList);
    },
    resetFormFields: function(cmp, event, helper) {
        cmp.set("v.selectedMedicalObjective", '')
        cmp.set("v.selectedMedicalPlan", '')
        console.log('resetting done')
    },  
    flattenRecord: function(cmp, data) {
		const fieldList = cmp.get('v.populatedFields');
        const objName = cmp.get("v.dbObjectName");
        for (var field in fieldList) {
            for (var itemObj in data) {
                var fieldName = data[itemObj][fieldList[field]]
                if (typeof fieldName === 'object') {
                    if (fieldName && fieldName.Name) data[itemObj][fieldList[field]] = fieldName.Name
                }
            }
        }
        //
        return data;
    }, 
   /* getRecordList: function(cmp, helper, objName) {
        const pageName = helper.getPageName(cmp);
        var action = cmp.get('c.Cue_GetListData');
        action.setParams({ objName: objName, fields: 'Name' });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                if(data && data.length > 0) {
                    const dataList = []
                    data.forEach(item => { 
                        if(item && item.Id && item.Name) dataList.push({ label: item.Name, value: item.Id }) 
                	})
                }
            } 
        })
        $A.enqueueAction(action);
    }, */
	/*fetchData: function(cmp, event, helper) { 
        const pageName = helper.getPageName(cmp)
        const objName = cmp.get("v.dbObjectName");
        var getInputkeyWord = cmp.get("v.searchKeyWord");
		var action = cmp.get('c.Cue_FetchListRecords');
        const itemsPerPage = cmp.get("v.itemsPerPage")
        const pageType = cmp.get("v.pageType")
        const searchableFieldList = []
        // Populate id fields
        const queryFields = []
        const populatedFields = []
        const fieldMap = cmp.get('v.fieldList')
        const layoutColumns = helper.getTableColumns(objName, cmp, helper); 
        for (var k in fieldMap) {
            const value = fieldMap[k];
            if (value && layoutColumns && layoutColumns.indexOf(value.name) != -1) {
                if (value.type === 'REFERENCE') {
                    if (value.name.includes('__')) {
                        const fieldName = value.name.replace('__c', '__r');
                        queryFields.push(fieldName + '.Name')  
                        populatedFields.push(fieldName)
                        searchableFieldList.push(fieldName + '.Name')
                    } else {
                        const fieldName = value.name.replace('Id', '');
                        queryFields.push(fieldName + '.Name')
                        populatedFields.push(fieldName)
                        searchableFieldList.push(fieldName + '.Name')
                    } 
                } else {
                    queryFields.push(value.name)
                    populatedFields.push(value.name)
                    if (value.type != 'DATE' && value.type != 'DATETIME' && value.type != 'BOOLEAN' && value.type != 'PERCENT' && value.type != 'DOUBLE' && value.type != 'INTEGER') searchableFieldList.push(value.name)
                }
            }
        }
        
        cmp.set('v.populatedFields', populatedFields)
        console.log('getter field list', queryFields)
        if (queryFields.indexOf('Cue_MedicalObjectiveId__c') == -1) queryFields.push('Cue_MedicalObjectiveId__c')
        if (queryFields.indexOf('Cue_MedicalPlanId__c') == -1) queryFields.push('Cue_MedicalPlanId__c')
        //
        const parameter = {
            'collection': objName,
            'start': ((cmp.get("v.currentPage") * itemsPerPage) - itemsPerPage),
            'limit': itemsPerPage,
            'searchKeyWord': getInputkeyWord,
            'hList': queryFields.join(),
            'searchableFieldList': searchableFieldList.join(),
            'sortBy': cmp.get("v.sortBy"),
            'sortOrder': cmp.get("v.sortDirection"),
            'filterOwner': cmp.get("v.filterByOwner")
        }
        
        action.setParams({
            data: parameter
        });
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(state, response.getError(), 'STATE')
            if (state==="SUCCESS" || state==="DRAFT") {
                cmp.set("v.isDataLoaded", true);
                var responseValue = response.getReturnValue();
                var dataByType = [];
                var data = helper.flattenRecord(cmp, responseValue.recordList)
                data = data.map(function (col, index) {
                    if (col.Name) {
                        col.NameLabel = col.Name
                        col.NameUrl = '/' + col.Id
                    }
                    return col
                });
				
                cmp.set('v.data', data)
                if (responseValue.recordList.length) {
                    cmp.set('v.isRecordExists', true);
                    cmp.set('v.isRecordEmpty', false);
                } else {
                    cmp.set('v.isRecordEmpty', true);
                    cmp.set('v.isRecordExists', false);
                }
                
                //Pagination
                helper.handlePagination(cmp, responseValue.total ? responseValue.total : data.length)
                
                //Reset Table size on init
                helper.resetColumnWidths(cmp, event, helper);
                //
            }
        })
		$A.enqueueAction(action);
	}, */
    handlePagination: function (cmp, totalItems) {
        const total = totalItems ? totalItems : 0;
        const pageList = []
        const totalPages = Math.ceil(total/cmp.get("v.itemsPerPage"))
        const currentPage = cmp.get("v.currentPage");
        cmp.set('v.totalItems', total);
        cmp.set('v.totalPages', totalPages);
        
        if (currentPage < 10) {
            for (var i=1; i<=10; i++) {
                if (i <= totalPages) {
                    pageList.push(i)
                }
            }
            cmp.set('v.pageList', pageList)
        }   
    },
    paginationFn: function (cmp, event, helper) {
    	const currentPage = cmp.get("v.currentPage");
        const pageList = []
        const totalPages = cmp.get("v.totalPages")
        if (currentPage >= 10) {
            if (totalPages-4 < currentPage) {
                for (var i=totalPages-9; i<=totalPages; i++) {
                    pageList.push(i)
                }
            } else {
                for (var i=currentPage-5; i<=currentPage+4; i++) {
                    pageList.push(i)
                }
            }
            cmp.set('v.pageList', pageList)
        }
	},
        
    getAllRecordList: function(cmp, event, helper) {
      helper.getRecordList(cmp, helper, 'Contact','Name')
    },
      
    editRecord: function(cmp, event, helper) {
        console.log('edit record')
        const pageName = helper.getPageName(cmp)
        const id = cmp.get('v.recordId')
        var toastEvent = $A.get('e.force:showToast')
        const objName = cmp.get("v.dbObjectName")
        
        var data = JSON.parse(JSON.stringify(event.getParams('fields')));
        var editAction = cmp.get('c.Cue_Edit'+ objName.replace(/Cue_/g, "").replace(/_/g, ""));
        var listSelectedItems = JSON.parse(JSON.stringify(cmp.get("v.lstSelectedRecords")));
        
        if (data && data.fields) {
            if (id) data.fields.Id = id ? id : ''

            if (objName == 'Account') {
                //data.fields.Cue_Medical_Lead__c = cmp.get('v.selectedMedicalLead')
                //data.fields.Cue_Activity_Lead__c = cmp.get('v.selectedActivityLead')
                data.fields.Name = cmp.get('v.selectedMedicalPlan')
                data.fields.Type = cmp.get('v.selectedMedicalObjective')
                console.log('values',data)
              
            }
          
            
            editAction.setParams({
                data: [data.fields],
                objName: objName
               //fieldList: helper.getFormFieldList(objName)
            })
            editAction.setCallback(this, function (response) {
                cmp.set("v.isDisabled", false)
                var state = response.getState();
                if (state === "SUCCESS") {
                    var dataMap = response.getReturnValue();
                    if(dataMap.status === 'success') {
                        var activeView = cmp.get('v.activeView');
                        toastEvent.setParams({ 'title': 'Success!', 'type': 'success', 'mode': 'dismissible','message': cmp.get('v.formTitle') + ' Saved' });
                        toastEvent.fire();
                        if (dataMap && dataMap.recordId) {
                            var navService = cmp.find("navService");
                            var pageReference = {    
                                "type": "standard__recordPage",
                                "attributes": {
                                    "recordId": dataMap.recordId,
                                    "objectApiName": objName,
                                    "actionName": "view"
                                }
                            }
                            navService.navigate(pageReference);
                        } 
                        helper.reloadData(cmp, event, helper);
                    } else if (dataMap.status === 'error'){ 
                        toastEvent.setParams({ 'title': 'Error!', 'type': 'error', 'mode': 'dismissible', 'message': dataMap.message });
                        toastEvent.fire();
                    } 
                }
            })
        }
        $A.enqueueAction(editAction); 
    },
    deleteRecord: function(cmp, event, helper) {
        const id = cmp.get('v.recordId')
        var toastEvent = $A.get('e.force:showToast')
        var deleteAction = cmp.get('c.Cue_DeleteRecord');
        deleteAction.setParams({ id: id, objName: cmp.get("v.dbObjectName") })
        deleteAction.setCallback(this, function (response) {
            cmp.set("v.deleteModal", false);
            var state = response.getState();
            if (state === "SUCCESS") {
                var dataMap = response.getReturnValue();
                if(dataMap.status === 'success') {
                    var activeView = cmp.get('v.activeView');
                    toastEvent.setParams({ 'title': 'Success!', 'type': 'success', 'mode': 'dismissible', 'message': cmp.get('v.formTitle') + ' Deleted' });
                    toastEvent.fire();
                    // 
                    helper.reloadData(cmp, event, helper);
                } else if (dataMap.status === 'error'){
                    toastEvent.setParams({ 'title': 'Error!', 'type': 'error', 'mode': 'dismissible', 'message': dataMap.message });
                    toastEvent.fire();
                }
            } else {
                alert('Error in getting data')
            }
        })
        $A.enqueueAction(deleteAction); 
    },
    sortData : function(cmp, event, helper){
        var objName = cmp.get('v.dbObjectName');
        var sortBy = event.getParam("fieldName");
        sortBy = sortBy.replace('__r', '__c');
        sortBy = sortBy.replace('NameUrl', 'Name');
        cmp.set('v.sortByFieldLabel', sortBy.replace('__c', '').replace('_', ' '));
        var sortDirection = cmp.get("v.sortDirection");
        cmp.set("v.sortBy", sortBy);
        sortDirection = sortDirection == 'asc' ? 'desc' : 'asc'
        cmp.set("v.sortDirection", sortDirection);
        helper.fetchData(cmp, event, helper);
    },
    reloadData: function (cmp, event, helper) {
        // CLOSE MODAL
        cmp.set("v.selectVisibleFieldModel", false);
        cmp.set("v.addEditModal", false);
        cmp.set("v.deleteModal", false);
        cmp.set("v.isAddEdit", false);
        cmp.set('v.isSelectedRelationalField', false);
        cmp.set("v.selectedImage", '');
        cmp.set("v.selectedMedicalLead", '');
        cmp.set("v.selectedActivityLead", '');
        // RELOAD DATA
        const activeView = cmp.get('v.activeView');
        helper.fetchData(cmp, event, helper);
    },
    getPageName: function (cmp) {
        const path = window.location && window.location.pathname
        if(path) {
            const pageName = path.slice((path.lastIndexOf("/") - 1 >>> 0) + 2)
            return pageName ? pageName : ''
        }
        return ''
    },
    getKanbanFieldName: function(cmp, event, helper) {
       var pageName = helper.getPageName(cmp);
       var objName = cmp.get("v.dbObjectName");
       var fieldName = pageName;
       return fieldName; 
	},
    
    getMedicalPlanGeographyData: function(cmp, medicalPlanId) {
        var action = cmp.get('c.Cue_GetRecordDetail');
        console.log('medicalPlanId...' , medicalPlanId);
        action.setParams({ recordId: medicalPlanId, objName: 'Account', filedList: 'Name' });
        action.setCallback(this, function(response){
            var state = response.getState();
            console.log(state , '....');
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                console.log(data , 'value..');
                if (data && (data.length >0) && data[0].Name && data[0].Name) {
                    cmp.set('v.selectedGeography', data[0].Name) 
                } else cmp.set('v.selectedGeography', '')
            } 
        })
        $A.enqueueAction(action);
    },
    getMedicalActivityTypeData: function(cmp, activityId) {
        var action = cmp.get('c.Cue_GetRecordDetail');
        console.log(activityId ,'activityId');
        action.setParams({ recordId: activityId, objName: 'Contact', filedList: 'Name' });
        action.setCallback(this, function(response){
           
            var state = response.getState();
            console.log(state , 'state...')
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                console.log(data , 'data...')
                if (data && (data.length > 0) && data[0].Name && data[0].Name) {
                    cmp.set('v.selectedMedicalActivity', data[0].Name)
                    console.log(data , 'data....')
                } else cmp.set('v.selectedMedicalActivity', '')
            } 
        })
        $A.enqueueAction(action);
    },
    getRecordDetail: function(cmp, helper, objName, fieldName) {
    	var action = cmp.get('c.Cue_GetRecordDetail');
        action.setParams({ recordId: cmp.get('v.recordId'), objName: objName, filedList: fieldName });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                console.log('data', data)
                if (data && (data.length > 0) && data[0].Name) {
                    helper.getMedicalPlanGeographyData(cmp, data[0].Name)
                }
                if (data && (data.length > 0) && data[0].Type) {
                    helper.getMedicalActivityTypeData(cmp, data[0].Type)
                }
            } 
        })
        $A.enqueueAction(action);
    }, 
   getRecordList: function(cmp, helper, objName, fieldName) {
        var action = cmp.get('c.Cue_GetRecordList');
        action.setParams({ objName: objName, fields: fieldName });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                console.log('data', data)
                if (data && (data.length > 0)) {
                    const dataObj = []
                    data.forEach(lead => { 
                        if(lead && lead.Id && lead.Name) dataObj.push({ label: lead.Name, value: lead.Id }) 
                    })
                     if (objName == 'Contact') {
                        cmp.set('v.AllMedicalPlans', dataObj)
                    }   
           		}
            } 
        })
        $A.enqueueAction(action);
    }, 

        
    getAllRecordList: function(cmp, event, helper) {
      helper.getRecordList(cmp, helper, 'Contact','Name')
    },
        
    getUserListByRole: function(cmp, role) {
    	var action = cmp.get('c.Cue_GetUserByRole');
        action.setParams({ role: role });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                if (data && (data.length > 0)) {
                    if (role == 'Medical Lead') {
                        const medLeads = []
                        data.forEach(lead => { 
                            if(lead && lead.Id && lead.Name) medLeads.push({ label: lead.Name, value: lead.Id }) 
                        })
                        cmp.set('v.medicalLeads', medLeads)
                    }
                    if (role == 'Activity Owner') {
                        const actLeads = []
                        data.forEach(lead => { 
                            if(lead && lead.Id && lead.Name) actLeads.push({ label: lead.Name, value: lead.Id }) 
                        })
                        cmp.set('v.activityLeads', actLeads)
                    }
           		}
            } 
        })
        $A.enqueueAction(action);        
    },
    getMedicalObjectiveData: function(cmp, medicalPlanId) {
        var action = cmp.get('c.Cue_GetRecordList');
        action.setParams({ objName: 'Contact', fields: 'Name', conditionalField: 'Type', value: medicalPlanId });
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var data = response.getReturnValue();
                if(data && data.length > 0) {
                    const medicalObjectives = []
                    data.forEach(mObjective => { 
                        if(mObjective && mObjective.Id && mObjective.Name) medicalObjectives.push({ label: mObjective.Name, value: mObjective.Id }) 
                	})
                    cmp.set('v.medicalObjectives', medicalObjectives)
                }
            } 
        })
        $A.enqueueAction(action);
    } 

})