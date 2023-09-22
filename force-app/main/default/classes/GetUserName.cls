public class GetUserName {
    
    @AuraEnabled(cacheable=true)
    public static list<User> input(string searchKey) {
        String searchKeyword = '%' + searchKey + '%';
        System.debug('Serch key ' + searchKey);
        List<User> getuser = [SELECT Id,Name FROM User WHERE Name Like : searchKeyword];
        return getuser;
    }
    /**
	<template>


<!-- <lightning-button-group>
    <lightning-button label="Cancel" variant="neutral" onclick={handleDialogClose}></lightning-button>
    <lightning-button label="Save &amp; New" variant="neutral" type="submit" onclick={handleSubmit} value="saveandnew"></lightning-button>
    <lightning-button label="Save" variant="brand" type="submit" onclick={handleSave}></lightning-button>
</lightning-button-group> -->

<lightning-record-edit-form object-api-name="Activities" onsuccess={handleSuccess}>
    <lightning-card title=" user details in LWC" icon-name="standard:user">
        <div onkeyup={handleKeyUp}>
            <lightning-input
                name="enter-search"
                label="Search when user hits the 'enter' key"
                type="search"
                onchange={handleChange} 
            ></lightning-input>
        </div>
        <p if:true={queryTerm}>
            Searched for {queryTerm}!
        </p>
        <!-- <div class="slds-p-around_medium lgc-bg">
            <lightning-input type="text" label="Enter some text"></lightning-input>
        </div> -->
        <div class="slds-p-horizontal_small">User Id = {userId}</div>
        <div class="slds-p-horizontal_small">Username = {userName}</div>
        <div class="slds-p-horizontal_small">First Name = {firstName}</div>
        <div class="slds-p-horizontal_small">Last Name = {lastName}</div> 
    </lightning-card>
    
    <lightning-button-group>
      <lightning-button label="Cancel" variant="neutral" onclick={handleDialogClose}></lightning-button>
      <lightning-button label="Save &amp; New" variant="neutral" type="submit" onclick={handleSaveAndNew}> </lightning-button>
      <lightning-button label="Save" variant="brand" type="submit" onclick={handleSave}></lightning-button>
    </lightning-button-group>
  </lightning-record-edit-form>

</template>







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


@wire (input,{searchKey: '$srchKey'}) users;
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




**/
}