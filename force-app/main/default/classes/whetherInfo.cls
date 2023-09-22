public class whetherInfo {
    
    @AuraEnabled(cacheable=true)
    public static String getTemp(String city){
        
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        request.setEndpoint('http://api.weatherapi.com/v1/current.json?key=4cc0fbf749c54eb3ba835855231708&q='+city+'&aqi=no');
        request.setMethod('GET');
        
        HttpResponse response = http.send(request);
        response.getStatusCode();
        if(response.getStatusCode() == 200){
            system.debug('response-->'+ response.getBody());
            return response.getBody();
        }
        return null;
    }
    
}