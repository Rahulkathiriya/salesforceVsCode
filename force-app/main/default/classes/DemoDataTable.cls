public class DemoDataTable {
	@AuraEnabled
    public static List<Opportunity> getopp(){
        return [select Id,Name,CloseDate,StageName,ForecastCategoryName from Opportunity ];
    }
}