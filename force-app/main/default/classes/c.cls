global class c {
    
    @AuraEnabled
    global static String login(String userName, String password){
        String homeURL = 'https://mahardhitechnologies-dev-ed.develop.my.site.com/s/';
        ApexPages.PageReference PageRef = Site.login(userName, password, homeURL);	
        System.debug('PageReference Url ---->'+PageRef.getUrl());
        return PageRef.getUrl();
        
    }
    
}