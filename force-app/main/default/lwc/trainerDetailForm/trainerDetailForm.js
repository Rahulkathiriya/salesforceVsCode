import { LightningElement,api,wire } from 'lwc';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import TRAINER_FIELD from '@salesforce/schema/Pokemon__c.Trainer__c';


const pokemonFields = [ TRAINER_FIELD ];

export default class TrainerDetailForm extends LightningElement {


    @api recordId;

    @wire(getRecord , { recordId : '$recordId' , fields : pokemonFields })
    pokemons;

    get trainerId(){
        return getFieldValue( this.pokemons.data, TRAINER_FIELD )
    }

}