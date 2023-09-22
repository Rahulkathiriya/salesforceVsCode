import { api,LightningElement } from 'lwc';
import getAllData from '@salesforce/apex/GetAccRelatedData.getAllData';


const column1 = [
    { label: 'opportunity Id' , fieldName : 'Id'},
    { label: 'opportunity Name' , fieldName : 'Name'},
];


const column2 = [
    { label: 'Contact Id' , fieldName : 'Id'},
    { label: 'Contact Name' , fieldName : 'Name'},
];

export default class GetChildRecordinLwc extends LightningElement {

    @api buttonLabel = 'Show';
    @api showDatatable = false;

    @api recordId;

    opportunityData = [];
    contactData = [];

    column1 = column1;
    column2 = column2;

    oppotunityTemArray = [];
    contactTemArray = [];


    handleShow(event){
        if(event.target.label == 'Show'){
            this.buttonLabel = 'Hide';
            this.showDatatable = true;
        }
        else if(event.target.label == 'Hide'){
            this.buttonLabel = 'Show';
            this.showDatatable = false;
        }

    }

    connectedCallback(){
        getAllData({recId : this.recordId})
        .then(res => {

            let tempRecords = res;
            console.log('Data--->'+ JSON.stringify(tempRecords));

            let temp = tempRecords.map(row =>{
                return Object.assign({ OppName : row.Opportunities , ConatactName : row.Contacts });
            });
            console.log('temp -->'+JSON.stringify(temp));


            temp.forEach(element => {

                this.oppotunityTemArray = element.OppName;
                console.log('oppotunityTemArray Data-->'+JSON.stringify(this.oppotunityTemArray));

                this.contactTemArray = element.ConatactName;
                console.log('contactTemArray Data-->'+JSON.stringify(this.contactTemArray));

            });

            this.opportunityData = this.oppotunityTemArray;
            this.contactData = this.contactTemArray;
        })
        .catch(error => {
            console.log('Error-->'+ JSON.stringify(error));
        });
    }
    

}