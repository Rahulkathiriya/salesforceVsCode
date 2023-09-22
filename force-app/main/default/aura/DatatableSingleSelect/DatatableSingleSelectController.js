({
    doInit : function(component, event, helper) {
        
        component.set('v.COLUMNS',[
            {label: 'Name', fieldName: 'Name', type: 'text'},
            {label: 'Phone', fieldName: 'Phone', type: 'text'},
            {label: 'Industry', fieldName: 'Industry', type: 'text'},
            {
                label: 'Select',
                type: 'button',
                typeAttributes: {
                    label: 'Select',
                    name: 'selectButton',
                    title: 'Select',
                    disabled: false,
                    value: 'select',
                    variant: 'neutral'
                }
                
            }
        ]);
        
        helper.fetchData(component,event,helper);
    },
    
    onRowHandler :function(component, event, helper) {
        

        
    } 
})