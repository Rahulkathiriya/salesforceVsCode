import { LightningElement, wire } from 'lwc';
import getMyLeave from '@salesforce/apex/LeaveRequestController.getMyLeave';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'; 
import Id from '@salesforce/user/Id';
import { refreshApex } from '@salesforce/apex';

const COLUMNS = [ 
    {label: 'Request Id', fieldName: 'Name', cellAttributes: { class: {fieldName : 'cellClass' }}},
    {label: 'From Date', fieldName: 'grensi__From_Date__c', cellAttributes: { class: {fieldName : 'cellClass' }}},
    {label: 'To Date', fieldName: 'grensi__To_Date__c', cellAttributes: { class: {fieldName : 'cellClass' }}},
    {label: 'Reason', fieldName: 'grensi__Reason__c', cellAttributes: { class: {fieldName : 'cellClass' }}},
    {label: 'Status', fieldName: 'grensi__Status__c', cellAttributes: { class: {fieldName : 'cellClass' }}},
    {label: 'Manager Comment', fieldName: 'grensi__Manager_Comment__c', cellAttributes: { class: {fieldName : 'cellClass' }}},
    {
            type: "button", typeAttributes:{
            label:'Edit',
            name:'Edit',
            title:'Edit',
            value:'edit',
            disabled: { fieldName : 'isEditDisebled' }
         }, cellAttributes: { class: {fieldName : 'cellClass' }}

    }
];

export default class MyLeaves extends LightningElement {

    columns = COLUMNS;

    myLeavesApex=[];
    myLeavesWireResult;
    showModalPopup = false;
    objectApiName = 'grensi__Leave_Request__c';
    recordId = '';
    currentUserId = Id;

    @wire(getMyLeave)
    wiredMyLeaves(result){
        this.myLeavesWireResult = result;
        if(result.data){
            this.myLeavesApex = result.data;
            console.log('result',this.myLeavesApex);
            this.myLeavesApex = result.data.map(a => ({
               ...a,
                cellClass : a.grensi__Status__c == 'Approved' ? 'slds-theme_success' : a.grensi__Status__c == 'Rejected' ? 'slds-theme-warning':'',
                isEditDisebled : a.grensi__Status__c != 'Pending'
           }));
           
        }

        if(result.error){
            console.log('error occured while fecting my Leaves  ' , result.error);
        }
    }
  
    get noRecordFound(){
        return this.myLeavesApex.length == 0;
    }

    popupCloseHandler(){
        this.showModalPopup = false;
    }

    newRequestClickHandler(){
        this.showModalPopup = true;
        this.recordId = '' ;  
    }

    rowActionHandler(event){
        this.showModalPopup = true;
        this.recordId = event.detail.row.Id;
    }

    successHandler(event){
        this.showModalPopup = false;  
        this.ShowToast('Data saved Succesfully');
        refreshApex(this.myLeavesWireResult);
    }

    submitHandler(event){
        event.preventDefault();
        const fields={...event.detail.fields};
        fields.grensi__Status__c = ' Pending ';
        if(new Date (fields.grensi__From_Date__c)>new Date (fields.grensi__To_Date__c)){
            this.ShowToast('From date should not be greter than to date', 'Error','error');
        }
        else if(new Date() > new Date (fields.grensi__From_Date__c)){
            this.ShowToast('From date should not be less than Today', 'Error','error'); 
        }
        else{
            this.refs.leaveRequestFrom.submit(fields);
        }
    }
    
    ShowToast( message, title='success',variant='success'){
        const event = new ShowToastEvent({
            title,
            message,
            variant
        });
        this.dispatchEvent(event);
    }
  
}