public class aa1 {

    
  /*  public static void b1(){
Integer totalGuests = 100;
Integer totalAmountSugar = 159;
Integer totalAmountTea = 35;

        
        do{
            totalGuests--;
            totalAmountSugar--;
            totalAmountTea--;
            system.debug(totalGuests +'allvalue for suger tea guest');
            
            if(totalAmountSugar == 0 || totalAmountTea == 0){
                system.debug('   Print totalAmountSugar    '+ totalAmountSugar + '   Print totalAmountTea   ' + totalAmountTea);
                break;
}
        }while(totalGuests >0);
} */
    
 
 /* public static Integer wilt(Integer numberOfPetals){
        if(numberOfPetals >= 1){
            numberOfPetals--;
            system.debug(numberOfPetals);
        }
        return numberOfPetals;
    } */
    
    public static void grow(Integer height, Integer maxHeight){
        height = height + 2;
        system.debug(height + 'height');
        if(height >= maxHeight){
            system.debug(height + 'height');
            pollinate();
        }
    }
    public static void pollinate(){
        System.debug('Pollinating...');
        
    } 
    
    
}