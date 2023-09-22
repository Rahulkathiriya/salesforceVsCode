({
	conPopup : function(cmp,event,helper) {
        cmp.set("v.open",true);
        
        cmp.set('v.changeheadName','Account to Contact');
        cmp.set('v.COLUMNS', [
            {label: 'AccToCon' , fieldName : 'LinkAcc' , type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}} 
        ]);  
        console.log('gdfgf--->',JSON.parse(JSON.stringify(cmp.get('v.accRelCon'))));
       cmp.set("v.DATA",cmp.get('v.accRelCon'));
        
        
	},
    
    OppPopup : function(cmp,event,helper) {
        cmp.set("v.open",true);
         cmp.set('v.changeheadName','Account to Oppurtunity');
        cmp.set('v.COLUMNS', [
            {label: 'AccToOpp' , fieldName : 'LinkOpp' , type: 'url', typeAttributes: {label: { fieldName: 'Name' }, target: '_blank'}} 
        ]);  
        console.log('gdfgf--->',JSON.parse(JSON.stringify(cmp.get('v.accRelOpp'))));
       cmp.set("v.DATA",cmp.get('v.accRelOpp'));
        
        
	},
    CasesPopup : function(cmp,event,helper) {
        cmp.set("v.open",true);
         cmp.set('v.changeheadName','Account to Cases');
        cmp.set('v.COLUMNS', [
            {label: 'AccToCases' , fieldName : 'LinkCases' , type: 'url', typeAttributes: {label: { fieldName: 'AccountName' }, target: '_blank'}}, 
            {label: 'Status' , fieldName : 'Status' , type: 'Picklist'}, 
            {label: 'Origin' , fieldName : 'Origin' , type: 'Picklist'} 
        ]);  
        console.log('gdfgf--->',JSON.parse(JSON.stringify(cmp.get('v.accRelCase'))));
       cmp.set("v.DATA",cmp.get('v.accRelCase'));
        
        
	},
    NoteAttachPopup : function(cmp,event,helper) {
        cmp.set("v.open",true);
         cmp.set('v.changeheadName','Account to Note Attchment');
        cmp.set('v.COLUMNS', [
            {label: 'AccToNoteAttch' , fieldName : 'Name' , type: 'text'} 
        ]);  
        console.log('gdfgf--->',JSON.parse(JSON.stringify(cmp.get('v.accRelNoteAttch'))));
       cmp.set("v.DATA",cmp.get('v.accRelNoteAttch'));
        
        
	},  
    
})