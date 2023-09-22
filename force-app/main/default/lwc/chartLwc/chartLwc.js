import { LightningElement,track,wire} from 'lwc';
import chartJs from '@salesforce/resourceUrl/CHARTJS'; 
import { loadScript } from 'lightning/platformResourceLoader';
import getChartData from '@salesforce/apex/ChartComponent.getChartData';

export default class ChartLwc extends LightningElement {


   @wire (getChartData) 
   accounts({error,data}){
      if(data){
        for(var key in data){
            //console.log('COUNT DATA-->'+JSON.stringify(data[key].count));
            //console.log('LABEL DATA-->'+JSON.stringify(data[key].label));
            this.updateChart(data[key].count,data[key].label);
        }
      }else if(error){
         console.error(error);
      }
   }

      @track chart;

      config = {
         type: 'pie',
         data: {
            datasets: [
               {
                  data: [],
                  backgroundColor: [
                     'rgb(255, 99, 132)',
                     'rgb(255, 159, 64)',
                     'rgb(255, 205, 86)',
                     'rgb(75, 192, 192)',
                  ],
                  label: "Dataset 1",
               },
            ],
            labels: [],
         },
         options: {
            responsive: true,
            legend: {
               position: 'right',
            },
            animation: {
               animateScale: true,
               animateRotate: true,
            },
            title: {
               display: true,
               text: "Account Rating Field Data",
              
             },
         },
      };

   
      renderedCallback(){
            Promise.all([
               loadScript(this,chartJs)
            ])
            .then(() => {
               const ctx = this.template.querySelector('canvas').getContext('2d');
               this.chart = new Chart(ctx, this.config);
            })
            .catch((error) => {
               console.error(error);
            })
      }

      updateChart(count,label){
      this.config.data.labels.push(label);
      this.config.data.datasets.forEach((dataset) => {
         dataset.data.push(count);
      });

   }

}