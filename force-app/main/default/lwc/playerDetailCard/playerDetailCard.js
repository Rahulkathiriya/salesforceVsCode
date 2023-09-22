import { LightningElement,wire } from 'lwc';
import { subscribe,MessageContext } from 'lightning/messageService';
import SELECTED_PLAYER_CHHANEL from '@salesforce/messageChannel/SelectedPlayer__c';
import getSelectedPlayerDetail from '@salesforce/apex/CricketerController.getSelectedPlayerDetail';
import { NavigationMixin } from 'lightning/navigation';


export default class PlayerDetailCard extends NavigationMixin(LightningElement) { 

    selectedPlayerId;
    cricketerData;

    @wire(MessageContext)
    messageContext;

    connectedCallback(){
        subscribe(
            this.messageContext,
            SELECTED_PLAYER_CHHANEL,
            (message) => {
                console.log('message from LMS:'+JSON.stringify(message));
                this.handleSelectedCricketer(message.cricketerId);
            }
        )


    }

    handleSelectedCricketer(cricketerId){
        this.selectedPlayerId = cricketerId;
        console.log('this.selectedPlayerId:'+JSON.stringify(this.selectedPlayerId));


        getSelectedPlayerDetail({ playerId : this.selectedPlayerId })
        .then(result => {
            this.cricketerData = result;
            console.log('result--->'+JSON.stringify(result));
        })
        .catch(error =>{
            console.error(error);
        })

    }

    handleNavigateToRecord(event){
        this[NavigationMixin.Navigate]({
            type : 'standard__recordPage',
            attributes : {
                recordId:this.selectedPlayerId,
                objectApiName:'grensi__Cricketers__c',
                actionName:'view'
            }
        })
    }

}