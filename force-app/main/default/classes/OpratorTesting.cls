public class OpratorTesting {

    
    public static void exp(){
    /*    1]      string x = 'dhruvil';
            string y = 'vegad';
      string termaryresult = x==y ? 'patel': 'kanbi';
        system.debug('exact equality    ' +termaryresult); */
        
    /* 2]  integer x =2;
                system.debug('x values  '+ x);
        integer y = X++; 
        system.debug('y values  '+ y);
        system.debug('x1 values  '+ x); */
       
    /* 3]  integer a =15;
        integer b =5;
        integer z;
        
    
     if(a==b){
            z = a+b;
            system.debug('true');
            system.debug('z value '+z);
        }else{
            z= a-b;
            system.debug('a bigger than b');
               system.debug('z value '+z);
        } 
        
     if(a!=b){
            z = a+b;
            system.debug('true');
            system.debug('z value '+z);
        }

        z =a-b;
           system.debug('false');
            system.debug('z value '+z);
        
        // aama jo condition uper mujab sachi se to true value prine thay ane false value print thay (banne value print thay) 
        */
        
        
  /*  5]    integer x=20;
        integer y=20;
        
        
        if( x <= y){
            system.debug('x is lesser or equale y');
            if(x != y){
                system.debug('x is equale equale y');
            }else{
                   system.debug('x is not equale  y');
            }
            
        }else{
               system.debug('x is greterthan y');
        } */
        
        
        
   /* 6]    // num =1, player name is dhruvil;
        // num =2 , player name is ravi;
        // num =3, player name is Dhrunal;
        integer num =200;
        integer num2 =10;
        string Player ;
        
        if(num == 1){
            Player = 'Dhruvil';
            system.debug('Dhruvil value'+Player);
            
        }else if(num == 2){
            Player = 'Ravi';
               system.debug('Ravi value'+Player);
        }else if(num == 3){
             Player = 'Dhrunal';
               system.debug('Dhrunal value'+Player);
        }
        else{
            system.debug('num value not declare');
        } 
        */
        
        
      /*  //khali soql query id name get karva mate  je aksathe 5 sey print thay
        List<Account> accList = [SELECT Id,Name FROM Account LIMIT 5];
        system.debug('accList :'+ accList);
        
        //for loop thi soql quary ak variable define kari print kravva jema ak ak recod detail ak ak line  ma print thay
        for( Account a1:accList){
            
            //if condition mukvathi te variable  nu perticular value hoy to tena record ni value (field ) id name print thay 
            if(a1.Name =='GenePoint'){
                system.debug('a1 name correct:' +a1);
            }
            system.debug('a1:' +a1.Name); 
        }

*/
        //for loop ma direct soql query run karavvi hoy tyare(for loop dwara soql no upyog)
        for(Account a111 : [SELECT Id,Name FROM Account LIMIT 3]){
            if(a111.Name == 'GenePoint' || a111.Name == 'United Oil & Gas, UK'){
                system.debug('a111 Value ' + a111);
            }else{
                system.debug('condition is wrong');
            }
           //system.debug('SOQL  Query :'+ a111);
        }
        
    } 
}