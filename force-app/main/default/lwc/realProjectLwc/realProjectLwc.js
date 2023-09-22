import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class RealProjectLwc extends LightningElement {
 
    myTittle = "Jay Shree Ram";
    
    //handleClick(){
    //    //window.alert("hello bhai:",this.myTittle);
    //  this.showToast(this.myTittle);
    //}

    
    //showToast(firstToastTitle){
    //     const event = new ShowToastEvent({
    //        title: firstToastTitle,
    //        message: 'Want to Display Toast Example',
    //        variant: 'success'
    //     });
    //     this.dispatchEvent(event);
    //}

    connectedCallback(){
        let callMyFunction = this.myFunction(10 , 2);
        console.log(callMyFunction);
    }

    //myFunction(dividend , deviser){
    //    return(dividend/deviser);
    //}

    myFunction = (dividend , deviser) => {
        return(dividend/deviser);
    }

    
}