import { LightningElement } from 'lwc';

export default class ParentLwc extends LightningElement {

    //countValue= 0 ;

    //handleDecrement(){
    //    this.countValue--;
    //}

    //handleIncrement(){
    //    this.countValue++;

    //}

    //handleMulti(event){
    //    const multiplyingNumber = event.detail;
      

    //    this.countValue *= multiplyingNumber;
    //}


    startCounter = 0;

    handleStartChange(event){
        this.startCounter = parseInt(event.target.value);
    }

    handleMaximizeCounter(){
        //const updateCounter = this.template.querySelector('c-child-lwc');
        //updateCounter.maximizeCounter;
       
        //same to same 

        this.template.querySelector('c-child-lwc').maximizeCounter;
    }
}