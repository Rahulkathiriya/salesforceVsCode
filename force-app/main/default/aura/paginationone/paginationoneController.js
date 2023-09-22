({
    doInit : function(c, e, h) {
        try{
            var DynamicTableValueVirtual = c.get('v.DynamicTableValue');
            var DynamicTableValue =[];
            //   DynamicTableValue.splice(0,1);
            console.log('DynamicTableValueVirtual '+ JSON.stringify(DynamicTableValueVirtual)); 
            for(var i = 1;i<DynamicTableValueVirtual.length;i++){
                var DynamicTableValueObj = {}; 
                DynamicTableValueObj = DynamicTableValueVirtual[i];
                DynamicTableValue.push(DynamicTableValueObj);
            }
            console.log('DynamicTableValue '+ JSON.stringify(DynamicTableValue));
            var ObjApi = c.get('v.ObjApi');
            var action = c.get("c.fieldType");  
            action.setParams({
                "ObjApi" :  ObjApi,   
                "DynamicTableValue": JSON.stringify(DynamicTableValue)
            });
            action.setCallback(this, function(response) {
                var state = response.getState();    
                console.log('state is +===>>>>'+state);
                var result = response.getReturnValue();
                console.log('result ' +JSON.stringify(result));
                c.set("v.FilteFileds", result)
            });
            $A.enqueueAction(action);
        }
        catch(er){
            console.log('er ' + er);
        }
    },
    closeModel :function(c,e,h){
        var appEvent = $A.get("e.c:FilterHide");
        appEvent.fire();
    },
    ClosedPopup : function(c,e,h){
        var appEvent = $A.get("e.c:FilterHide");
        appEvent.fire();
    },
    ApplyFilterMethod : function(c,e,h){
        try{
            console.log('Apply Filter');
            var finalDynamicList = [];
            var DynamicTableValueFilter = c.get('v.DynamicTableValue');
            console.log('DynamicTableValueFilter ' + JSON.stringify(DynamicTableValueFilter));
            var flag = false;
            var UIValue = c.find("ComboID");
            console.log('UIValue ' + UIValue);
            if(UIValue.length>1){
                for(var k = 0 ;k<UIValue.length;k++){
                    console.log('UIValue ' + UIValue[k].get('v.value'));
                    if(UIValue[k].get('v.value') != undefined){
                        flag = true;
                    }
                }
            }
            else{
                console.log('length ' +UIValue.get('v.value'));
                let SingleUiValue = UIValue.get('v.value');
                console.log('SingleUiValue ' +SingleUiValue);          
                if(SingleUiValue != undefined){      
                    flag = true;
                }           
            }
            if(flag){              
                console.log('DynamicTableValueFilter ' + JSON.stringify(DynamicTableValueFilter));
                console.log('DynamicTableValueFilter.length '+ DynamicTableValueFilter.length);           
                
                // DynamicTableValueFilter.splice(0,1);
                let DynamicTableValue = [];
                for(var i = 1;i<DynamicTableValueFilter.length;i++){
                    var DynamicTableValueObj = {}; 
                    DynamicTableValueObj = DynamicTableValueFilter[i];
                    DynamicTableValue.push(DynamicTableValueObj);
                }
                var fieldApivalue = [];
                for(var i = 0 ;i<DynamicTableValue.length;i++){
                    console.log('Yes In forloop');
                    var mapValue;
                    if(UIValue.length >1){
                        mapValue =  UIValue[i].get('v.value');
                    }else{
                        mapValue =  UIValue.get('v.value');
                    }          
                    console.log('Value is mapValue out if ' + mapValue);                 
                    var AllRowListMap = {};
                    if(mapValue != undefined){                    
                        console.log('Value is undefined ' + i);
                        console.log('Value is mapValue ' + mapValue);        
                        AllRowListMap.label= DynamicTableValue[i].value;
                        AllRowListMap.value = mapValue;  
                        finalDynamicList.push(AllRowListMap);                  
                    }
                    fieldApivalue.push(DynamicTableValue[i].value);
                }
                console.log('fieldApivalue ' + fieldApivalue);
                console.log('finalDynamicList ' + JSON.stringify(finalDynamicList));
                var ObjApi = c.get('v.ObjApi');
                var action = c.get("c.filterMethod");
                action.setParams({
                    "ObjApi": ObjApi,
                    "finalDynamicList" : JSON.stringify(finalDynamicList),
                    "fieldApivalue" : fieldApivalue
                });  
                action.setCallback(this, function(response) {
                    var state = response.getState();
                    console.log('state is +===>>>>'+state);
                    var result = response.getReturnValue();
                    console.log('result ' +JSON.stringify(result));  
                    if(result.length == 0){
                        var title = 'Sorry';
                        var message = 'No records found'
                        var type = 'error'
                        h.showToast(c,e,h,title,message,type);
                    }else{
                        //  c.set(“v.ActionItemRecord”, finalActionItemsList)
                        //  var cmpEvent = c.getEvent(“HandelFilter”);
                        var appEvent = $A.get("e.c:FilterHide");
                        appEvent.setParams({"FilterDynamicList" : result});
                        appEvent.fire();          
                    }       
                });
                $A.enqueueAction(action);             
            }else{
                var UIValue = c.find("ComboID");                  
                if(UIValue.length >1){
                    for(var i = 0 ;i<UIValue.length;i++){         
                        UIValue[i].setCustomValidity('Please select atleast one field'); //do not get any message
                        UIValue[i].reportValidity();
                    }
                }else{
                    UIValue.setCustomValidity('Please select field'); //do not get any message
                    UIValue.reportValidity();
                }
            }                     
        }                 
        catch(Ex){            
            console.log(Ex);
        }     
    },
})      
/*  <div class=”slds-modal__content slds-p-around_medium” id=”modal-content-id-1″>
			<aura:iteration items=”{!v.FilteFileds}” var=”field”>
				<aura:if isTrue=”{!field.type == ‘picklist’}” >
					<lightning:combobox aura:id=”ComboID” name=”progress” label=”{!field.label}” options=”{!field.PickValue}”/>
                    <aura:set attribute=”else”>

                    <lightning:input aura:id=”ComboID” type = “{!field.type}” label=”{!field.label}” value=”{!field.Value}”/>

                            </aura:set>
                            </aura:if>

                   </aura:iteration>

                </div> */