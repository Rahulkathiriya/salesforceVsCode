({
	print : function(component, event, helper) {
        var printButton = component.find('printButton');
        $A.util.toggleClass(printButton, 'slds-hide');
        event.preventDefault();
        window.print();
        $A.util.toggleClass(printButton, 'slds-hide');
    },
    close: function(component, event, helper) {
        window.close();
    },

    doInit: function(component, event, helper) {
        var pageNumber = component.get("v.PageNumber"); 
        var pageSize = component.find("pageSize").get("v.value"); 
        helper.getAccountList(component, pageNumber, pageSize);
    },
    onSelectChange: function(component, event, helper) {
        var page = 1
        var pageSize = component.find("pageSize").get("v.value");
        helper.getAccountList(component, page, pageSize);
        console.log(page ,'pagee');
        console.log(pageSize ,'pageesizee');
    }, 
})