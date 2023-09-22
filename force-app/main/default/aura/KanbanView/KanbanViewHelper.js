({
  getKanbanDetail: function (component) {

    var columns = component.get("v.sObjectFields");
    //    console.log('columns--> ',columns );
    var fields = [];
    columns.map(function (value) {
      if (value.label) {
        if (value.label === 'Owner') {
          fields.push('OwnerId');
          fields.push('Owner.Alias');
          fields.push(component.get("v.sObjectPickListValue"));
        } else if (value.label === 'Type' || value.label === 'Industry' || value.label === 'StageName' || value.label === 'Status') {
          value.label = '';
        } else {
          fields.push(value.label);
        }
      }
      if (component.get("v.sObjectName") === 'Contact') {
        fields = ['Name', 'Account.Name', 'Account.Id', 'Phone', 'Email', 'Title'];
        fields.push(component.get("v.sObjectPickListValue"));
        component.set("v.sObjectPickListValue", component.get("v.sObjectPickListValue"))
      }
    });

    var action = component.get("c.getKanbanWrapperDetails_Apex");
    action.setParams({
      sObjectName: component.get("v.sObjectName"),
      sObjectFields: fields,
      sObjectPickListValue: component.get("v.sObjectPickListValue"),
      SummarizeField: component.get("v.summarizeFieldValue")
    });
    action.setCallback(this, function (response) {
      var state = response.getState();

      if (state === "SUCCESS") {
        var returnVal = response.getReturnValue();
        console.log("New response-->", returnVal);
        var arrayMapKeys = [];
        var records = component.get("v.objectRecords")
        var fieldName = component.get("v.sObjectPickListValue");
        try {
          returnVal.records.forEach(val => {
            if (val[fieldName]) {
              val.pickListValue = val[fieldName]
            }
          });
        } catch (error) {
          console.log("Error --> ", error);
        }
        component.set("v.objectRecords", returnVal.records);
      }
      var pickval = returnVal.pickVals;
      var objRecords = component.get("v.objectRecords");
      var pickValCountsMap = {};
      //    console.log("fieldName --> ", fieldName);
      objRecords.forEach(function (record) {
        if (record[fieldName]) {
          if (!pickValCountsMap[record[fieldName]]) {
            pickValCountsMap[record[fieldName]] = 1;
          } else {
            pickValCountsMap[record[fieldName]]++;
          }
        }
      });
      var pickValCountsArray = [];
      pickval.forEach(function (pickVal) {
        var count = pickValCountsMap[pickVal] || 0;
        pickValCountsArray.push({ pickVal: pickVal, count: count });
      });
      component.set("v.pickValCountsArray", pickValCountsArray);
    });
    $A.enqueueAction(action);
  },

  getUpdatePickListValue_helper: function (
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
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state === "SUCCESS") {
        helper.getKanbanDetail(component);
      }
    });
    $A.enqueueAction(action);
  },

  deleteRecord: function (component) {
    var action = component.get("c.deleteObjectRecord");
    action.setParams({
      objName: component.get("v.sObjectName"),
      recordId: component.get("v.deleteId")
    });

    action.setCallback(this, function (resp) {
      if (resp.getState() === "SUCCESS") {
        $A.get("e.force:refreshView").fire();
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Success",
          message: "Record deleted successfully. ",
          duration: "3000",
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