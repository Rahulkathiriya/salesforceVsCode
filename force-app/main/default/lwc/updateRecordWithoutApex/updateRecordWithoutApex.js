import { LightningElement } from 'lwc';
import ID_FIELD from '@salesforce/schema/Account.Id';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import { updateRecord } from 'lightning/uiRecordApi';


export default class UpdateRecordWithoutApex extends LightningElement {

    idValue;
    nameValue;

    handleIdChange(event){
        this.idValue = event.target.value;
        console.log('this.idValue-->'+JSON.stringify(this.idValue));

    }

    handleNameChange(event){
        this.nameValue = event.target.value;
        console.log('this.nameValue-->'+JSON.stringify(this.nameValue));



    }

    handleUpdateAccount(){

        const fields={};
        fields[ID_FIELD.fieldApiName] = this.idValue;

        fields[NAME_FIELD.fieldApiName] = this.nameValue;

        console.log('fields-->'+JSON.stringify(fields));

        const recordInput = { fields };

        updateRecord(recordInput)
        .then(result => {
            console.log('result-->'+JSON.stringify(result));
        })
        .catch(error => {
            console.log('error-->'+JSON.stringify(error));

        })

    }

}