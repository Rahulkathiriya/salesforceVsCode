import { LightningElement, api, wire, track } from 'lwc';
import shareRead from '@salesforce/apex/IEPlantSharing.shareRead';
//import Activitiess from '@salesforce/apex/IEPlantSharing.shareRead';

export default class SelectUserId extends LightningElement {

  @api recordId;
  @api userOrGroupId;
  @track value;
  @track Activities;

  get options() {
    return [

      { value: '0055g00000F2CTf', label: 'IPLead user	' },
      { value: '0055g00000F2Cdc', label: 'test user	' },
      { value: '0055g00000GK0io', label: 'project manager' }

    ];
  }

  handleChange(event) {
    console.log('get user name');
    this.value = event.target.value;
  }

  //@wire(shareRead, { recordId: '$recordId', userOrGroupId: '$userOrGroupId' }) Activitiess;

  handleKeyChange(event) {
    this.recordId = event.target.value;
    this.userOrGroupId = event.target.value;
  }

  /** handleLoad() {
    shareRead({ recordId: this.recordId, userOrGroupId: this.userOrGroupId }).then((data) => {
      this.Activities = data;
      this.error = undefined;
    })
      .catch((error) => {
        this.Activities = undefined;
        this.error = error;
      })
  } **/

  @track disableBtn = false;
  handleSave(event) {
    console.log('In handleSave Eventtt');
    // this.value = event.target.value;
    alert(this.value);
    if (this.value == null || this.value == '') {
      console.log('true');
      console.log('My valuee is ', this.value)
      this.disableBtn = true;
    } else {
      console.log('false');
      this.disableBtn = false;
    }

    shareRead({ recordId: this.recordId, userOrGroupId: this.userOrGroupId }).then((Data) => {
      console.log(Data);
      //this.Activities = Data;
      this.error = undefined;
    })
      .catch((error) => {
        console.log(error);
        this.Activities = undefined;
        this.error = error;
      })

    /** if (this.value == '') {
      console.log(this.value);
      this.disableBtn = true;
    } else {
      console.log('.....');
      console.log(this.value);
      this.disableBtn = false;
    }              **/                     //return false


    /**  handleCancel(event){
        var url = window.location.href; 
        var value = url.substr(0,url.lastIndexOf('/') + 1);
        window.history.back();
        return false;
    } **/
  }

}