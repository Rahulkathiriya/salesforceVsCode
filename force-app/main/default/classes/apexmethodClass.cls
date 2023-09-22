public class apexmethodClass {
 
     public static void demomethod(){
         
         // pass by value 
         string s = 'dhruvil';
         primitivedatatype(s);
         system.debug(' s value '+ s);
   
       
     }
     
     //string s ni value niche j method aaapi se tema add thay gay
     //aama uper method ma s value define kari se te sidhi pahela para meter ma aavi jay
     
     
     
     public static  void primitivedatatype( string mystring ){
         system.debug('mystring :' + mystring);
         
     //jyare mystring ni value change karvama aave tyare change thay jay se
         
    mystring = 'patel';
         system.debug('new Mystring value :' + mystring);
         
     }
}