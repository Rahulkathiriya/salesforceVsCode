public class demo5method {

    
    public static void demomethod(){
       integer i =  testmethods(10);
        system.debug('demomethod value :' + i);
    }
    
    public static integer testmethods(integer gotvalue){
       integer k =30 + gotvalue;
        system.debug('testmethods value :'+ k);
        return k;
    }
}