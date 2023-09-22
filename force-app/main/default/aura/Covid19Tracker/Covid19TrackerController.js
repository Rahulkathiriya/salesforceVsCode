({
    doInit : function(component, event, helper) {
        component.set('v.columns', [
            {label: 'Country', fieldName: 'Country', type: 'text'},
            {label: 'New Confirmed', fieldName: 'NewConfirmed', type: 'text'},
            {label: 'Total Confirmed', fieldName: 'TotalConfirmed', type: 'text'},
            {label: 'New Recovered', fieldName: 'NewRecovered', type: 'text'},
            {label: 'Total Recovered', fieldName: 'TotalRecovered', type: 'text'},
            {label: 'New Deaths', fieldName: 'NewDeaths', type: 'text'},
            {label: 'Total Deaths', fieldName: 'TotalDeaths', type: 'text'},
        ]);
            helper.getApiData(component);
            
            },
            // function automatic called by aura:waiting event
            showSpinner: function(component, event, helper) {
            // make Spinner attribute true for displaying loading spinner
            component.set("v.spinner", true);
            },
            
            // function automatic called by aura:doneWaiting event
            hideSpinner : function(component,event,helper){
            // make Spinner attribute to false for hiding loading spinner
            component.set("v.spinner", false);
            },
            next: function (component, event, helper) {
            helper.next(component);
            },
            previous: function (component, event, helper) {
            helper.previous(component);
            },
            })