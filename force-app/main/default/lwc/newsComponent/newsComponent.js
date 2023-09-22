import { LightningElement, track } from 'lwc';
import retriveNews from '@salesforce/apex/newsController.retriveNews';

export default class NewsComponent extends LightningElement {

    @track result = [];
    @track selectedNews = {};
    @track isModalOpen = false;

    get modalClass(){
       
        return `slds-modal ${this.isModalOpen ? "slds-fade-in-open" : "" }`
    }

    get modalBackdropClass(){
        this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop";
    }
    connectedCallback(){
        this.fatchNews();
    }

    fatchNews(){

        retriveNews()
        .then(response => {
            //console.log('Response-->'+JSON.stringify(response));
            this.formatNewsData(response.articles);
        })
        .catch(error => {
            console.error(error);
        })

    } 

    formatNewsData(response){
        //console.log('formateNewsData-->'+JSON.stringify(response));

        this.result = response.map( (item, index) => {
       
            let id = `new_${index+1}`;
            let date = new Date(item.publishedAt).toDateString();
            let name = item.source.name;
            
            return {...item, id:id, name:name, date:date, };

        })
       //console.log('Result-->'+JSON.stringify(this.result));
        
    }

    showModal(event){
        let id = event.target.dataset.item;
        this.result.forEach( item => {
            if(item.id === id ){
                this.selectedNews = {...item};
            }
            console.log('selectedData-->'+JSON.stringify(this.selectedNews));
        })
        this.isModalOpen = true;
        //console.log('modalshowid--->'+JSON.stringify(this.result));
    }

    closeModal(){
        this.isModalOpen = false;
    }
   

}