public class StringArrayTest {

    public static List<String> generateStringArray( Integer n){
       
        List<String> listString = new List<String>();
        
        for( Integer i=0; i<n; i++ ){
            listString.add('Test' + i);
            system.debug(listString[i]);
        }
        return listString;
    }

}