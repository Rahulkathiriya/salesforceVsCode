import { LightningElement,wire,api } from 'lwc';
import getCricketerList from '@salesforce/apex/CricketerController.getCricketerList';
import { publish, MessageContext } from 'lightning/messageService';
import SELECTED_PLAYER_CHHANEL from '@salesforce/messageChannel/SelectedPlayer__c';

export default class PlayerSearchResult extends LightningElement { 


    cricketersNationality='';
    cricketerData;
    selectedPlayerId;


    @wire(getCricketerList,{ nationality : '$cricketersNationality'})
    wiredCricketers({ data, error }){

        if(error){
            console.error(error);
        }else if(data){

            this.cricketerData = data;
            console.error('this.cricketerData-->'+JSON.stringify(this.cricketerData));
            
        }
    }

    @wire(MessageContext)
    messageContext;

    handleClickPlayerCard(event){
        this.selectedPlayerId = event.currentTarget.dataset.id;
        console.log('this.selectedPlayerId-->'+JSON.stringify(this.selectedPlayerId));

        //publishing selected player id to LMS channel
        publish(this.messageContext , SELECTED_PLAYER_CHHANEL, { cricketerId : this.selectedPlayerId });

        let boxClass = this.template.querySelectorAll('.selected');
        if(boxClass.length > 0){
            this.removeClass();
        }

        //current select player details
        let playerBox = this.template.querySelector(`[data-id="${this.selectedPlayerId}"]`);

        if(playerBox){
            playerBox.className = 'title_wrapper selected';

        }

        //custemEvent firing on parent

        this.dispatchEvent(new CustomEvent('select',{
            detail:{
                playerId : this.selectedPlayerId,
            }
        }))


    }

    removeClass(){
        this.template.querySelectorAll('.selected')[0].classList.remove('selected');
    }

    @api searchCricketer(nationalityOfCricketer){

        console.log('value in child lwc-->'+JSON.stringify(nationalityOfCricketer));

        this.cricketersNationality = nationalityOfCricketer;

    }
    
}