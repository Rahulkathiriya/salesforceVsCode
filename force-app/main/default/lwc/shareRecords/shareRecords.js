import { LightningElement ,wire,track} from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import USER_NAME from '@salesforce/schema/User.Username';
import FIRST_NAME from '@salesforce/schema/User.FirstName';
import LAST_NAME from '@salesforce/schema/User.LastName';

import USER_ID from '@salesforce/user/Id';
import { NavigationMixin } from 'lightning/navigation';
import input from "@salesforce/apex/GetUserName.input";

export default class ShareRecords extends LightningElement {
userId = USER_ID;
@track srchKey;
@track users;
@track error;

@wire(getRecord, { recordId : "$userId", fields: [USER_NAME, FIRST_NAME, LAST_NAME]})
user;

get userName(){
    return getFieldValue(this.user.data, USER_NAME);
}

get firstName(){
    return getFieldValue(this.user.data, FIRST_NAME);
}

get lastName(){
    return getFieldValue(this.user.data, LAST_NAME);
}


@wire (input,{searchKey: '$srchKey'}) user;
handleChange(event){

this.srchKey = event.target.value;
console.log('serch key' , srchKey);
}



saveAndNew = false;

handleSave() {
this.saveAndNew = false;
this.handleRecordSave();
}

handleSaveAndNew() {
this.saveAndNew = true;
this.handleRecordSave();
}

handleReset(event) {
const inputFields = this.template.querySelectorAll(
'lightning-input-field'
);
if (inputFields) {
inputFields.forEach(field => {
    field.reset();
});
}
}

handleSuccess() {
if(this.saveAndNew){
this.handleReset();
} else{
this[NavigationMixin.Navigate]({
    type: 'standard__recordPage',
    attributes: {
    recordId: this.activitiesId,
    objectApiName: 'Activities__c',
    accesslevel: 'Read/Write'
    },
});
}
}

handleRecordSave() {
this.template.querySelector('lightning-record-edit-form').submit(this.fields);
}
}