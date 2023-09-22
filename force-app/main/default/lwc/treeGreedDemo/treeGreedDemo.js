import { LightningElement,track } from 'lwc';
import getConData from '@salesforce/apex/GetChild.getConData';

export default class TreeGreedDemo extends LightningElement {

    @track gridColumns = [

        {
            type : 'text',
            fieldName : 'Name',
            label : 'Name',
        },
        {
            type : 'text',
            fieldName : 'FirstName',
            label : 'First Name',
        },
        {
            type : 'text',
            fieldName : 'LastName',
            label : 'Last Name',
        },

    ];

    @track gridData;

    connectedCallback(){

        getConData()

        .then(result =>{
           // console.log('data-->'+JSON.stringify(result));

            var tempContact = JSON.parse(JSON.stringify(result));
            //console.log('tempContact-->'+JSON.stringify(tempContact));

            for(var i=0; i<tempContact.length; i++){
                
                var newContact = tempContact[i]['Contacts'];
                //console.log('newContact-->'+JSON.stringify(newContact));

                if(newContact){

                    tempContact[i]._children = newContact;
                    //console.log('tempContact[i]._children-->'+JSON.stringify(tempContact[i]._children));

                    delete tempContact[i].Contacts;

                }


            }

            this.gridData = tempContact;
            //console.log(' this.gridData-->'+JSON.stringify( this.gridData));




        }) 
        .catch(error =>{
            console.error(JSON.stringify(error));
        })

    }

    getSelectedRow(event){
        const selectedRows = event.detail.selectedRows;
        console.log(' selectedRows-->'+JSON.stringify( selectedRows ));

        for(var i=0; i<selectedRows.length; i++){
            console.log('FirstName   '+ selectedRows[i].FirstName);
            console.log('LastName  '+ selectedRows[i].LastName);
        }


    }


}