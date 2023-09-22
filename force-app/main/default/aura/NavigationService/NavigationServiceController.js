({
    navigation : function(cmp, event, helper) {
        var navser = cmp.find("navService");

        var pagerefrence ={
            type : 'standard__objectPage',
            attribute:{
                objectApiName: 'Account',
                actionNAme : 'home'
            },
        };
       
            cmp.set("v.pagerefrence",pagerefrence);
            var  defaultUrl = '#';
            navser.generateUrl(pagerefrence)
            .then($A.getCallback(function(url) {
                cmp.set("v.url", url ? url : defaultUrl);
            }), $A.getCallback(function(error) {
                cmp.set("v.url", defaultUrl);
            }));
    }
})