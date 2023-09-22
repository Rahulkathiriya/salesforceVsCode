import { LightningElement, wire, track, api } from 'lwc';
import getObjectData from '@salesforce/apex/DatatableInLwc.getObjectData';
import picklistValue from '@salesforce/apex/DatatableInLwc.picklistValue';
import getFilterData from '@salesforce/apex/DatatableInLwc.getFilterData';
import { deleteRecord } from 'lightning/uiRecordApi';
//object get all information same as schema get fields
import { getObjectInfo } from 'lightning/uiObjectInfoApi';




const actions = [
    { label: 'Edit', name: 'edit' },
    { label: 'Delete', name: 'delete' },
];

const columns = [
    { label: 'Id', fieldName: 'Id' },
    { label: 'Name', fieldName: 'Name' },
    { label: 'Phone', fieldName: 'Phone' },
    { label: 'Industry', fieldName: 'Industry' },
    {
        type: 'action',
        typeAttributes: { rowActions: actions },
    },
];

const optionBoolean = [
    { label: 'True', value: 'true' },
    { label: 'False', value: 'false' }
];



const oprators = [
    { label: 'equals', value: '=', category: 'A' },
    { label: 'not equal to', value: '!=', category: 'A' },
    { label: 'less Than', value: '<', category: 'B' },
    { label: 'greter Than', value: '>', category: 'B' },
    { label: 'less or equal', value: '<=', category: 'B' },
    { label: 'greter or equal', value: '>=', category: 'B' },
    { label: 'contains', value: 'LIKE', category: 'C' },
    { label: 'does not contains', value: 'NOT', category: 'C' },
    { label: 'start with', value: 'START', category: 'C' }
];

export default class FilterInLwc extends LightningElement {

    @api objectApiName = 'Account';

    //datatable data
    @track DATA = [];
    COLUMNS = columns;

    //edit delete modal 
    @track editModal = false;
    @track deleteModal = false;
    @track rowId;

    //comboboxfield data
    @track comboboxFields = [];
    @track comboboxOprators = [];

    //condition all combobox attributes
    @track stringDataType = true;
    @track dateDataType = false;
    @track integerDataType = false;
    @track picklistDataType = false;
    @track booleanDataType = false;

    //combobox picklist field change dynamicly
    @track picklistApiName;
    @track picklistValues;

    @track optionBoolean = optionBoolean;

    // input variable
    @track comboboxSelectField ;
    @track comboboxSelectOperator ;

    @track inputStringValue;
    @track inputIntegerValue;
    @track InputDateValue;
    @track InputBooleanValue;


    //filter Data Result
    @track filterData;

    // datatable data

    @wire(getObjectData)
    objectData({ error, data }) {
        if (data) {
            // console.log('data-->', data);
            this.DATA = data;

        } else if (error) {
            console.error('Error-->', error);
        }
    }

    // datatable row action edit delete handler

    handleRowAction(event) {
        const actionName = event.detail.action.name;
        const row = event.detail.row;

        switch (actionName) {
            case 'edit':
                this.editModal = true;
                this.rowId = row.Id;
                break;
            case 'delete':
                this.deleteModal = true;
                this.rowId = row.Id;
                break;
            default:
        }

    }

    handleCancel() {
        this.editModal = false;
        this.deleteModal = false;
    }
    handleSubmit() {
        location.reload();
        this.editModal = false;
    }
    handlerDelete() {
        deleteRecord(this.rowId);
        location.reload();
    }


    // combobox get all fields

    @wire(getObjectInfo, { objectApiName: '$objectApiName' })

    objectInfo({ error, data }) {
        if (data) {
            const fieldMap = data.fields;
            // console.log('fieldMap-->', fieldMap);
            var comboboxFields = [];

            for (let fieldApiName in fieldMap) {
                let apiName = fieldApiName;
                let dataType = fieldMap[fieldApiName].dataType;

                if (dataType != 'Reference' && dataType != 'Id' && dataType != 'Double' && dataType != 'Address' && dataType != 'TextArea' && dataType != 'Phone'
                    /* && dataType != 'DateTime'   && dataType != 'Percent' && dataType != 'Url' */) {

                    if (apiName != 'Id' && apiName != 'BillingCity' && apiName != 'BillingCountry' && apiName != 'BillingGeocodeAccuracy' && apiName != 'BillingPostalCode' && apiName != 'BillingState'
                        && apiName != 'IsDeleted' && apiName != 'CreatedDate' && apiName != 'LastModifiedDate' && apiName != 'SystemModstamp' && apiName != 'LastActivityDate'
                        && apiName != 'LastViewedDate' && apiName != 'LastReferencedDate' && apiName != 'Jigsaw' && apiName != 'JigsawCompanyId' && apiName != 'Ownership'
                        && apiName != 'ChannelProgramLevelName' && apiName != 'ChannelProgramName') {

                        comboboxFields.push({
                            label: fieldMap[fieldApiName].label,
                            value: fieldApiName,
                            dataType: fieldMap[fieldApiName].dataType
                        });

                    }
                }
            }
            this.comboboxFields = comboboxFields;
            console.log('comboboxFields-->', this.comboboxFields);

        } else if (error) {
            console.error('error-->', error);
        }
    }

    // combobox get picklist field value

    @wire(picklistValue, { objectApiName: '$objectApiName', fieldApiName: '$picklistApiName' })
    accunt({ error, data }) {
        if (data) {

            let PickList = [];
            this.picklistValues = PickList;

            for (let key in data) {
                PickList.push({ label: data[key], value: data[key] })

            }
        } else if (error) {
            console.error('error', error);
        }
    }

    // combobox handler 

    handleComboBoxField(event) {
        let comboboxSelectField = event.target.value;
        console.log('comboboxSelectField-->', comboboxSelectField);

        //combobox condition check what is datatype an change input field

        let comboboxOprators = [];

        let conditiondataType;
        this.comboboxFields.find(item => {
            if (item.value == comboboxSelectField) {
                conditiondataType = item.dataType;
            }
        });

        if (conditiondataType === 'String' || conditiondataType === 'Url') {

            this.stringDataType = true;

            //String datatype true to show oprators
            if (this.stringDataType === true) {
                for (var opp in oprators) {
                    let category = oprators[opp].category;

                    if (category === 'A' || category === 'B' || category === 'C') {
                        comboboxOprators.push({
                            label: oprators[opp].label,
                            value: oprators[opp].value
                        });
                    }
                }
                //console.log('String -->', comboboxOprators);
            }

            this.dateDataType = this.integerDataType = this.picklistDataType = this.booleanDataType = false;

        }
        else if (conditiondataType === 'Date') {

            this.dateDataType = true;

            //Date datatype true to show oprators
            if (this.dateDataType === true) {
                for (var opp in oprators) {
                    let category = oprators[opp].category;

                    if (category === 'A' || category === 'B') {
                        comboboxOprators.push({
                            label: oprators[opp].label,
                            value: oprators[opp].value
                        });
                    }
                }
                //console.log('date -->', comboboxOprators);
            }

            this.stringDataType = this.integerDataType = this.picklistDataType = this.booleanDataType = false;

        }
        else if (conditiondataType === 'Currency' || conditiondataType === 'Int') {

            this.integerDataType = true;

            //integer datatype true to show oprators
            if (this.integerDataType === true) {
                for (var opp in oprators) {
                    let category = oprators[opp].category;

                    if (category === 'A' || category === 'B') {
                        comboboxOprators.push({
                            label: oprators[opp].label,
                            value: oprators[opp].value
                        });
                    }
                }
                //console.log('intger -->', comboboxOprators);
            }

            this.stringDataType = this.dateDataType = this.picklistDataType = this.booleanDataType = false;

        }
        else if (conditiondataType === 'Picklist') {

            this.picklistDataType = true;

            //piclist datatype true to show oprators
            if (this.picklistDataType === true) {
                for (var opp in oprators) {
                    let category = oprators[opp].category;

                    if (category === 'A') {
                        comboboxOprators.push({
                            label: oprators[opp].label,
                            value: oprators[opp].value
                        });
                    }
                }
                //console.log('piclist -->', comboboxOprators);
            }

            this.stringDataType = this.dateDataType = this.integerDataType = this.booleanDataType = false;

            this.picklistApiName = comboboxSelectField;
            //console.log(' this.picklistApiName', this.picklistApiName);
        }
        else if (conditiondataType === 'Boolean') {

            this.booleanDataType = true;

            //boolean datatype true to show oprators
            if (this.booleanDataType === true) {
                for (var opp in oprators) {
                    let category = oprators[opp].category;

                    if (category === 'A') {
                        comboboxOprators.push({
                            label: oprators[opp].label,
                            value: oprators[opp].value
                        });
                    }
                }
                //console.log('Boolean -->', comboboxOprators);
            }

            this.stringDataType = this.dateDataType = this.integerDataType = this.picklistDataType = false;
        }

        this.comboboxSelectField = comboboxSelectField;
        this.comboboxOprators = comboboxOprators;


        //this input field refer every condition ' ' (khali value) or value 

        this.inputStringValue = '';
        this.inputIntegerValue = '';
        this.InputDateValue = '';
        this.InputBooleanValue = '';



    }



    handleComboBoxOperator(event) {
        this.comboboxSelectOperator = event.target.value;
    }

    //user input handler in filter combobox


    userInputStringValue(event) {
        this.inputStringValue = event.target.value;
    }
    userInputIntegerValue(event) {
        this.inputIntegerValue = event.target.value;
    }

    userInputDateValue(event) {
        this.InputDateValue = event.target.value;
    }
    userInputBooleanValue(event) {
        this.InputBooleanValue = event.target.value;
    }


    handleFilterSave(event) {

        this.comboboxSelectField;
        console.log('comboboxSelectField------->', this.comboboxSelectField);

        this.comboboxSelectOperator;
        console.log('comboboxSelectOperator-->', this.comboboxSelectOperator);

        this.inputStringValue;
        console.log('this.inputStringValue-->', this.inputStringValue);

        this.inputIntegerValue;
        console.log('this.inputIntegerValue-->', this.inputIntegerValue);

        this.InputDateValue;
        console.log('this.InputDateValue-->', this.InputDateValue);

        this.InputBooleanValue;
        console.log('this.vInputBooleanValue-->', this.InputBooleanValue);


        //  this.filterData;
        this.DATA = this.filterData;

        console.log('this.Data', this.DATA);

    }




    @wire(getFilterData, {
        objectApiName: '$objectApiName', comboboxSelectField: '$comboboxSelectField', comboboxSelectOperator: '$comboboxSelectOperator',
        inputStringValue: '$inputStringValue', inputIntegerValue: '$inputIntegerValue', InputDateValue: '$InputDateValue', InputBooleanValue: '$InputBooleanValue'
    })
    getfilter({ error, data }) {

        if (data) {
            this.filterData = data;
        }
    }























}