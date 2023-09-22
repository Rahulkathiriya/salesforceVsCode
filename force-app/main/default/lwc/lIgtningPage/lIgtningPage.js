import { LightningElement } from 'lwc';
import{NavigationMixin} from 'lightning/navigation';

export default class LIgtningPage extends NavigationMixin(LightningElement) {
    Init(){

 
        // object specific record edit
        //this[NavigationMixin.Navigate]({
        //    type : 'standard__recordPage',
        //    attributes : {
        //        recordId : '0015g000017ztBjAAI',
        //        objectApiName : 'Account',
        //        actionName : 'edit'
        //    },
        //});


        //web browser page refrence
        //this[NavigationMixin.Navigate]({
        //    type : 'standard__webPage',
        //    attributes : {
        //        url : 'https://youtu.be/QE2AhqzUmxs'
        //    },
        //});


        //object specific record create,edit,view 
        //this[NavigationMixin.Navigate]({
        //    type : 'standard__recordPage',
        //    attributes : {
        //        recordId : '5005g00000fBbCjAAK',
        //        objectApiName : 'Case',
        //        actionName : 'new',
        //        actionName : 'edit',
        //        actionName : 'view'
        //    },
        //});


        //this[NavigationMixin.Navigate]({
        //    type : 'custom__objectPage',
        //    attributes : {
        //        objectApiName :'grensi__Battle_Station__c',
        //        actionName : 'home'
        //    },
        //})

        this[NavigationMixin.Navigate]({
            type : 'standard__navItemPage',
            attributes : {
                apiName :'Filter_Page'
            },
        });
    }

}