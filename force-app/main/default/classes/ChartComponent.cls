public with sharing class ChartComponent {
    
    @AuraEnabled(cacheable=true)
    public static List<ChartDynamic> getChartData(){
        
        List<ChartDynamic> ChartData = new List<ChartDynamic>();
        
        Map<String, Integer> ratingCount = new Map<String, Integer>();
        
        for(AggregateResult acc : [ select Rating, Count(Id)chartIdCount from Account GROUP By Rating ] ){
            ratingCount.put((String)acc.get('Rating'), Integer.valueOf(acc.get('chartIdCount')));     
        }
        
        for(String rating : ratingCount.keyset()){
            ChartData.add( new ChartDynamic (rating, ratingCount.get(rating)));
        }
       // system.debug('ChartData-->'+ChartData);
        return ChartData;
    }
    
    public class ChartDynamic {
        
        @AuraEnabled 
        public String label;
        @AuraEnabled
        public Integer count;
        
        public ChartDynamic(String label, Integer count){
            this.label = label;
            this.count = count;
        }
        
    }
    
}