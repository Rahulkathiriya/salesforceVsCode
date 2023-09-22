({
    fetchData :function(cmp,event,helper){            
        var action =cmp.get("c.getAccData");
        action.setCallback(this, function(response){
            if(response.getState() == 'SUCCESS'){
                var returnValue = response.getReturnValue();
                returnValue.forEach(function(record){
                    record.linkName ='/'+record.Id;
                });
                cmp.set("v.DATA",returnValue);
                cmp.set("v.UnfilteredData",returnValue);   // filter unfilter data  
            }            
        });
        $A.enqueueAction(action); 
    },
    
    sortBy : function(field,reverse,primer){
        
        //termary oprator
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
    getAccRecord : function(cmp,event,helper){
        var filterInputValue = cmp.get("v.filter");
        var action = cmp.get("c.filterData");
        action.setParams({
            'fAcc' : filterInputValue
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                var d1 = response.getReturnValue();
                d1.forEach(function(record){
                    record.linkName ='/'+record.Id;
                });
                cmp.set("v.DATA",d1);
            }  
        });
        $A.enqueueAction(action);
    },
    allFieldName :function(cmp,event,helper){
        var action = cmp.get("c.getObjectFields");
        action.setParams({
            'objName' :'Account'  
        });
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state == 'SUCCESS'){
                var returnval = response.getReturnValue();

                var valueList = [];
                for (var record in returnval ){
                    var innerValue = returnval[record];
                    for(var keyrecord in returnval[record]){
                        if(keyrecord == 0){
                            var value = innerValue[keyrecord];
                        }else{
                            var type =  innerValue[keyrecord]; 
                        }
                    }
                    valueList.push({label:record, value:value,type:type});
                }
                cmp.set("v.F_fields",valueList);
                console.log('valueList-->',valueList);
            }
        });
        $A.enqueueAction(action);
    },
    GetPicklist : function(cmp,event,helper){
        var getpicValue = cmp.get('v.PicApiValue');
        console.log('getpicValue-->',getpicValue);
        var action = cmp.get('c.getPickListValuesIntoList');
        action.setParams({
            'ObjectName' : 'account',
            'picName' : getpicValue	
        });
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                var innerpicValue = response.getReturnValue();
                var PickList = [];
                for ( var key in innerpicValue.Type){
                    PickList.push({label:innerpicValue.Type[key], value:innerpicValue.Type[key]}) 
                }
           //     console.log('PickList--->',PickList);
                cmp.set('v.PicValueSet',PickList);
              //  cmp.set('v.selectedPicValue',innerpicValue.Type[0]);  // set default piclist value
            }
        });
        $A.enqueueAction(action);
    },
    allListView : function(cmp,event,helper){

        var action = cmp.get('c.GetListData');
      
        action.setCallback(this,function(response){
            if(response.getState() == 'SUCCESS'){
                cmp.set('v.allListDataVeiw',response.getReturnValue());
             //   console.log('returnvalue------>',response.getReturnValue());
            } 
        });
        $A.enqueueAction(action);
    }
})