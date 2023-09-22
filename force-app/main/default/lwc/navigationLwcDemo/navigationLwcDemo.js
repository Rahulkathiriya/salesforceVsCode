import { LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
 
export default class NavigationLwcDemo extends NavigationMixin(LightningElement) {


 

    handleClickNavigation(){

        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes:{
                recordId : '0015g0000110DNIAA2',
                objectApiName : 'Account',
                actionName : 'edit'
            },
       
        })
    }

}