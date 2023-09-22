public class passbymethod {

    public static void demomethod(){

        demo3(true);
    }
    public static void demo1(integer k){
        system.debug('demo1 value is :'+ k);
    }
     public static void demo2(string s){
        system.debug('demo2 value is :'+ s);
    }
     public static void demo3(boolean b){
         if( b == true){
           
         system.debug('demo3 value is :'+ b);     
             b = false;
  system.debug('demo3 value is :'+ b);
         }else{
          system.debug('demo 3 not value');   
         }
       
    }
}