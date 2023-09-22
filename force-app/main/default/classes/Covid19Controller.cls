public class Covid19Controller {
@AuraEnabled
public static Covid19Parser getCovidData(){
string baseURL = 'https://api.covid19api.com/summary';
HTTPRequest request = new HTTPRequest();
request.setEndpoint(baseURL);
request.setMethod('GET');
request.setHeader('Accept', 'application/json');
HTTP H = new HTTP();
HttpResponse response = h.send(request);

Covid19Parser prsr = Covid19Parser.parse(response.getBody().replace('"Global":','"AllStats":'));
return prsr;
}

}