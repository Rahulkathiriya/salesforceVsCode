({
  getKanbanDetail: function(component) {
      
       var columns = component.get("v.sObjectFields");
    var fields = [];
    columns.map(function(value) {
     if (value.label) {
          if(value.label === 'Owner'){
             fields.push('OwnerId');
              fields.push('Owner.Alias');
          }else{
              fields.push(value.label);
          }
      } 
    });
      
    var action = component.get("c.getKanbanWrapperDetails_Apex");
    action.setParams({
      sObjectName: component.get("v.sObjectName"),
      sObjectFields:component.get("v.sObjectFields"),
      sObjectPickListValue: component.get("v.sObjectPickListValue")
    });
    action.setCallback(this, function(response) {
      var state = response.getState();

      if (state === "SUCCESS") {
        var returnVal = response.getReturnValue();
        console.log("response-->", returnVal);
        var arrayMapKeys = [];

   
        var fieldName = component.get("v.sObjectPickListValue");

        try {
          returnVal.records.forEach(val => {
              if(val.subject){
              if(val.subject.length > 20){
              val.subject = val.subject.substring(0, 30) + "....";
          }
          }
            if (val[fieldName]) {
              val.pickListValue = val[fieldName]
             
            }
          });
        } catch (error) {
          console.log("Error --> ", error);
        }

        component.set("v.objectRecords", returnVal.records);
 console.log('objectRecords',component.get("v.objectRecords"))
        /*  component.set("v.objectPickVal", returnVal.pickVals);
         */
      }
      var pickval = returnVal.pickVals;
      var objRecords = component.get("v.objectRecords");

      var pickValCountsMap = {};

      console.log("fieldName --> ", fieldName);
      objRecords.forEach(function(record) {
        if (record[fieldName]) {
          if (!pickValCountsMap[record[fieldName]]) {
            pickValCountsMap[record[fieldName]] = 1;
          } else {
            pickValCountsMap[record[fieldName]]++;
          }
        }
      });
      var pickValCountsArray = [];
      pickval.forEach(function(pickVal) {
        var count = pickValCountsMap[pickVal] || 0;
        pickValCountsArray.push({ pickVal: pickVal, count: count });
      });
      component.set("v.pickValCountsArray", pickValCountsArray);
    });

    $A.enqueueAction(action);
  },

  
  getUpdatePickListValue_helper: function(
    component,
    recordId,
    sObjectPickListValue,
    pickListUpdatedValue,
    helper
  ) {
    var action = component.get("c.getUpdatePickListValue_Apex");
    action.setParams({
      recordId: recordId,
      sObjectPickListValue: sObjectPickListValue,
      pickListUpdatedValue: pickListUpdatedValue
    });
    action.setCallback(this, function(response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        //   console.log(response.getReturnValue());
        //
        helper.getKanbanDetail(component);

        //  document.getElementById(recordId).style.backgroundColor = "#04844b";
        //  setTimeout(function(){ document.getElementById(recordId).style.backgroundColor = ""; }, 300);
      }
    });

    $A.enqueueAction(action);
  },

  deleteRecord: function(component) {
    console.log("objName --> ", component.get("v.sObjectName"));
    console.log("delete id --> ", component.get("v.deleteId"));

    var action = component.get("c.deleteObjectRecord");
    action.setParams({
      objName: component.get("v.sObjectName"),
      recordId: component.get("v.deleteId")
    });

    action.setCallback(this, function(resp) {
      if (resp.getState() === "SUCCESS") {
        $A.get("e.force:refreshView").fire();
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Success",
          message: "Record deleted successfully. ",
          duration: " 3000",
          key: "info_alt",
          type: "success",
          mode: "dismissible"
        });
        toastEvent.fire();
      }
    });

    $A.enqueueAction(action);
  }
});