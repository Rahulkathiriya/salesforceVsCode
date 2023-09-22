import { api ,LightningElement , wire } from 'lwc';
import getLeaveRequests from '@salesforce/apex/LeaveRequestController.getLeaveRequests';
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

export default class LeaveRequest extends LightningElement {

    columns = COLUMNS;

    leaveRequests=[];
    leaveRequestsWireResult;
    showModalPopup = false;
    objectApiName = 'grensi__Leave_Request__c';
    recordId = '';
    currentUserId = Id;

    @wire(getLeaveRequests)
    WireLeaveRequest(result){
        this.leaveRequestsWireResult = result;
        console.log('leave requsts -->',this.leaveRequestsWireResult);
        if(result.data){
            this.leaveRequests = result.data.map(a => ({
               ...a,
               userName: a.grensi__User__c.Name,
                cellClass : a.grensi__Status__c == 'Approved' ? 'slds-theme_success' : a.grensi__Status__c == 'Rejected' ? 'slds-theme-warning':'',
                isEditDisebled : a.grensi__Status__c != 'Pending'
           }));
           
        }

        if(result.error){
            console.log('error occured while fecting my Leaves  ' , result.error);
        }
    }
  
    get noRecordFound(){
        return this.leaveRequests.length == 0;
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

    successHandler(){
        this.showModalPopup = false;  
        this.ShowToast('Data saved Succesfully');
        this.refreshGrid();
    }
    @api
    refreshGrid() {
        refreshApex(this.leaveRequestsWireResult);
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