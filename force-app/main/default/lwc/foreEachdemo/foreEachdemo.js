import { LightningElement, track, wire } from 'lwc';
import getScudentList from '@salesforce/apex/foreachDemoClass.getScudentList';


export default class ForeEachdemo extends LightningElement {

    @track data=[];
    @wire(getScudentList)
    school;
}