import { LightningElement } from 'lwc';
import getPokemons from '@salesforce/apex/PokemonClass.getPokemons';

export default class PokemonCardList extends LightningElement {
    pokemons;
    error;
    searchWords='';
    isSearchNotAvailable = false;
    showImage='';

    connectedCallback(){
         
        this.loadPokemons(this.searchWords);
    
    }

    handleSearch(event){
        this.searchWords = event.target.value;
        this.loadPokemons(this.searchWords);


    }

    loadPokemons(searchWords){

        getPokemons({  searchKey : searchWords })
        .then(result => {

            this.pokemons = result;
            console.log('result--->'+JSON.stringify(result));

            if(this.pokemons.length > 0){
                this.isSearchNotAvailable = false;
            }else{
                this.isSearchNotAvailable = true;
                
            }

        })
        .catch(error =>{
            this.error = error;
            this.isSearchNotAvailable = false;

            console.error(JSON.stringify(error));
        })

    }

    handleImages(event){
       this.showImage = event.target.url;
       console.log('showImage-->'+JSON.stringify(this.showImage));
    }

}