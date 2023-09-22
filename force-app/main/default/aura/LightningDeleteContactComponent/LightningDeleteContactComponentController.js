({
    OnLoadRecord: function (component, event, helper) {
        //From OnLoadRecord i am calling helper. Helper is basically use to write all business
        //logic so that in future we can use again and again (Reuseablity).
        helper.ContactList(component, event);
    },
    deleteRecord: function (component, event, helper) {
        //Confirm dialog when you click on delete record button it will ask you are you sure to       //delete this record
        if (confirm('Are you sure ?'))
            helper.deleteAccount(component, event);
    }
})