import { LightningElement, track, wire } from 'lwc';
import getTemp from '@salesforce/apex/whetherInfo.getTemp';
const CITIES = [ {label:'Jaipur',value:'jaipur'}, {label:'Manali',value:'manali'}, {label:'Mumbai',value:'mumbai'}, {label:'Surat',value:'surat'}, {label:'Amreli',value:'amreli'} ];

export default class WhetherInfo extends LightningElement {
    cities = CITIES;
    city = 'amreli';

    @track tempData = {};
    @track location = {}; 
    @track current = {};
    @track condition = {};
    @track currentDay = {};
    @track currentTime = {};


    @wire(getTemp,{city:'$city'})
    getData({error,data}){

        if (data) {

        console.log('data-->',JSON.parse(data));
        let weather  = JSON.parse(data);
        this.location = weather.location;
        this.current = weather.current;
        this.condition = weather.current.condition;

        //console.log('Location -->',this.location);
        //console.log('current -->',this.current);
        //console.log('condition -->',this.condition);

        //Weekday code

        const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let date  = this.current.last_updated;
        let myDate = date.split(" ")[0];

        const d = new Date(myDate);
        this.currentDay = weekday[d.getDay()];

        //time code

        let Time = date.split(" ")[1];
        const hours = Time.split(':')[0];
        const minute = Time.split(':')[1];

        const period = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

       this.currentTime = `${hours12}:${minute} ${period}`;
       



    
        
      
        




        
        }else if(error){
            console.error(error);
        }
        
    }

    handleCity(event){
        this.city = event.target.value; 
    }
  

}