public class con1 {

    
 /*  1)  public static void Number1(integer num1){
        
        if(num1 > 0){
            system.debug('Positive number' + num1);
        }
        else if (num1 < 0){
            system.debug('Nagative number' + num1);
        }
        else
        {
          system.debug('Number is zero' + num1);  
        }
    } */
    
  /* 2)  public static void odd1(integer x){
        integer y=x/2;
        integer z=y*2;
        
        if(x == z){
            system.debug('even number'+ x);
        }else{
              system.debug('odd number'+ x);
        }
    } */
    
  /* 3)  it is wrong programe
     public static void leap1(integer l1){
        if(  math.mod (l1,400) == 0){
            system.debug(' leap year'+l1);
        }else{
             system.debug('bean leap year'+l1);
        }
    } */
    
 /*   public static void g1(){
        integer a = 10;
        integer b = 20;
        integer c = 30;
        integer d = 40;
        
        if(a <= b){
            system.debug('b is biggerthan a :' +a);
        }else if( a <= c ){
             system.debug('c is biggerthan a :' +a);
        }else if( a <= d ){
             system.debug('d is biggerthan a :' +a);
        }else{
            system.debug('input number biggerthan  a');
        }
        
        
    } */
    
 /*  public static void n1( integer a1,integer b1){
        if( a1 < b1){
            system.debug('b is beggier than a : ' +a1);
        }else if( a1 > b1 ){
           system.debug('a is beggier than  a : '+a1); 
        }else if( a1 == b1){
             system.debug('a and b value sam :' +a1);
        }
        else{
            system.debug( 'value not comparing' +a1);
        }
    } */
    
    
 /*   public static void voting1( integer v1){   //nested loop and ledder
        if(v1 >= 18){
            system.debug('you are voting :' +v1);
        }else {
            system.debug('you are not voting :' + v1);
        }
    } */
    
   
    
    /* public static integer voting1(integer a,integer b, integer c, integer d){
integer big;


if ( a > b)
{
if ( a > c)
{
if ( a > d)

big = a;
else
big = d;
}
else
{
if( c > d)
big = c;
else
big = d;
}
}
else 
if( b > c)
{ 
if ( b > d)
big =b;
else
big =d;
}

else if ( c > b)
{
big = c; 
}else {
big = b;
}
return big;
} */
    
    
   /*  public static void n11(  integer a1, integer a2,integer a3,integer a4 ){
        
        
        if( a1 >= a2 && a1 >= a3 && a1 >= a4)
            
        { system.debug('a1 is high number :'+a1);
         
        }
        else if(a2 >= a1 && a2 >= a3 && a2 >= a4)
        { 
             system.debug('a2 is high number :'+a2);
        }
        else if (a3 >= a1 && a3 >= a2 && a3 >= a4) {
             system.debug('a3 is high number :'+a3);
        }     
         else if (a4 >= a1 && a4 >= a2 && a4 >= a3) {
             system.debug('a4 is high number :'+a4);
        }  
        else{
            system.debug('this selected number is small with a1 competion');
        }
        
    
        } */
    
    
    
  /* 6)  public static void sub1(integer a, integer b){
      integer c = a+b;
        system.debug('a value addition 2 value:' +c);
        
        integer d = a-b;
   system.debug('a value subtraction 2 value:' +d);
        
        integer f = a*b;
         system.debug('a value multiplication 2 value:' +f);
        
       integer e = a/b;
         system.debug('a value divison 2 value:' +e);
      
    } */
    
  /* 7) public static void swapping(integer x, integer y){
       integer x1 = y; 
        integer y1 = x;
        system.debug('x value is :'+ x1);
           system.debug('y value is :'+ y1);
    } */
    
  /* 8) public static void f1(integer a){
        integer celsuis =a;
        
      celsuis   = celsuis * (9/5) + 32;
       // farenheit = ((farenheit - 32)*5)/9;
       // 
        system.debug('celsuis to farenheit :'+ celsuis);
        
        
    } */
    
 /*   public static double salary1(double basesalary){
        double result;
        double HRA;
        double DA;
        double TA;
        
        HRA = 10/100.0  * basesalary;
        system.debug('hra' + HRA );
        
        DA =  5/100.0  *  basesalary;
        system.debug('da' + DA);
        
        TA = 8/100.0 * basesalary;
        system.debug('ta' + TA);
        
        result = basesalary +HRA +DA +TA;
        system.debug('result'+result);
        
        return result;
    }  */
   
    
  /* 9)  public static void circal(Decimal c1){
        
         Decimal v1 = 3.14*c1*c1;
        system.debug('circal '+ v1);
        
    } */
    
 /* 10)   public static void triangle(Decimal x,Decimal y){
        decimal t1 = 0.5*x*y;
        system.debug('triangle '+ t1);
    } */
    
  /* 11)   public static void intrest(integer x, integer y ,integer z){
        integer i1 =x*y*z/100;
        system.debug('intrest '+ i1);
    } */
    
  /*  12) public static void month(integer x){
        switch on x{
            when 1{
                system.debug('month is january'+ x);   
            }
               when 2{
                system.debug('month is february'+ x);   
            }
               when 3{
                system.debug('month is march'+ x);   
            }
               when 4{
                system.debug('month is aprile'+ x);   
            }   when 5{
                system.debug('month is may'+ x);   
            }   when 6{
                system.debug('month is june'+ x);   
            }   when 7{
                system.debug('month is jaluly'+ x);   
            }   when 8{
                system.debug('month is augest'+ x);   
            }   when 9{
                system.debug('month is september'+ x);   
            }   when 10{
                system.debug('month is octomber'+ x);   
            }
             when 11{
                system.debug('month is november'+ x);   
            }
   
            when 12{
                system.debug('month is dicember'+ x);   
            }

        }
    }  */
    
 /*  13)  public static void week(string x){
        
        if ( x == 'm'){
            system.debug('m for monday'+ x);
        }else if ( x == 't'){
            system.debug('t for tuesday' + x);
        }else if ( x == 'w'){
            system.debug('w for wednesday' + x);
        }else if ( x == 'th'){
            system.debug('th for thursday' + x);
        }else if ( x == 'f'){
            system.debug('f for friday' + x);
        }else if ( x == 's'){
            system.debug('s for saturday' + x);
        }else if ( x == 'su'){
            system.debug('su for sunday' + x);
        }else{
            system.debug('not day' +x);
        }
        
    } */
    
   /*  14) public static void calculater(integer a ,integer b, integer ans){
     
        switch on ans{
            when 1{
                system.debug('a sum b'+ a+b);
            } //when 2{
               // system.debug('a dicrement  b'+ a-b);
          //  } 
           when 3{
                system.debug('a multi b'+ a*b);
            } when 4{
                system.debug('a divison  b'+ a/b);
            }  when else{
                system.debug('default');
            }
        }
    }   */
    
  /*  15) public static integer subcal(integer phy, integer chem, integer bio, integer math, integer com){
      
        integer result;
        
        result = (phy+chem+bio+math+com)/5;
        
        // this condition is all user input value under 100
        if(result >101){
            system.debug('your input num not allow'); 
        
        }else if(result >= 90/100 ){
           system.debug('A grade :'+ result); 
            
        }else if (result >= 80/100){
            system.debug('B grade :'+ result);
            
        }else if (result >= 70/100){
            system.debug('C grade :'+ result);
            
            
        }else if (result >= 60/100){
            system.debug('D grade :'+ result);
            
        }else if (result >= 50/100){
            system.debug('E grade :'+ result);
            
        }else if (result >= 40/100){
            system.debug('F grade :'+ result);
            
        }else{
            system.debug('you are not pass this exam '+result);
        }
        
        return result;
    }
    */
    
  /*  16) public static integer leddercal(integer a,  integer b,integer c,integer d)
    {
        integer big;
 
    if( a > b)
    {
        if ( a > c)
        {
            if( a > d)
                big =a;
            
            else
                big =d;  
        }
        else
        {
            if( c > d)
                big =c;
            else
                big =d;
        }
    }
    else
   
        if ( b > c)
        {
            if( b > d)
                big = b;
            else
                big =d;
        }
        else if ( c < b)
        {
            big = c;
        }
        else
        {
            big = b;
        }
          return big;
    } */
    
    
   /* 17) public static void whethertri(integer a,integer b,integer c){
        
      integer sum= a+b+c;
        if( sum == 180  &&  a > 0  && b > 0  &&  c > 0){
            system.debug('This  Angle valid');
        }else{
            system.debug('This  Angle not Valid');
        }
    } */
    
  /* 18)  public static void num1(){
        integer n1 =-37;
        integer n2 = 67;
        
        if( n1 >= n2){
           system.debug('n1 is positive') ;
        }else{
            system.debug('n1 is negative');
        }
        
    }*/
    
    

}