import { LightningElement } from 'lwc';
import{Navigationmixin}  from  'lightning/Navigation';

export default class NavService extends Navigationmixin(LightningElement) {


    abc(){

//    this[Navigationmixin.Navigate]({
//type: 'standard__objectPage',
//attributes:{
//    objectApiName:'Opportunity',
//    actionName:'home'
//},

//    })

    //this[Navigationmixin.Navigate]({

    //    type : 'standard__recordPage',
    //    attributes:{
    //        recordId : '0065g00000TasR2AAJ',
    //        objectApiName :'Opportunity',
    //        actionName : 'view'

    //    }
    //})

    this[Navigationmixin.Navigate]({
        type : 'standard__objectPage',
        attributes:{
            ObjectApiName : 'Contact',
            actionName : 'list'
        },
        state:{
filterName :'Recent'
        }
    })

}
}