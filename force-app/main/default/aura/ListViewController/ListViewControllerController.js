({
  fetchRecords: function (component, event, helper) {
    var objName = component.get("v.objName");
    if (objName === "Account") {
      // component.set("v.pickName", "Type");
      component.set("v.printObjName", "Accounts");
      component.set("v.options", [
        { label: "All Accounts", value: "All Accounts" },
        { label: "My Accounts", value: "My Accounts" }
      ]);
    } else if (objName === "Contact") {
      component.set("v.printObjName", "Contacts");
      component.set("v.options", [
        { label: "All Contacts", value: "All Contacts" },
        { label: "My Contacts", value: "My Contacts" }
      ]);
    } else if (objName === "Opportunity") {
      //  component.set("v.pickName", "StageName");
      component.set("v.printObjName", "Opportunities");
      component.set("v.options", [
        { label: "All Opportunities", value: "All Opportunities" },
        { label: "My Opportunities", value: "My Opportunities" }
      ]);
    } else if (objName === "Lead") {
      //   component.set("v.pickName", "Status");
      component.set("v.printObjName", "Leads");
      component.set("v.options", [
        { label: "All Leads", value: "All Leads" },
        { label: "My Leads", value: "My Leads" }
      ]);
    }
    component.set(
      "v.objIconName",
      "standard:" + component.get("v.objName").toLowerCase()
    );
    helper.accountListViewHelper(component);
    helper.fetchAccountField(component);

    // kanban helper
    helper.setKanbanFields(component);
    helper.setSummarizeField(component);

    window.setTimeout(
      $A.getCallback(function () {
        helper.getAccountRecords(component);
      }),
      1000
    );
    window.setTimeout(
      $A.getCallback(function () {
        helper.getOwnerFilterFieldsValue(component);
      }),
      2000
    );
  },

  handleSelect: function (component, event, helper) {
    var selectedValue = event.getParam("value");
    var menuItems = component.get("v.accListView");
    component.set("v.selectedValue", selectedValue);
    for (var i = 0; i < menuItems.length; i++) {
      if (menuItems[i].Id === selectedValue) {
        var selectedLabel = menuItems[i].Name;
        //  console.log("Selected Label: " + selectedLabel);
        component.set("v.listViewName", selectedLabel);
        break;
      }
    }
    var selectedMenuItem = event.getParam("value");
    component.set("v.listViewId", selectedMenuItem);
    //  helper.fetchListViewFilter(component);
  },

  viewCreateHandler: function (component, event, helper) {
    var selectedMenu = event.getParam("value");
    console.log("value --> ", selectedMenu);
    if (selectedMenu === "New") {
      component.set("v.newView", true);
    }
  },

  // closeModal: function (component, event, helper) {
  //   component.set("v.newView", false);
  //   component.set("v.isKanbanSetting", false);
  // },

  // filter component

  filter: function (component, event, helper) {
    var action = component.get("v.openFilter");

    if (!action) {
      component.set("v.openFilter", true);
      component.set("v.filterActive", true);
      component.set("v.viewPopup", false);
      var cssStyle = component.find("recordTable");
      $A.util.removeClass(cssStyle, "defaultWidth");
      $A.util.addClass(cssStyle, "filterWidth");
    } else {
      component.set("v.openFilter", false);
      component.set("v.filterActive", false);
      component.set("v.openPickListFields", false);
      var cssStyle1 = component.find("recordTable");
      $A.util.removeClass(cssStyle1, "filterWidth");
      $A.util.addClass(cssStyle1, "defaultWidth");
      component.set("v.valueOptionos", false);
    }
  },

  refreshPage: function (component, event, helper) {
    component.set("v.pageSize", 50);
    component.set("v.currentPageNumber", 1);
    component.set("v.totalPages", 1);
    component.set("v.customFilterTextarea", false);
    component.set("v.addNewFilter", false);
    component.set("v.cancelButton", false);
    component.set("v.openFilter", false);
    var cssStyle2 = component.find("recordTable");
    $A.util.addClass(cssStyle2, "defaultWidth");
    $A.get("e.force:refreshView").fire();
  },

  closePanel: function (component, event, helper) {
    component.set("v.openFilter", false);
    var cssStyle2 = component.find("recordTable");
    $A.util.removeClass(cssStyle2, "filterWidth");
    $A.util.addClass(cssStyle2, "defaultWidth");
    component.set("v.valueOptionos", false);
    component.set("v.filterActive", false);
  },
  openCustomFilter: function (component, event, helper) {
    component.set("v.addNewFilter", true);
    component.set("v.stringType", true);
    component.set("v.openPickListFields", true);
    component.set("v.openOwnerFilter", false);
    component.set("v.removeData", true);
  },

  removeOpenFilter: function (component, event, helper) {
    component.set("v.addNewFilter", false);
    component.set("v.customFilterTextarea", false);
    component.set("v.cancelButton", false);
    component.set("v.valueOptionos", false);
    component.set("v.openPickListFields", false);
    component.set("v.removeData", false);
  },
  removeThis: function (component, event, helper) {
    component.set("v.addNewFilter", false);
    component.set("v.cancelButton", false);
    component.set("v.valueOptionos", false);
    component.set("v.openPickListFields", false);
    component.set("v.removeData", false);

    if (
      component.get("v.selectedField") == null ||
      component.get("v.selectedOpreator") == null ||
      component.get("v.inputValue") == null
    ) {
      component.set("v.cancelButton", false);
      component.set("v.inputValue", null);
    } else {
      component.set("v.cancelButton", true);
    }
  },
  openTextarea: function (component, event, helper) {
    component.set("v.customFilterTextarea", true);
    component.set("v.cancelButton", true);
  },

  closeFilter: function (component, event, helper) {
    component.set("v.customFilterTextarea", false);
  },

  removeAllFilter: function (component, event, helper) {
    component.set("v.customFilterTextarea", false);
    component.set("v.addNewFilter", false);
    component.set("v.cancelButton", false);
    component.set("v.removeData", false);
    component.set("v.openPickListFields", false);
    var cssStyle = component.find("innerTextId");
    $A.util.removeClass(cssStyle, "ownerText");
  },

  openValueSelector: function (component, event, helper) {
    component.set("v.fieldFilter", true);
    component.set("v.openPickListFields", false);
    var ownerFilter = component.get("v.openOwnerFilter");
    if (!ownerFilter) {
      component.set("v.openOwnerFilter", true);
    } else {
      component.set("v.openOwnerFilter", false);
    }
  },

  optionChange: function (component, event, helper) {
    var selectedOpreation = event.getParam("value");
    //  console.log(selectedOpreation);
    component.set("v.selectedOpreatorValue", selectedOpreation);
    if (selectedOpreation === "equals") {
      selectedOpreation = "=";
    } else if (selectedOpreation === "not equals to") {
      selectedOpreation = "!=";
    } else if (selectedOpreation === "less then") {
      selectedOpreation = "<";
    } else if (selectedOpreation === "greater then") {
      selectedOpreation = ">";
    } else if (selectedOpreation === "less or equal") {
      selectedOpreation = "<=";
    } else if (selectedOpreation === "greater or equal") {
      selectedOpreation = ">=";
    } else if (selectedOpreation === "contain") {
      selectedOpreation = "LIKE";
    }
    component.set("v.selectedOpreator", selectedOpreation);
    // console.log('value == ', selectedOpreation);
  },

  pickChange: function (component, event, helper) {
    var pickVal = event.getParam("value");
    console.log("pick value == ", pickVal);
    component.set("v.selectedPicValue", pickVal);
  },
  selectedValues: function (component, event, helper) {
    component.set("v.valueOptionos", true);
    component.set("v.openPickListFields", false);
    component.set("v.cancelButton", true);

    var selectedField = component.get("v.selectedField");
    var selectedOpreator = component.get("v.selectedOpreator");
    var selectedPickVal = component.get("v.selectedPicValue");
    var dateval = component.get("v.dateValue");
    var inputVal = component.get("v.inputValue");

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

    var action = component.get("c.filteredTable");
    action.setParams({
      field: selectedField,
      opretor: selectedOpreator,
      inputval: inputVal,
      pickVal: selectedPickVal,
      selectedDate: dateval,
      objectName: component.get("v.objName"),
      fieldName: fields
    });

    action.setCallback(this, function (response) {
      component.set("v.cancelButton", false);
      if (response.getState() == "SUCCESS") {
        var returnValue = response.getReturnValue();
        component.set("v.radioGrpValue", component.get("v.options")[0].value);
        component.set("v.radioItem", component.get("v.options")[0].value);

        returnValue.forEach(val => {
          (val.recordId = "/" + val.Id),
            (val.Name = val.Name),
            (val.ownerLink = "/" + val.OwnerId),
            (val.Owner = val.Owner.Alias);
        });

        // console.log("return == ", returnValue);
        component.set("v.accountList", returnValue);
        component.set("v.cancelButton", false);
        var cssStyle = component.find("innerTextAreaId");
        $A.util.addClass(cssStyle, "textAreaCss");
        var cssStyle = component.find("innerTextId");
        $A.util.removeClass(cssStyle, "ownerText");
      }

      var filterPopup = component.get("v.addNewFilter");
      //   console.log("filterPopup --> " + filterPopup);
      if (filterPopup === false) {
        component.set("v.accountList", component.get("v.dummyList"));
        component.set("v.valueOptionos", false);
        component.set("v.inputValue", null);
        component.set("v.doubleType	", false);
        component.set("v.dateType", false);
        component.set("v.pickListType", false);
      }

      if (
        component.get("v.radioItem") == "My Accounts" ||
        component.get("v.radioItem") == "My Contacts" ||
        component.get("v.radioItem") == "My Opportunities" ||
        component.get("v.radioItem") == "My Leads"
      ) {
        var accData = component.get("v.ownerFilterList");
        component.set("v.accountList", accData);
        var cssStyle = component.find("innerTextId");
        $A.util.removeClass(cssStyle, "ownerText");
        component.set("v.cancelButton", false);
      }
    });
    $A.enqueueAction(action);
  },

  getselectedValues: function (component, event, helper) {
    component.set("v.valueOptionos", true);
    component.set("v.openPickListFields", false);

    if (component.get("v.inputValue") == null) {
      component.set("v.cancelButton", false);
    } else {
      component.set("v.cancelButton", true);
    }
  },

  fieldChange: function (component, event, helper) {
    var values = event.getParam("value");
    //   console.log('selected field == ',values);
    var typeget = component.get("v.fieldList");
    var filterType = "";
    var filterValue = typeget.find(item => {
      if (item.value == values) {
        filterType = item.type;
      }
    });
    // console.log(values);
    if (filterType === "PICKLIST") {
      component.set("v.pickListType", true);
      component.set("v.dateType", false);
      component.set("v.doubleType", false);
      component.set("v.stringType", false);
      component.set("v.PicApiValue", values);
    } else if (filterType === "DATE") {
      component.set("v.pickListType", false);
      component.set("v.dateType", true);
      component.set("v.doubleType", false);
      component.set("v.stringType", false);
    } else if (filterType === "DOUBLE") {
      component.set("v.pickListType", false);
      component.set("v.dateType", false);
      component.set("v.doubleType", true);
      component.set("v.stringType", false);
    } else if (filterType === "STRING" || filterType === "TEXTAREA") {
      component.set("v.pickListType", false);
      component.set("v.dateType", false);
      component.set("v.doubleType", false);
      component.set("v.stringType", true);
    }

    component.set("v.filterType", filterType);
    component.set("v.inputValue", null);
    component.set("v.dateValue", null);
    component.set("v.selectedField", values);

    helper.GetPicklistValues(component, event, helper);
  },

  fieldsPopup: function (component, event, helper) {
    var popup = component.get("v.openPickListFields");
    component.set("v.openOwnerFilter", false);
    if (popup) {
      component.set("v.openPickListFields", false);
    } else {
      component.set("v.openPickListFields", true);
    }
  },

  copyName: function (component, event, helper) {
    var listValue = component.get("v.listInputValue");

    if (listValue != null && listValue != "") {
      listValue = listValue.replace(" ", "_");
      component.find("apivalue").set("v.value", listValue);
    } else {
      window.alert("fill the input field");
    }
  },

  getOwnerFilterValue: function (component, event, helper) {
    component.set("v.openOwnerFilter", false);

    var btnValue = component.find("radioGrp").get("v.value");
    //  console.log("value --> ",btnValue);
    if (component.get("v.radioItem") == btnValue) {
      component.set("v.cancelButton", false);
    } else {
      component.set("v.cancelButton", true);
    }
    component.set("v.radioItem", btnValue);

    var cssStyle = component.find("innerTextId");
    $A.util.addClass(cssStyle, "ownerText");
  },

  handleSelectView: function (component, event, helper) {
    var popup = component.get("v.viewPopup");
    if (!popup) {
      window.addEventListener("click", function (event) {
        component.set("v.viewPopup", true);
      });
    } else {
      window.addEventListener("click", function (event) {
        component.set("v.viewPopup", false);
      });
    }
  },

  hadleoption: function (component, event, helper) {
    var auraIdField = event.getSource().getLocalId();
    //   console.log(auraIdField);
    console.log(component.find(auraIdField).get("v.value"));
  },

  selectedValue: function (component, event, helper) {
    var selectedItem = event.target.value;
    console.log("selected value --> ", selectedItem);
  },

  getLabelValue: function (component, event, helper) {
    var itemName = event.currentTarget.dataset.item;
    var itemId = event.currentTarget.getAttribute("id");
    console.log('item id --> ', itemId);
    console.log('itemName --> ', itemName);
    component.set("v.listViewName", itemName);
    component.set("v.selectedValue", itemId);
    component.set("v.openFilterSection", true);
    component.set("v.openKanban", false);
    component.set("v.iconName", "utility:table");
    var listView = component.get("v.accListView");
    listView.forEach(val => {
      if (val.Id === itemId) {
        val.checked = true;
      } else {
        val.checked = false;
      }
    });

    component.set("v.viewPopup", false);
    helper.fetchListViewFilter(component);
    var menuItems = component.find("menuItems");
    menuItems[0].set("v.checked", true);
    for (var i = 1; i < menuItems.length; i++) {
      var menuItem = menuItems[i];
      menuItem.set("v.checked", false);
      component.set("v.isKanban", false);
    }
  },

  searchListhandler: function (component, event, helper) {
    var searchKey = component.find("searchId").get("v.value");
    // console.log("value --> ", searchKey);

    component.set("v.searchKeyValue", searchKey);
    helper.searchListHelper(component, event, helper);
  },

  newObjrecords: function (component, event, helper) {
    component.set("v.objRecords", true);
  },
  closeModal: function (component, event, helper) {
    component.set("v.editObjectValue", false);
    component.set("v.objRecords", false);
    component.set("v.isDeleteRow", false);
    component.set("v.newView", false);
    component.set("v.isKanbanSetting", false);
    component.set("v.tableFieldPopup", false);
    component.set("v.listviewPopup", false);
    component.set("v.viewLabelName", '');
    component.set("v.viewApiName", '');
    //  $A.get("e.force:refreshView").fire();
  },

  printTable: function (component, event, helper) {
    var accountList = JSON.stringify(component.get("v.accountList"));
    localStorage.setItem("accountList", accountList);
    localStorage.setItem("listViewName", component.get("v.listViewName"));

    var urlEvent = $A.get("e.force:navigateToURL");
    urlEvent.setParams({
      url: "/c/NavigateApp.app",
      isredirect: true
    });
    urlEvent.fire();
  },
  handleRowAction: function (component, event, helper) {
    var action = event.getParam("action");
    var row = event.getParam("row");

    switch (action.name) {
      case "Edit":
        component.set("v.editObjectValue", true);
        component.set("v.editRecordId", row.Id);
        break;
      case "Delete":
        component.set("v.isDeleteRow", true);
        component.set("v.deletedFieldName", row.Name);
        component.set("v.deleteRecordId", row.Id);
        break;
    }
  },

  deleteObjectRow: function (component, event, helper) {
    helper.deleteRecordHelper(component);
  },

  handlesort: function (component, event, helper) {
    var fieldName = event.getParam("fieldName");
    var sortDirection = event.getParam("sortDirection");

    fieldName = fieldName === 'recordId' ? 'Name' : fieldName;
    fieldName = fieldName === 'ownerLink' ? 'Owner' : fieldName;

    component.set("v.sortedBy", fieldName);
    component.set("v.sortedDirection", sortDirection);
    helper.sortData(component, fieldName, sortDirection);
    component.set("v.sortedBy", event.getParam("fieldName"));
  },
  closeModelOnClick: function (component, event) {
    window.addEventListener("click", function (event) {
      component.set("v.viewPopup", false);
    });
  },

  handleSelectMenuItem: function (component, event) {
    var selectedMenuItemValue = event.getParam("value");

    if (selectedMenuItemValue === "Reset Column Width") {
      var cssStyle = component.find("recordTable");
      $A.util.addClass(cssStyle, "defaultWidth");
    }
    if (selectedMenuItemValue === "Kanban Settings") {
      component.set("v.isKanbanSetting", true);
    }
    if (selectedMenuItemValue === "Select Fields to Display") {
      component.set("v.tableFieldPopup", true);
    }
    if (selectedMenuItemValue === 'New') {
      component.set("v.listviewPopup", true);
      component.set("v.viewType", 'New');
    }
    if (selectedMenuItemValue === 'Clone') {
      component.set("v.viewLabelName", 'Copy of ' + component.get("v.listViewName"));
      component.set("v.viewType", 'Clone');
      component.set("v.listviewPopup", true);
    }
  },
  handleSelectTableView: function (component, event) {
    var selectedMenuItemValue = event.getParam("value");
    // console.log("selected value --> ", selectedMenuItemValue);
    var menuItems = component.find("menuItems");

    menuItems.forEach(function (menuItem) {
      if (menuItem.get("v.checked")) {
        menuItem.set("v.checked", false);
      }
      if (menuItem.get("v.value") === selectedMenuItemValue) {
        // console.log("menuitem checked --> ", menuItem.get("v.checked"));
        menuItem.set("v.checked", true);
        component.set("v.isKanbanSetting", false);
      }
    });

    switch (selectedMenuItemValue) {
      case "tableView":
        component.set("v.isKanban", false);
        component.set("v.openKanban", false);
        component.set("v.iconName", "utility:table");
        $A.get("e.force:refreshView").fire();
        break;
      case "kanbanBoard":
        component.set("v.openFilterSection", false);
        component.set("v.iconName", "utility:kanban");

        if (
          component.get("v.kanbanInputValue") === undefined &&
          component.get("v.SummarizeInput") === undefined
        ) {
          component.set("v.isKanbanSetting", true);
        }
        component.set("v.openKanban", true);
        component.set("v.isKanban", true);

        window.setTimeout(
          $A.getCallback(function () {
            component.set("v.kanbanLoading", false);
          }),
          1000
        );
        break;
    }
  },
  kanbanFieldChange: function (component, event, helper) {
    var pickVal = event.getParam("value");
    //  console.log("pick value == ", pickVal);
  },
  summarizeFieldChange: function (component, event, helper) {
    //   console.log("SummarizeInput == ", component.get("v.SummarizeInput"));
  },
  getKanbanField: function (component, helper) {
    component.set("v.pickName", component.get("v.kanbanInputValue"));
    component.set("v.isKanbanSetting", false);
  },
  handleSelectedRow: function (component, event, helper) {
    var selectedRows = event.getParam("selectedRows");
    var idList = [];
    selectedRows.forEach(value => {
      idList.push(value.Id);
    });
    component.set("v.recordIdList", idList);
  },
  removeSeletedRecords: function (component) {
    var action = component.get("c.deleteListOfRecords");
    action.setParams({
      objName: component.get("v.objName"),
      recordIdList: component.get("v.recordIdList")
    });
    action.setCallback(this, function (resp) {
      if (resp.getState() === "SUCCESS") {
        console.log("reutrn Value --> ", resp.getReturnValue());
        $A.get("e.force:refreshView").fire();
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
          title: "Success",
          message: "Records deleted successfully. ",
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
  handleChangeDualListBoxValue: function (component, event) {
    var selectedOptionValue = event.getParam("value");
    component.set("v.dualBoxValues", selectedOptionValue);
  },

  saveSelectedFields: function (component, helper) {
    var action = component.get("c.getSelectedRecordList");
    action.setParams({
      objectName: component.get("v.objName"),
      fieldNames: component.get("v.dualBoxValues")
    });
    action.setCallback(this, resp => {
      if (resp.getState() === "SUCCESS") {
        var returnVal = resp.getReturnValue();
        component.set("v.tableFieldPopup", false);

        var actions = [
          { label: "Edit", name: "Edit" },
          { label: "Delete", name: "Delete" }
        ];
        let columns = [];
        for (let i = 0; i < returnVal.length; i++) {
          let value = returnVal[i];
          let keys = Object.keys(value);
          for (let j = 0; j < keys.length; j++) {
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
                  sortable: true
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
                  sortable: true
                };
                columns.push(column);
              }
              if (
                key != "Id" &&
                key != "Name" &&
                key != "Owner" &&
                key != "OwnerId"
              ) {
                columns.push({
                  label: key,
                  fieldName: key,
                  sortable: true
                });
              }
            }
          }
        } 
        columns.push({
          type: "action",
          typeAttributes: { rowActions: actions }
        });
        returnVal.forEach(val => {
          (val.recordId = "/" + val.Id),
            (val.Name = val.Name),
            (val.ownerLink = "/" + val.OwnerId),
            (val.Owner = val.Owner.Alias);
        });

        component.set("v.columns", columns);
        component.set("v.accountList", returnVal);
      }
    });
    $A.enqueueAction(action);
  },
  viewNameHandler: function (component, event, helper) {

    var label = component.get('v.viewLabelName');
    while (label.endsWith(" ")) {
      label = label.trimRight();
    }
    label = label.replaceAll(' ', '_');
    component.set('v.viewApiName', label);
  },
  newViewCreateHandler: function (component, event, helper) {
    helper.listViewCreateHelper(component);
  }

});