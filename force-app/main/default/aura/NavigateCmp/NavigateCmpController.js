({
  fetchPrintableData: function(component, event, helper) {
       var urlParams = window.location.search.substring(1).split("&");
      var data = {};

        // Loop through the URL parameters to find the desired parameter
        for (var i = 0; i < urlParams.length; i++) {
            var param = urlParams[i].split("=");
            if (param[0] === "data") {
                data = decodeURIComponent(param[1]);
                break;
            }
        }


        console.log("v.data", data);
  },

  closeWindow: function(component, event, helper) {
    window.close();
  },
  printTab: function(component, event, helper) {
    window.print();
  },

  selectOption: function(component, event, helper) {
    var value = document.getElementById("options").value;
      console.log('options --> ', value);
    var list = component.get("v.cntList");
      console.log('list --> ', list);
    var cpyList = component.get("v.cpyList");
    if (value === "10") {
      var newList = list.slice(0, 10);
      component.set("v.cntList", newList);
    } else if (value === "15") {
      component.set("v.cntList", cpyList);
      var list = component.get("v.cntList");
      var newList = list.slice(0, 15);
      component.set("v.cntList", newList);
    } else if (value === "20") {
      component.set("v.cntList", cpyList);
      var list = component.get("v.cntList");
      var newList = list.slice(0, 20);
      component.set("v.cntList", newList);
    } else if (value === "25") {
      component.set("v.cntList", cpyList);
      var list = component.get("v.cntList");
      var newList = list.slice(0, 25);
      component.set("v.cntList", newList);
    } else {
      component.set("v.cntList", cpyList);
      var list = component.get("v.cntList");
    }
  }
});