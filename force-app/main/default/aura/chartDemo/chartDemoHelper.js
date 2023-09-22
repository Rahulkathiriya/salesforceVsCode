({
    myDoInit : function(cmp,event,helper) {
        var action = cmp.get("c.getContactData");
        
        action.setCallback(this,function(r){
            var state = r.getState();
            if(state === 'SUCCESS'){
                var contacts = r.getReturnValue();
                console.log('result chartdata-->',contacts);
                this.setData(cmp,event,contacts);
            }
        });
        $A.enqueueAction(action);
    },
    
    setData: function(cmp,event,contacts){
         if(cmp.myChart && cmp.myChart.data && cmp.myChart.data.datasets[0]){
            var contacts = contacts;
            	if(contacts && Array.isArray(contacts)){
                    var map = {};
                    
                    contacts.forEach( (contacts) =>{
                        console.log('contacts-->',contacts);
                        map[contacts.Account.Name.replace(/ /g, '_')] = (map[contacts.Account.Name.replace(/ /g, '_')] || 0) + 1;
                     
              //  map = [contacts.Account.Name.replace(/ /g, '_')];
                        console.log('map--->'+map);
                    });
                       	
                   		var data = [
                        	map.United_Oil_&_Gas_Corp || 0,
                        	map.Test_Account || 0,
                        	map.Satish_Shah || 0,
                        	];
                        cmp.myChart.data.datasets[0].data = data;

                        cmp.myChart.update();
            	}
         
        }
    } 
})