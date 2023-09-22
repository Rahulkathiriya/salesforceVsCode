({
    
    scriptsLoaded : function(cmp, event, helper) {
        
        var ctx = cmp.find('myChart').getElement();
        
        cmp.myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                
                labels:[ "United Oil & Gas Corp","Test Account","Satish Shah"],
                datasets:[{
                    label: '# of Chart',
                    backgroundColor: [ rgb(255, 0, 0),rgb(255, 160, 122), rgb(255, 20, 147)],
                    borderColor: [rgb(255, 0, 0),rgb(255, 160, 122), rgb(255, 20, 147)],
                    borderWidth: 1
                }] 
                
            },
            
            options: { 
                responsive: true,
                scales: {
                    xAxes: [{
                        ticks:{
                            beginAtZero:true,
                        }
                    }],
                       yAxes: [{
                        ticks:{
                            beginAtZero:true,
                        }
                    }]
               },   
            } 
            
        }); 
	},
    
	doInit : function(cmp,event,helper) {
        helper.myDoInit(cmp,event,helper);
		
	}
})