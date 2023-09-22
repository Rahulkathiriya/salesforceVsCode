public class PokemonClass {
    
    @AuraEnabled
    public static List<grensi__Pokemon__c> getPokemons(string searchKey){
        
        if(searchKey != ''){
            string key = '%'+searchKey+'%';
            List<grensi__Pokemon__c> pokemonSearchList = [select Id,Name,grensi__Height__c,grensi__Width__c,grensi__Images__c,grensi__Trainer__r.Name from grensi__Pokemon__c
                                                          where Name LIKE : key];
            return pokemonSearchList;
            
        }
        else{
            List<grensi__Pokemon__c> pokemonList = [select Id,Name,grensi__Height__c,grensi__Width__c,grensi__Images__c,grensi__Trainer__r.Name from grensi__Pokemon__c];
            
            if(!pokemonList.isEmpty()){
                return pokemonList;
            }
            return null;
        }
        
    }
    
    
}