import { LightningElement, wire } from 'lwc';
import getObject from '@salesforce/apex/seconDataTable.getObject';
import updateObject from '@salesforce/apex/seconDataTable.updateObject';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

const column =[
    { label : 'SchoolName', fieldName : 'Name', editable : true},
    { label : 'Employe', fieldName : 'grensi__EmployName__c', editable : true},
    { label : 'Total Student', fieldName : 'grensi__Total_Marks_Student_obj__c', editable : true}


];


export default class InlineEditDataTable extends LightningElement {
    colum = column;
    Data = [];
    saveDraftValue = [];

  @wire(getObject)  // apex method decleration
  schoolData(result){
    console.log('result seco  ' +JSON.stringify(result));

    if(result.error){
        
    this.Data = undefined;

      }else if(result.data){
        this.Data = result.data;
        console.log('this.Data1 second '  +JSON.stringify(this.Data));
    
      }

  }

  saveHandler(event){
    const updatedField = event.detail.draftValues;
    console.log('event value ' + JSON.stringify(updatedField) );

    updateObject({ schData : JSON.stringify(updatedField) })  //update value save method 

    .then(result => {
        console.log(" apex result: "+JSON.stringify(result))

        this.dispatchEvent
        new ShowToastEvent ({
          title:result,
          message:'save record',
          variant:'success'
          

        })

    })
    .catch(e =>{
            console.log('e --->' +JSON.stringify(e));
    })
  } 
  
  

   
}