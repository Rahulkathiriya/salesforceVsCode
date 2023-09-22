public class gettersetter {

    
  /*  public static void propertymethod(){
        
        apexpropertyclass propobject = new apexpropertyclass();
        propobject.propertyint = 500;
        system.debug('peopobject value : '+ propobject);
    }
    
    // create inner class
    public class apexpropertyclass{
        public integer propertyint{
            get{ return propertyint ;}
              //  set{propertyint = value;}
        }
    } */
    
    
    // only for value read krva get (getter no implimation)
    public static void p1(){
       pro1 a1 = new pro1();
        system.debug('pro1 value :'+ a1.pppp1111);
    }
    
    
    //inner class
    public class pro1{
       // property impalimetation
        
        public string pppp1111{
            get{return '1000';}
           // set{;}
        }
    }



    
}