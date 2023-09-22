public class ifelse {

   public static void e1(){
        string name = 'dhruvil';
        string name2 = 'smit';
        system.debug(name==name2);
        
        if(name==name2){
           system.debug('yes'); 
        }else if(name!=name2){
            system.debug('not');
        }else if(name != name2){
            system.debug('or method');
        }
        
        else{
            system.debug('no');
        }
    } 
   
    public static void i1(String userNameInput, String passwordInput){
        
   String userName = 'dhruvil@123.com';
        String password = 'dhruv#1423';
        if(userName == userNameInput && password == passwordInput ){
            system.debug('you are login in');
        }else if(userName != userNameInput){
            system.debug('username is wrong');
        }else if(password != passwordInput){
              system.debug(' password is wrong'); 
        }
        
        
        else{
            system.debug('not your password and username');
        }
    }  
    
    public static void sorting(string appleColor){
        if(appleColor == 'green'){
            system.debug('apple  is green');
        }else if(appleColor == 'red'){
            system.debug('apple  color red');
        }else if(appleColor == 'yellow'){
            system.debug('apple   color yellow');
        }else {
            system.debug('your apple color not valid');
        }
        
    }
    
   public static void sw1( string dhruvil){
        switch on dhruvil{
            when 'd'{
                system.debug('latter is d');
            } 
            when 'h'{
                 system.debug('latter is h'); 
            }
              when 'r'{
                 system.debug('latter is r'); 
            }
              when 'u'{
                 system.debug('latter is u'); 
            }
              when 'v'{
                 system.debug('latter is v'); 
            }
              when 'i'{
                 system.debug('latter is i'); 
            }
              when 'l'{
                 system.debug('latter is l'); 
            }
            when else{
                system.debug('not latter dhruvil name ');
            }
        }
    }  
    
    public static void apple(integer apple1){
        switch on apple1{
            when 1 {
                system.debug('apple is add 1111 integer');
            }
            when 2{
                system.debug('apple is add 22222 integer');  
            }
            when 3 {
                system.debug('apple is add 333333 integer');
            }when else{
                system.debug('apple not add valid intger');
            }
        }
    }
    
    
}