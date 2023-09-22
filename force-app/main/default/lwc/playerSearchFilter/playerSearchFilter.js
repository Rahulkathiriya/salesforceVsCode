import { LightningElement,wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import { getObjectInfo,getPicklistValues } from 'lightning/uiObjectInfoApi';
import Cricketer_object from '@salesforce/schema/Cricketers__c';
import Nationality_Field from '@salesforce/schema/Cricketers__c.Nationality__c';


export default class PlayerSearchFilter extends NavigationMixin(LightningElement) {

    recordTypeId;
    picklistValue;
    optionsArray;
    selectedCricketerNationality;
    selectedPlayerId;

    @wire(getObjectInfo, {objectApiName : Cricketer_object })
    objectInfos({ error,data }){

        if(error){
            //console.error('error-->'+JSON.stringify(error));
        }else if(data){
 
            this.recordTypeId = data.defaultRecordTypeId;
            //console.log('this.recordTypeId-->'+JSON.stringify(this.recordTypeId));
        } 
        
    }

    @wire(getPicklistValues, { recordTypeId : '$recordTypeId', fieldApiName : Nationality_Field })
    nationalityFieldValues({ data, error}){

        if(error){
            console.error('error-->'+JSON.stringify(error));
        }else if(data){

            let arr = [];

            this.picklistValue = data.values;
            //console.log('this.picklistValue-->'+JSON.stringify(this.picklistValue));

            this.picklistValue.forEach( element =>{
                arr.push({ label : element.value, value : element.value});
            })

            this.optionsArray = arr;
            //console.log('this.optionsArray-->'+JSON.stringify(this.optionsArray));

        }

    }



    createCricketers(){
        this[NavigationMixin.Navigate]({
            type : 'standard__objectPage',
            attributes:{
                objectApiName : 'grensi__Cricketers__c',
                actionName: 'new'
            }
        })
    }


    handleOptionChange(event){
        this.selectedCricketerNationality = event.target.value;
        //console.log('this.selectedCricketerNationality-->'+JSON.stringify(this.selectedCricketerNationality));

        this.template.querySelector('c-player-search-result').searchCricketer(this.selectedCricketerNationality);


    }

    handleCustomeEvent(event){
        this.selectedPlayerId = event.detail.playerId;
        console.log('this.selectedPlayerId-->'+JSON.stringify(this.selectedPlayerId));
    }




}