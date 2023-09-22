import { LightningElement, track } from 'lwc';
import getAccountData from '@salesforce/apex/ImperativeLwc.getAccountData';
import getAccRelatedConData from '@salesforce/apex/ImperativeLwc.getAccRelatedConData';

const columns = [
        { label : 'Contact ID' , fieldName : 'Id'},
        { label : 'Contact Name' , fieldName : 'Name'}
];

export default class ComboboxPractice extends LightningElement {
   @track value = '';
   @track optionArray = [];
   @track cardVisible = false;
   @track data = [];
   @track columns = columns;

    get options(){
      return this.optionArray;
    }
    

    connectedCallback(){
        getAccountData()
        .then(result => {
            
            let arr = [];

            for(var i=0; i<result.length; i++){
                arr.push({ label : result[i].Name , value : result[i].Id });
            }
           
            this.optionArray = arr;
         
        })

       
       

    }

   


    handleChange(event){

        this.cardVisible = true;
        // store record Id
        this.value = event.detail.value;
        

        getAccRelatedConData({ accId : this.value})
        .then(result => {
            this.data = result;
        })
        .catch( error =>{
            window.alert('Eroor Occure');
        })

    }
}