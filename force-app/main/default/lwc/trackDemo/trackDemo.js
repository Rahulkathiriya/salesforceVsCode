import { LightningElement,track } from 'lwc';
//import getAccountData from '@salesforce/apex/ImperativeLwc.getAccountData';

/* const columns = [
    { label : 'Account Id', fieldName : 'Id'}, 
    { label : 'Name', fieldName : 'Name'},
];
*/

export default class TrackDemo extends LightningElement {

/* @track fullName = { firstName : "" , lastName : ""};

handleChange(event){
const field = event.target.name;
//window.alert('field--->'+field);


if(field === 'firstName'){

    this.fullName.firstName = event.target.value;

}else if(field === 'lastName'){

    this.fullName.lastName = event.target.value;

}


} 
*/

/* @track columns = columns;
@track data = [];

connectedCallback(){
    getAccountData()
    .then(result => {
        this.data = result;
    })
    .catch(error => {
         console.log('eroor occure');
    })
}
*/

@track onClickedButtonLabel = 'Show';
 myTitle = 'Dhruvil';
 @track cardVisible = false;

handleClick(event){
    const label = event.target.label;

    if( label === 'Show'){
        this.onClickedButtonLabel = 'Hide';
        this.cardVisible = true;
    }
    else if(label === 'Hide'){
        this.onClickedButtonLabel = 'Show';
        this.cardVisible = false;
    }

}

}