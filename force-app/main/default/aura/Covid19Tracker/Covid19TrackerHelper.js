({
    getApiData : function(component) {
        var action = component.get('c.getCovidData');
        
        action.setCallback(this,function(response){
            var state = response.getState();
            
            if(state === 'SUCCESS' || state === 'DRAFT'){
                // alert('SUCCESS');
                var result = response.getReturnValue();
                var resList = response.getReturnValue().countries;
                console.log('result',JSON.stringify(result));
                 console.log('resList',resList);
                
                component.set('v.newConfirmed',result.allstats.NewConfirmed);
                component.set('v.confirmed',result.allstats.TotalConfirmed);
                component.set('v.recovered',result.allstats.TotalRecovered);
                component.set('v.deaths',result.allstats.TotalDeaths);
                
                //List of Data
                
                component.set('v.data',resList);
                component.set("v.totalRecords", resList.length);
                
                //setting start/end page value
                var pageSize = component.get('v.pageSize');
                component.set('v.startPage',0);
                component.set('v.endPage',pageSize-1);
                
                var PaginationList = [];
                for(var i=0; i< pageSize; i++){
                    if(component.get("v.data").length> i)
                        PaginationList.push(resList[i]);
                }
                component.set('v.PaginationList', PaginationList);
                
            }else if(state === 'ERROR'){
                alert('ERROR');
            }else if(state === 'INCOMPLETE'){
                alert('INCOMPLETE');
            }
        },'ALL');
        
        $A.enqueueAction(action);
        
    },next : function(component, event){
        var resCountries = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i=end+1; i<end+pageSize+1; i++){
            if(resCountries.length > i){
                Paginationlist.push(resCountries[i]);
            }
            counter ++ ;
        }
        start = start + counter;
        end = end + counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    previous : function(component, event){
        var resCountries = component.get("v.data");
        var end = component.get("v.endPage");
        var start = component.get("v.startPage");
        var pageSize = component.get("v.pageSize");
        var Paginationlist = [];
        var counter = 0;
        for(var i= start-pageSize; i < start ; i++){
            if(i > -1){
                Paginationlist.push(resCountries[i]);
                counter ++;
            }else{
                start++;
            }
        }
        start = start - counter;
        end = end - counter;
        component.set("v.startPage",start);
        component.set("v.endPage",end);
        component.set('v.PaginationList', Paginationlist);
    },
    
})