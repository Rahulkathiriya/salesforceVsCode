import { LightningElement } from 'lwc';
import SCHOOL_OBJECT from '@salesforce/schema/Demo_School__c';

import Name_FIEld from '@salesforce/schema/Demo_School__c.Name';
import EMPLOY_FIEld from '@salesforce/schema/Demo_School__c.EmployName__c';


export default class RecordFromDemo extends LightningElement {
  fied = [Name_FIEld,EMPLOY_FIEld];

    objectApiName =  SCHOOL_OBJECT;
    recId = "a0I5g000000SjDIEA0";
 
}