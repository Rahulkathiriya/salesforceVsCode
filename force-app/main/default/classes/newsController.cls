public with sharing class newsController {
    
    @AuraEnabled
    public static Map<String,Object> retriveNews(){
        HttpRequest httpRequest = new HttpRequest();
        //    httpRequest.setEndpoint('https://newsapi.org/v2/everything?q=tesla&from=2023-06-24&sortBy=publishedAt&apiKey=0f34e3415af7423d8790eabc9a491210');
        //    httpRequest.setEndpoint('https://newsapi.org/v2/everything?q=apple&from=2023-07-23&to=2023-07-23&sortBy=popularity&apiKey=0f34e3415af7423d8790eabc9a491210');
        httpRequest.setEndpoint('https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=0f34e3415af7423d8790eabc9a491210');
        httpRequest.setMethod('GET');
        System.debug('httpRequest-->'+httpRequest);
        
        
        Map<String,Object> newsJsonData = new Map<String,Object>();
        String strResponse = null;
        
        try{
            Http http = new Http();
            HttpResponse httpResponse = http.send(httpRequest);
            if(httpResponse.getStatusCode() == 200){
                strResponse = httpResponse.getBody();
                system.debug('strResponse--->'+strResponse);
            }else{
                throw new CalloutException(httpResponse.getBody());
            }
            
        }catch(Exception e){
            throw e;  
        }
        
        if(!String.isBlank(strResponse)){
            newsJsonData = (Map<String,Object>)JSON.deserializeUntyped(strResponse);  
            system.debug('newsJsonData--->'+newsJsonData);
        }
        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        }else{
            return null;
        }
        
        
    }
    
}