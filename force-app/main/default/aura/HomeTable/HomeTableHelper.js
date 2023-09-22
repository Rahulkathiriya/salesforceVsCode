({
    helperInit : function(cmp,event,helper) {
        
        window.setTimeout(
            $A.getCallback(function() {
                cmp.set("v.loaded", true);
                cmp.get('c.getAllData');
            }), 500
        );
        
        var action = cmp.get('c.getAllData');
        action.setCallback(this,function(r){
            if(r.getState() == "SUCCESS"){
                
                
                var state = r.getReturnValue();
                state.forEach(function(record){
                    record.linkName ='/'+record.Id;
                });
                //  console.log('state--->',state);
                
                cmp.set('v.DATA',state); 
                cmp.set('v.PaginationData',state); 
            }
        });
        $A.enqueueAction(action); 
    },
    sortBy : function(field,reverse,primer){
        var key = primer ? function(x) {
            return primer(x[field]);
        }
        :
        function(x){
            return x[field];
        };
        return function(a,b){
            a = key(a);
            b = key(b);
            return reverse * ((a > b)- (b > a));
        };
    },
    handleSort1: function(cmp, event) {
        var sortedBy = event.getParam('fieldName');
        var sortDirection = event.getParam('sortDirection');
        var data =cmp.get("v.DATA");
        var cloneData = data.slice(0);
        cloneData.sort((this.sortBy(sortedBy, sortDirection === 'asc' ? 1 : -1)));
        cmp.set('v.DATA', cloneData);
        cmp.set('v.sortDirection', sortDirection);
        cmp.set('v.sortedBy', sortedBy);
        
    },
    handlerSearchFilter: function(cmp,event,helper){
        var searchValue = cmp.get('v.SearchFilter');
        var action = cmp.get('c.getSearchFilterData');
        action.setParams({ 'SearchData': searchValue });
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                var state = r.getReturnValue();
                state.forEach(function(record){
                    record.linkName ='/'+record.Id;
                }); 
                cmp.set('v.DATA',state); 
            }
        });
        $A.enqueueAction(action);
    },
    FilterAllData : function(cmp,event,helper){
        
        var action = cmp.get('c.getFilterFieldName');
        action.setParams({ 'objName': 'Contact' });
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                var ret = r.getReturnValue();
                var ValueList = [];
                
                for(var record in ret){
                    var innerValue = ret[record];
                    for(var keyRecord in innerValue){
                        if(keyRecord == 0){
                            var Type = innerValue[keyRecord];
                        }else{
                            var Value = innerValue[keyRecord];
                        }
                    }
                    ValueList.push({label:record, value:Value, type:Type});   
                    //   console.log('ValueList',ValueList);
                }
                cmp.set('v.AllFilterData',ValueList);
            }
        });
        $A.enqueueAction(action);
    },
    GetPickListValue : function(cmp,event,helper){
        var PicApiName = cmp.get('v.PicklistApiValue');
        
        var action = cmp.get('c.getPickListValuesIntoList');
        
        action.setParams({ 'objName': 'Contact', 'picName': PicApiName});
        action.setCallback(this,function(r){
            if(r.getState() == 'SUCCESS'){
                var PicInnerValue = r.getReturnValue();
                var PickList = [];
                for ( var key in PicInnerValue.Type){
                    PickList.push({label:PicInnerValue.Type[key], value:PicInnerValue.Type[key]}) 
                }
                cmp.set('v.PicklistInnerValue',PickList);
                
                cmp.set('v.SelectedPicValue',PicInnerValue.Type[0]);
            }
        });
        $A.enqueueAction(action);
    },
    totalPageCount:function(cmp,event,helper){
        
        var data = cmp.get('v.PaginationData');
        var selectPageNumber = cmp.find('selectedPage').get('v.value');
        console.log('selectPageNumber',selectPageNumber);
        var countTotalPage = Math.ceil(data.length/selectPageNumber);
        
        console.log('countTotalPage',countTotalPage);
        var totalPages =  countTotalPage > 0 ? countTotalPage : 1;
        console.log('totalPages',totalPages);
        cmp.set('v.totalPages',totalPages);
        
        cmp.set('v.currentPageNumber',1);
        this.setDataPagination(cmp,event,helper);
    },
    setDataPagination: function(cmp,event,helper){
        
        var data = [];
        var selectPageNumber = cmp.find('selectedPage').get('v.value');
        var getAllConData = cmp.get('v.PaginationData');
        var currentPageNumber = cmp.get('v.currentPageNumber');
        
        for(var i = (currentPageNumber - 1 ) * selectPageNumber ; i < (currentPageNumber) * selectPageNumber; i++){
            if(getAllConData[i]){
                data.push(getAllConData[i]);
            }
        }
        cmp.set('v.DATA',data);
    },
    
    
})