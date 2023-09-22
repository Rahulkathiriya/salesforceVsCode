import { LightningElement ,wire} from 'lwc' ;
import getContact from '@salesforce/apex/TestAccountDatatablelwc.getContact';
import updateContactdetails from '@salesforce/apex/TestAccountDatatablelwc.updateContactdetails';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';


const Colomns =[
    { label: 'Contact Name', fieldName : 'Name', editable : true},
    { label: 'MobilePhone', fieldName : 'MobilePhone', editable : true},
    { label: 'Email', fieldName : 'Email', editable : true},
    { label: 'IndividualId', fieldName : 'IndividualId', editable : true}
    

];
export default class datatablewithinlineDemo extends  LightningElement{
    Colomns1 = Colomns;
    data1 = [];
    saveDraftValue = [];


// object value get datatable in ui
    @wire(getContact)
    contactData(result){

        console.log("result1234" +JSON.stringify(result));

        if(result.error){
           this.data1 = undefined;

        }else if(result.data){
            this.data1 =result.data;
            console.log("this.data1 3424"  +JSON.stringify(this.data1));
        }
    }

    // onsave button click value save perticuler object  field
    handleSave(event){
        const updatedfield = event.detail.draftValues;
        console.log('updatedfield  '+JSON.stringify(updatedfield));

        updateContactdetails({ conData : updatedfield})
        .then(result =>{
            console.log(" apex result: "+JSON.stringify(result))

            this.dispatchEvent(
                new ShowToastEvent({
                    title:result,
                    message:'save record',
                    variant:'success'
                    

                })
            );
        })
        .catch(error =>{
            console.error("error  :"+ JSON.stringify(error))
        })
    }
}