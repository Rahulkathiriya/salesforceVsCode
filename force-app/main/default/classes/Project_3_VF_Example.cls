public class Project_3_VF_Example {
    
    public Account acc 			{set;get;}
    public Contact con 			{set;get;}
    public String prodName 		{set;get;}
    public Integer quantity 	{set;get;}
    public Decimal tax     		{set;get;}
    public Decimal unitprice 	{set;get;}
    
    public Project_3_VF_Example (){
        acc = new Account();
        con = new Contact(); 
    }
    public void callMe(){
        Integer count = [select count() from Account where  Name =: acc.Name];
        if(count > 0){
            acc = [select Id,Name,Industry,Rating,Ownership,(select LastName, FirstName ,Phone, OtherPhone, MobilePhone,  Email from Contacts where grensi__Primary__c = true  ) from Account where Name =: acc.Name];
            con = acc.contacts[0];   
        }
    }
    public void abc(){ 
        Product2 prod = [select Id,Name, grensi__Tax__c from Product2 where Name =: prodName]; 
        tax = prod.grensi__Tax__c;
        PriceBook2 price = [select Id from PriceBook2 where Name = 'Standard Price Book'];
        PricebookEntry entry =[select Id, UnitPrice from PricebookEntry where Product2Id =: prod.Id AND priceBook2Id =: price.Id];
        unitprice = entry.UnitPrice;  
    }
}