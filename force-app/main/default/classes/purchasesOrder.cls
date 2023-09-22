public class purchasesOrder {
 
    public static void orderSum(){
        EmploypurchacesOrder e1 = new EmploypurchacesOrder();
        double ans  = e1.discount();

        system.debug('employ discount is : ' + ans);
        
        CustemerpurchasesOrder c1 = new CustemerpurchasesOrder();
        double answer = c1.discount();
        system.debug('custemer discount is :' + answer);
    }
}