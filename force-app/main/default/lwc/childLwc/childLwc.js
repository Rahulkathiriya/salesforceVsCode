import { LightningElement,api } from 'lwc';

export default class ChildLwc extends LightningElement {

    //handleSubtract(){

    //    this.dispatchEvent(new CustomEvent ('subtract'));
    //}

    //handleAdd(){
    //    this.dispatchEvent(new CustomEvent ('add'));

    //}


    //handleMultiple(event){
    //    const valueForMultiply = event.target.value;


    //    this.dispatchEvent(new CustomEvent ('multiply' ,{
    //            detail : valueForMultiply
    //    }))
    //}

    @api counter = 0;

    @api maximizeCounter(){
        this.counter += 100;
    }

}