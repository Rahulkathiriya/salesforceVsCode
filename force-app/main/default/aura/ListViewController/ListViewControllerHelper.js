({
  getAccountRecords: function (component) {
    var action = component.get("c.getListViewQuery");
    var selectedvalue = component.get("v.selectedValue");

    action.setParams({
      objName: component.get("v.objName"),
      listViewId: selectedvalue
    });

    action.setCallback(this, function (resp) {
      if (resp.getState() === "SUCCESS") {
        var returnVal = resp.getReturnValue();
        component.set("v.loading", false);
        //  console.log("object return value --> ", returnVal);
        var actions = [
          { label: "Edit", name: "Edit" },
          { label: "Delete", name: "Delete" }
        ];
        let columns = [];
        if (returnVal.length > 0) {
          for (let i = 0; i < returnVal.length; i++) {
            let value = returnVal[i];
            let keys = Object.keys(value);
            for (let j = 0; j < keys.length; j++) {
              if (
                keys[j] != "OwnerId" &&
                keys[j] != "RecordTypeId" &&
                keys[j] != "CreatedDate" &&
                keys[j] != "LastModifiedDate" &&
                keys[j] != "SystemModstamp" &&
                keys[j] != "recordLink" &&
                keys[j] != "AccountId" &&
                keys[j] != "Account"
              ) {
                let key = keys[j];
                if (!columns.find(column => column.label === key)) {
                  if (key === "Name") {
                    let column = {
                      label: key,
                      fieldName: "recordId",
                      type: "url",
                      typeAttributes: {
                        label: { fieldName: key },
                        target: "_blank",
                        linkify: true
                      },
                      sortable: true,
                      sorted: true,
                      sortDirection: "asc"
                    };
                    columns.push(column);
                  }
                  if (key === "Owner") {
                    let column = {
                      label: key,
                      fieldName: "ownerLink",
                      type: "url",
                      typeAttributes: {
                        label: { fieldName: key },
                        target: "_blank",
                        linkify: true
                      },
                      sortable: true,
                      sorted: true,
                      sortDirection: "asc"
                    };
                    columns.push(column);
                  }
                  if (key != "Id" && key != "Name" && key != "Owner") {
                    columns.push({
                      label: key,
                      fieldName: key,
                      sortable: true,
                      sorted: true
                    });
                  }
                }
              }
            }
          }
          columns.push({
            type: "action",
            typeAttributes: { rowActions: actions }
          });
        } else {
          columns = component.get("v.columns");
        }
        returnVal.forEach(val => {
          (val.recordId = "/" + val.Id),
            (val.Name = val.Name),
            (val.ownerLink = "/" + val.Owner.Id),
            (val.Owner = val.Owner.Alias);
        });
        component.set("v.columns", columns);

        var fields = [];
        columns.map(function (value) {
          if (value.label) {
            if (value.label === "Owner") {
              fields.push("OwnerId");
            } else {
              fields.push(value.label);
            }
          }
        });
        component.set("v.dualBoxValues", fields);

        component.set("v.accountList", returnVal);
        component.set("v.dummyList", returnVal);
        component.set("v.radioGrpValue", component.get("v.options")[0].value);
        component.set("v.radioItem", component.get("v.options")[0].value);
      }
    });

    $A.enqueueAction(action);
  },

  accountListViewHelper: function (component) {
    var action = component.get("c.objectListView");
    action.setParams({
      objName: component.get("v.objName")
    });
    action.setCallback(this, resp => {
      if (resp.getState() === "SUCCESS") {
        //  console.log("return value -->", resp.getReturnValue());
        var count = 0;
        resp.getReturnValue().forEach(val => {
          if (count == 0) {
            val.checked = true;
          } else {
            val.checked = false;
          }
          count++;
        });
        component.set("v.accListView", resp.getReturnValue());
      }
      var accListView = component.get("v.accListView");
      if (accListView.length > 0) {
        component.set("v.selectedValue", accListView[0].Id);
        component.set("v.listViewName", accListView[0].Name);
      }
    });

    $A.enqueueAction(action);
  },

  fetchAccountField: function (component) {
    var action = component.get("c.getObjectFieldValues");
    action.setParams({ objName: component.get("v.objName") });
    action.setCallback(this, function (response) {
      var state = response.getState();
      if (state == "SUCCESS") {
        var returnval = response.getReturnValue();
        //  console.log(returnval);
        var valueList = [];
        for (var record in returnval) {
          var innerValue = returnval[record];
          for (var keyrecord in returnval[record]) {
            if (keyrecord == 0) {
              var value = innerValue[keyrecord];
            } else {
              var type = innerValue[keyrecord];
            }
          }
          valueList.push({ label: record, value: value, type: type });
        }

        component.set("v.fieldList", valueList);
        component.set("v.dualBoxValue", valueList);
      }
    });
    $A.enqueueAction(action);
  },
  fetchListViewFilter: function (component) {
    var listViewid = component.get("v.selectedValue");
    //  console.log("Id --> ", component.get("v.selectedValue"));

    var action = component.get("c.getListViewQuery");

    action.setParams({
      objName: component.get("v.objName"),
      listViewId: listViewid
    });

    action.setCallback(this, resp => {
      console.log("State --> ", resp.getState());
      if (resp.getState() === "SUCCESS") {
        //   console.log("return query value -->", resp.getReturnValue());
        var returnVal = resp.getReturnValue();

        var actions = [
          { label: "Edit", name: "Edit" },
          { label: "Delete", name: "Delete" }
        ];
        let columns = [];
        if (returnVal.length > 0) {
          for (let i = 0; i < returnVal.length; i++) {
            let value = returnVal[i];
            let keys = Object.keys(value);
            for (let j = 0; j < keys.length; j++) {
              if (
                keys[j] != "OwnerId" &&
                keys[j] != "RecordTypeId" &&
                keys[j] != "CreatedDate" &&
                keys[j] != "LastModifiedDate" &&
                keys[j] != "SystemModstamp" &&
                keys[j] != "recordLink" &&
                keys[j] != "AccountId" &&
                keys[j] != "Account"
              ) {
                let key = keys[j];
                if (!columns.find(column => column.label === key)) {
                  if (key === "Name") {
                    let column = {
                      label: key,
                      fieldName: "recordId",
                      type: "url",
                      typeAttributes: {
                        label: { fieldName: key },
                        target: "_blank",
                        linkify: true
                      },
                      sortable: true,
                      sorted: true,
                      sortDirection: "asc"
                    };
                    columns.push(column);
                  }
                  if (key === "Owner") {
                    let column = {
                      label: key,
                      fieldName: "ownerLink",
                      type: "url",
                      typeAttributes: {
                        label: { fieldName: key },
                        target: "_blank",
                        linkify: true
                      },
                      sortable: true,
                      sorted: true,
                      sortDirection: "asc"
                    };
                    columns.push(column);
                  }
                  if (key != "Id" && key != "Name" && key != "Owner") {
                    columns.push({
                      label: key,
                      fieldName: key,
                      sortable: true,
                      sorted: true
                    });
                  }
                }
              }
            }
          }
          columns.push({
            type: "action",
            typeAttributes: { rowActions: actions }
          });
        } else {
          columns = component.get("v.columns");
        }
        returnVal.forEach(val => {
          (val.recordId = "/" + val.Id),
            (val.Name = val.Name),
            (val.ownerLink = "/" + val.Owner.Id),
            (val.Owner = val.Owner.Alias);
        });
        component.set("v.columns", columns);

        var fields = [];
        columns.map(function (value) {
          if (value.label) {
            if (value.label === "Owner") {
              fields.push("OwnerId");
            } else {
              fields.push(value.label);
            }
          }
        });
        component.set("v.dualBoxValues", fields);
        component.set("v.accountList", returnVal);

        var itemName = component.get("v.listViewName");
        if (itemName.startsWith("Recently", 0)) {
          component.set("v.isDisabled", true);
        } else {
          component.set("v.isDisabled", false);
        }
      }
    });
    $A.enqueueAction(action);
  },

  GetPicklistValues: function (component, event, hendler) {
    var pickVal = component.get("v.PicApiValue");
    var action = component.get("c.pickListValue");
    action.setParams({
      objectName: component.get("v.objName"),
      pickValueType: pickVal
    });
    action.setCallback(this, function (response) {
      if (response.getState() === "SUCCESS") {
        var innerpicValue = response.getReturnValue();
        //    console.log(innerpicValue);
        var PickList = [];
        for (var key in innerpicValue.Type) {
          PickList.push({
            label: innerpicValue.Type[key],
            value: innerpicValue.Type[key]
          });
        }
        component.set("v.PickListValue", PickList);
        component.set("v.selectedPicValue", innerpicValue.Type[0]);
      }
    });
    $A.enqueueAction(action);
  },

  searchListHelper: function (component) {
    var action = component.get("c.retriveList");
    var columns = component.get("v.columns");
    var fields = [];
    columns.map(function (value) {
      if (value.label) {
        if (value.label === "Owner") {
          fields.push("OwnerId");
          fields.push("Owner.Alias");
        } else {
          fields.push(value.label);
        }
      }
    });
    action.setParams({
      searchWord: component.get("v.searchKeyValue"),
      objectName: component.get("v.objName"),
      fieldName: fields
    });
    action.setCallback(this, function (resp) {
      if (resp.getState() === "SUCCESS") {
        var returnVal = resp.getReturnValue();

        returnVal.forEach(val => {
          (val.recordId = "/" + val.Id),
            (val.Name = val.Name),
            (val.ownerLink = "/" + val.Owner.Id),
            (val.Owner = val.Owner.Alias);
        });
        component.set("v.accountList", returnVal);
      }
    });

    $A.enqueueAction(action);
  },

  getOwnerFilterFieldsValue: function (component) {
    var action = component.get("c.ownerFilterValue");
    var columns = component.get("v.columns");
    var fields = [];
    columns.map(function (value) {
      if (value.label) {
        if (value.label === "Owner") {
          fields.push("OwnerId");
          fields.push("Owner.Alias");
        } else {
          fields.push(value.label);
        }
      }
    });

    //   console.log('updated columns --> ',fields)
    action.setParams({
      filterName: "My Accounts",
      objectName: component.get("v.objName"),
      fieldNames: fields
    });
    action.setCallback(this, function (resp) {
      if (resp.getState() === "SUCCESS") {
        var returnVal = resp.getReturnValue();

        var actions = [
          { label: "Edit", name: "Edit" },
          { label: "Delete", name: "Delete" }
        ];

        let columns = [];
        if (returnVal.length > 0) {
          for (let i = 0; i < returnVal.length; i++) {
            let value = returnVal[i];
            let keys = Object.keys(value);
            for (let j = 0; j < keys.length; j++) {
              if (
                keys[j] != "OwnerId" &&
                keys[j] != "RecordTypeId" &&
                keys[j] != "CreatedDate" &&
                keys[j] != "LastModifiedDate" &&
                keys[j] != "SystemModstamp" &&
                keys[j] != "recordLink" &&
                keys[j] != "AccountId" &&
                keys[j] != "Account"
              ) {
                let key = keys[j];
                if (!columns.find(column => column.label === key)) {
                  if (key === "Name") {
                    let column = {
                      label: key,
                      fieldName: "recordId",
                      type: "url",
                      typeAttributes: {
                        label: { fieldName: key },
                        target: "_blank",
                        linkify: true
                      },
                      sortable: true,
                      sorted: true,
                      sortDirection: "asc"
                    };
                    columns.push(column);
                  }
                  if (key === "Owner") {
                    let column = {
                      label: key,
                      fieldName: "ownerLink",
                      type: "url",
                      typeAttributes: {
                        label: { fieldName: key },
                        target: "_blank",
                        linkify: true
                      },
                      sortable: true,
                      sorted: true,
                      sortDirection: "asc"
                    };
                    columns.push(column);
                  }
                  if (key != "Id" && key != "Name" && key != "Owner") {
                    columns.push({
                      label: key,
                      fieldName: key,
                      sortable: true,
                      sorted: true
                    });
                  }
                }
              }
            }
          }
          columns.push({
            type: "action",
            typeAttributes: { rowActions: actions }
          });
        } else {
          columns = component.get("v.columns");
        }
        returnVal.forEach(val => {
          (val.recordId = "/" + val.Id),
            (val.Name = val.Name),
            (val.ownerLink = "/" + val.Owner.Id),
            (val.Owner = val.Owner.Alias);
        });
        component.set("v.columns", columns);
        //    console.log("return owner value --> ", returnVal);
        component.set("v.ownerFilterList", returnVal);
      }
    });

    $A.enqueueAction(action);
  },

  deleteRecordHelper: function (component) {
    var action = component.get("c.deleteObjectRecord");
    action.setParams({
      objName: component.get("v.objName"),
      recordId: component.get("v.deleteRecordId")
    });

    action.setCallback(this, function (resp) {
      if (resp.getState() === "SUCCESS") {
        $A.get("e.force:refreshView").fire();
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Success",
          message:
            component.get("v.objName") +
            " " +
            component.get("v.deletedFieldName") +
            " deleted successfully. ",
          duration: " 3000",
          key: "info_alt",
          type: "success",
          mode: "dismissible"
        });
        toastEvent.fire();
      }
    });

    $A.enqueueAction(action);
  },

  sortData: function (component, fieldName, sortDirection) {
    try {
      var data = component.get("v.accountList");
      var reverse = sortDirection !== "desc";

      data.sort((a, b) => {
        var fieldValue = a[fieldName];
        if (typeof fieldValue === "number" || typeof fieldValue === "boolean") {
          var valueA = a[fieldName];
          var valueB = b[fieldName];
        } else {
          var valueA = a[fieldName] ? a[fieldName].toLowerCase() : '';
          var valueB = b[fieldName] ? b[fieldName].toLowerCase() : '';
        }
        var s1 = valueA === valueB;
        var s2 = (!valueA && valueB) || (valueA < valueB);
        return s1 ? 0 : (reverse ? -1 : 1) * (s2 ? 1 : -1);

        // var s1 = a[fieldName] == b[fieldName];
        // var s2 = (!a[fieldName] && b[fieldName]) || (a[fieldName] < b[fieldName]);
        // return s1 ? 0 : (reverse ? -1 : 1) * (s2 ? 1 : -1);
      });

      component.set("v.accountList", data);
      // component.set("v.sortDirection", !reverse);
    } catch (error) {
      console.log("error --> ", error);
    }
  },
  sortBy: function (field, reverse, primer) {
    var key = primer
      ? function (x) {
        return primer(x[field]);
      }
      : function (x) {
        return x[field];
      };

    return function (a, b) {
      var A = key(a);
      var B = key(b);
      return reverse * ((A > B) - (B > A));
    };
  },

  /* kanbanhelperclass */

  setKanbanFields: function (component, helper) {
    var action = component.get("c.getPicklistFields");
    action.setParams({ objectName: component.get("v.objName") });
    action.setCallback(this, resp => {
      if (resp.getState() === "SUCCESS") {
        var returnValue = resp.getReturnValue();
        var PickList = [];
        for (var key in returnValue) {
          PickList.push({
            label: key,
            value: returnValue[key]
          });
        }
        component.set("v.GroupValue", PickList);
      }
    });
    $A.enqueueAction(action);
  },
  setSummarizeField: function (component, helper) {
    var action = component.get("c.queryDynamicFields");
    action.setParams({ objectApiName: component.get("v.objName") });
    action.setCallback(this, resp => {
      if (resp.getState() === "SUCCESS") {
        var returnValue = resp.getReturnValue();
        var PickList = [];
        for (var key in returnValue) {
          PickList.push({
            label: key,
            value: returnValue[key]
          });
        }
        component.set("v.SummarizeValue", PickList);
      }
    });
    $A.enqueueAction(action);
  },

  listViewCreateHelper: function (component) {
    var action = component.get("c.createListView");
    action.setParams({
      objName: component.get('v.objName'),
      viewName: component.get('v.viewApiName'),
      labelName: component.get('v.viewLabelName')
    });

    action.setCallback(this, (resp) => {
      if (resp.getState() === 'SUCCESS') {
        $A.get("e.force:refreshView").fire();
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Success",
          message:
            component.get("v.viewLabelName") +
            " ListView Created successfully. ",
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