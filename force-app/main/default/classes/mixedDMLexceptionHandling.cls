public class mixedDMLexceptionHandling {
    
    
    public static void dmlOnSetupAndNonSetup(){
        
        try{
            profile p =[SELECT Name, Id FROM Profile where Name = 'Sales User Lead'];
            userRole r = [SELECT Name, Id FROM UserRole where Name = 'CEO'];
            
            User CreateUser =  new User ();
            CreateUser.Alias  = 'DPatel';
            CreateUser.Email = 'kishanviran01@gmail.com';
            CreateUser.EmailEncodingKey = 'UTF-8';
            CreateUser.LastName = 'MyUser';
            CreateUser.LanguageLocaleKey = 'en_US';
            CreateUser.LocaleSidKey = 'en_US';
            CreateUser.ProfileId = p.Id;
            CreateUser.UserRoleId = r.Id;
            CreateUser.TimeZoneSidKey = 'America/Los_Angeles';
            CreateUser.Username = 'Dpatelh1@gmail.com';
            insert CreateUser;
            system.debug('CreateUser----------->'+CreateUser);
        }
        catch(exception e){
             system.debug('exception is ==  '+ e.getStackTraceString());
             system.debug('exception is message ==  '+ e.getMessage());
        }
        
        
    }
}