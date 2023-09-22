({
  handleDataChange: function(component, event, helper) {
    var storedData = localStorage.getItem("accountList");
    var listViewName = localStorage.getItem("listViewName");
      component.set("v.viewName",listViewName);
    var parsedData = JSON.parse(storedData);

    var myList = [];
    if (Array.isArray(parsedData)) {
      myList = parsedData;
  //    console.log("myList -->>", myList);
    } else {
      console.log("Invalid data format");
    }

    var returnVal = myList;

    let columns = [];

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
          keys[j] != "Owner" &&
          keys[j] != "recordLink" &&
          keys[j] != "Account" &&
          keys[j] != "AccountId" &&
          keys[j] != "AccountName" &&
            keys[j] != "ownerLink" &&
          keys[j] != "recordId"
        ) {
          let key = keys[j];
          if (!columns.find(column => column.label === key)) {
            if (key != "Id") {
              columns.push({ label: key, fieldName: key });
            }
          }
        }
      }
    }

    component.set("v.printColumns", columns);
    component.set("v.dataList", returnVal);
    component.set("v.copyList", returnVal);
  },

  closeWindow: function(component, event, helper) {
    window.close();
  },
  printTab: function(component, event, helper) {
    window.print();
  },

  selectOption: function(component, event, helper) {
    var value = document.getElementById("options").value;
    var list = component.get("v.dataList");
    console.log("columns --> ", component.get("v.printColumns"));
    console.log("list --> ", list);
    var cpyList = component.get("v.copyList");
    if (value === "10") {
      var newList = list.slice(0, 10);
      component.set("v.dataList", newList);
      component.set("v.totalCount", newList.length);
    } else if (value === "15") {
      component.set("v.dataList", cpyList);

      var list = component.get("v.dataList");
      var newList = list.slice(0, 15);
      component.set("v.dataList", newList);
      component.set("v.totalCount", newList.length);
    } else if (value === "20") {
      component.set("v.dataList", cpyList);
      var list = component.get("v.dataList");
      var newList = list.slice(0, 20);
      component.set("v.dataList", newList);
      component.set("v.totalCount", newList.length);
    } else if (value === "25") {
      component.set("v.dataList", cpyList);
      var list = component.get("v.dataList");
      var newList = list.slice(0, 25);
      component.set("v.dataList", newList);
      component.set("v.totalCount", newList.length);
    } else {
      component.set("v.dataList", cpyList);
      var list = component.get("v.dataList");
      component.set("v.totalCount", list.length);
    }
  }
});