public class loopfirst {

    public static void loopf1(){
        integer i=1;
        do{
            system.debug(i);
            i++;
        }while(i<=10);
    } 
    
    public static void loop2(){
        integer i = 1;
        while( i<= 15){
            system.debug('while loop  '+i);
            i++;
        }
    } 
    
    public static void forloop(){
     
        for(integer j = 0; j <= 30; j++){
            system.debug('print for loop'+ j);
        }
            } 
    
    public static void listloop(){
        
        list<string> strlist = new list <string> {'dhruvil', 'smit', 'vaibhav', 'dhrunal'};
            for(string dh:strlist){
                system.debug(dh);
            }
    } 
    
    
        
}