({
  doInit: function(component, event, helper) {
      
      helper.getKanbanDetail(component); 
    
    /*   window.setTimeout(
      $A.getCallback(function() {
       helper.comparePickVals(component);
      }),
      1000
    );  */
       
  },
    
    
  doView: function(component, event, helper) {
    //  var editRecordEvent = $A.get("e.force:navigateToSObject");
    var editRecordEvent = $A.get("e.force:editRecord");
    editRecordEvent.setParams({
      recordId: event.target.id
    });
    editRecordEvent.fire();
  },
    
    
  allowDrop: function(component, event, helper) {
    event.preventDefault();
  },

  drag: function(component, event, helper) {
    event.dataTransfer.setData("text", event.target.id);
  },

  drop: function(component, event, helper) {
    event.preventDefault();
      
    var data = event.dataTransfer.getData("text");
    //  console.log("Data--->", data);
    var tar = event.target;

    while (tar.tagName != "ul" && tar.tagName != "UL") {
      tar = tar.parentElement;
    }
    tar.appendChild(document.getElementById(data));

    //    document.getElementById(data).style.backgroundColor = "#ffb75d";
    var d = tar.getAttribute("data-Pick-Val");
    //  console.log("d----------->", d);
    helper.getUpdatePickListValue_helper(
      component,
      data,
      component.get("v.sObjectPickListValue"),
      tar.getAttribute("data-Pick-Val"),
        helper
    );
  },
 closeModal: function(component, event, helper) {
    component.set("v.editObjectValue", false);
    component.set("v.isDeleteRow", false);
    //  $A.get("e.force:refreshView").fire();
  },
    
  handleSelectMenuItem: function(component, event) {
    let parcedValue = event.getParam("value").split(',');
   let value = parcedValue[0];
   let label = parcedValue[1];

 //  console.log("value : " + value);
//   console.log("label: " + label);
      
      switch(label){
          case 'Edit' :
              component.set("v.editId",value);
              component.set("v.editObjectValue",true);
              break;
          case 'Delete' :
              component.set("v.deleteId",value);
              component.set("v.isDeleteRow",true);
              break;
      }
  },
    
    removeRecord: function(component, event,helper){
          helper.deleteRecord(component);
    }
});