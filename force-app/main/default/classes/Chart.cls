public with sharing class Chart {
    
    @AuraEnabled(cacheable=true)
    public static List<DataSet> getAllAccByRating(){
        
        List<AggregateResult> result = [select Count(Id) cnt,Rating from Account group by Rating limit 10];
        
        List<DataSet> dataSet = new List<DataSet>();
        
        for(AggregateResult ar : result){
            String status = (String)ar.get('Rating');
            Integer total = (Integer)ar.get('cnt');
            dataSet.add(new DataSet(status, total)); 
        }
        System.debug('dataSet-->'+dataSet);
        return dataSet;
    }
    
    public class DataSet {
        @AuraEnabled
        public String label;
        
        @AuraEnabled
        public Integer count; 
        
        public DataSet(String label, Integer count){
            this.label = label;
            this.count = count; 
        } 
    } 
}