// an apex page controller that exposes the site login functionality

global with sharing class ComunitiesLoginController {
    global ComunitiesLoginController(){}
    
    // forward Authontication Page
    
    global PageReference forwardToAuthPage() {
        String startUrl = System.currentPageReference().getParameters().get('startURL');
        System.debug('starUrl--->'+startUrl);
        String displayType = System.currentPageReference().getParameters().get('display');
        System.debug('displayType--->'+displayType);
        return Network.forwardToAuthPage(startUrl, displayType);
    } 
    
  
    
}