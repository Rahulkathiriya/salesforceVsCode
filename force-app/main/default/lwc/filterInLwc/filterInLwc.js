import { LightningElement, wire, track, api } from 'lwc';
import getObjectData from '@salesforce/apex/DatatableInLwc.getObjectData';
import picklistValue from '@salesforce/apex/DatatableInLwc.picklistValue';
import { deleteRecord } from 'lightning/uiRecordApi';
//object get all information same as schema get fields
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

import getFilterSavaData from '@salesforce/apex/DatatableInLwc.getFilterSavaData';

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

const operators = [
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

    // dynamic filter

    @track filterObject = { field: '', operator: '', value: '' };
    @track filterMainData = [];
    @track showBox = false;


    @track filFieldDisplay;
    @track filOperatorDisplay;
    @track filValueDisplay;

    @track itemIndex;
    @track objData;
    //filter Data Result
    @track apexFilterData = [];

    @track selectedComboField;
    @track selectedComboOperator;
    @track selectedComboValue;



    /////////////

    objectApiName = 'Account';

    //datatable data
    @track DATA = [];
    COLUMNS = columns;

    //edit delete modal 
    @track editModal = false;
    @track deleteModal = false;
    @track rowId;

    //comboboxfield data
    @track comboboxFields = [];
    @track comboboxOperators = [];

    //condition all combobox attributes
    @track stringDataType = false;
    @track dateDataType = false;
    @track integerDataType = false;
    @track picklistDataType = false;
    @track booleanDataType = false;

    //combobox picklist field change dynamicly
    @track picklistApiName;
    @track picklistValues;
    @track optionBoolean = optionBoolean;

    // input variable
    @track comboboxSelectField;
    @track comboboxSelectOperator;
    @track inputStringValue;
    @track inputIntegerValue;
    @track InputDateValue;
    @track InputBooleanValue;

    //design Attributes

    @track openFilter = false;

    //dynamic filter

    connectedCallback() {

        this.comboboxSelectOperator = '=';
        this.comboboxSelectField = 'Name';

        this.stringDataType = true;

        this.inputStringValue = '';    //  this input field refer every condition ' ' (khali value) or value 
        this.inputIntegerValue = '';
        this.InputDateValue = '';
        this.InputBooleanValue = '';

    }

    // datatable data

    @wire(getObjectData)
    objectData({ error, data }) {
        if (data) {
            this.DATA = JSON.parse(JSON.stringify(data));
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
            this.comboboxFields = JSON.parse(JSON.stringify(comboboxFields));
            this.comboboxOperators = JSON.parse(JSON.stringify(operators));

            console.log('this.comboboxFields-->', this.comboboxFields);
            //console.log('this.comboboxOperators-->', this.comboboxOperators);

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
        }
    }

    // combobox handler 

    handleComboBoxField(event) {

        this.comboboxSelectField = event.target.value;
        //console.log('Value combo', this.comboboxSelectField);

        let comboOperators = [];

        let conditiondataType;
        this.comboboxFields.find(item => {
            if (item.value == this.comboboxSelectField) {
                conditiondataType = item.dataType;
            }
        });

        if (conditiondataType === 'String' || conditiondataType === 'Url') {

            this.stringDataType = true;
            if (this.stringDataType === true) {
                for (var opp in operators) {
                    if (operators[opp].category === 'A' || operators[opp].category === 'B' || operators[opp].category === 'C') {
                        comboOperators.push({
                            label: operators[opp].label,
                            value: operators[opp].value
                        });
                    }
                }
            }

            this.dateDataType = this.integerDataType = this.picklistDataType = this.booleanDataType = false;

        }
        else if (conditiondataType === 'Date') {
            this.dateDataType = true;
            if (this.dateDataType === true) {
                for (var opp in operators) {
                    if (operators[opp].category === 'A' || operators[opp].category === 'B') {
                        comboOperators.push({
                            label: operators[opp].label,
                            value: operators[opp].value
                        });
                    }
                }
            }
            this.stringDataType = this.integerDataType = this.picklistDataType = this.booleanDataType = false;

        }
        else if (conditiondataType === 'Currency' || conditiondataType === 'Int' || conditiondataType === 'Percent') {

            this.integerDataType = true;
            if (this.integerDataType === true) {
                for (var opp in operators) {
                    if (operators[opp].category === 'A' || operators[opp].category === 'B') {
                        comboOperators.push({
                            label: operators[opp].label,
                            value: operators[opp].value
                        });
                    }
                }
            }
            this.stringDataType = this.dateDataType = this.picklistDataType = this.booleanDataType = false;

        }
        else if (conditiondataType === 'Picklist') {

            this.picklistDataType = true; operators
            if (this.picklistDataType === true) {
                for (var opp in operators) {
                    if (operators[opp].category === 'A') {
                        comboOperators.push({
                            label: operators[opp].label,
                            value: operators[opp].value
                        });
                    }
                }
            }
            this.stringDataType = this.dateDataType = this.integerDataType = this.booleanDataType = false;
            this.picklistApiName = this.comboboxSelectField;

        }
        else if (conditiondataType === 'Boolean') {

            this.booleanDataType = true;
            if (this.booleanDataType === true) {
                for (var opp in operators) {
                    if (operators[opp].category === 'A') {
                        comboOperators.push({
                            label: operators[opp].label,
                            value: operators[opp].value
                        });
                    }
                }
            }

            this.stringDataType = this.dateDataType = this.integerDataType = this.picklistDataType = false;
        }
        this.comboboxOperators = comboOperators;

        this.inputStringValue = '';
        this.inputIntegerValue = '';
        this.InputDateValue = '';
        this.InputBooleanValue = '';

    }


    handleComboBoxOperator(event) {
        this.comboboxSelectOperator = event.detail.value;
    }

    //user input handler in filter combobox

    userInputStringValue(event) {

        let inputString = event.detail.value;
        if (inputString === '' || inputString === undefined || inputString === null) {
            this.inputStringValue = '';
        } else {
            this.inputStringValue = inputString;
        }

    }

    userInputIntegerValue(event) {

        let inputInteger = event.detail.value;
        if (inputInteger === '' || inputInteger === undefined || inputInteger === null) {
            this.inputIntegerValue = '';
        } else {
            this.inputIntegerValue = inputInteger;
        }

    }

    userInputDateValue(event) {

        let inputDate = event.detail.value;
        if (inputDate === '' || inputDate === undefined || inputDate === null) {
            this.InputDateValue = '';
        } else {
            this.InputDateValue = inputDate;
        }

    }

    userInputBooleanValue(event) {

        let inputBoolean = event.detail.value;
        if (inputBoolean === '' || inputBoolean === undefined || inputBoolean === null) {
            this.InputBooleanValue = '';
        } else {
            this.InputBooleanValue = inputBoolean;
        }

    }

    //lwc html side handler and all

    get filterOpenCondition() {
        return this.openFilter ? 'dividedTable' : 'defaultTable';
    }

    //filter open handler 
    handleOpenFilter(event) {
        this.openFilter = true;
    }

    handlerFilterAdd(event) {

        this.filterMainData.push(this.filterObject);

        //console.log('add filter filterdata-->', this.filterMainData);

    }

    handlerRemoveOneFilter(event) {

        const removeIndex = event.currentTarget.dataset.index;

        this.filterMainData.splice(removeIndex, 1);
        //   console.log('removeIndex---->>>',removeIndex);

    }


    handlerRemoveAllFilter(event) {

        this.filterMainData.length = 0;

    }



    handleItemClick(event) {

        var itemIndex = event.currentTarget.dataset.index;
        //   console.log('itemIndex--->>', itemIndex);

        this.itemIndex = itemIndex;

        this.selectedComboField = this.filterMainData[this.itemIndex].field;
        console.log('selectedComboField--->>', this.selectedComboField);
        this.selectedComboOperator = this.filterMainData[this.itemIndex].operator;
        console.log('selectedComboOperator--->>', this.selectedComboOperator);
        this.selectedComboValue = this.filterMainData[this.itemIndex].value;
        console.log('selectedComboValue--->>', this.selectedComboValue);

        //this.comboboxSelectField = this.selectedComboField;

        //this.comboboxSelectOperator = this.selectedComboOperator;

        //this.inputStringValue = this.selectedComboValue;   
    
        this.showBox = true;


    }

    get isConditionMet(){
        return this.comboboxSelectField != 'Name' ? this.selectedComboField : 'Name' ;
        
    }

    get operatorCondition(){
        return this.comboboxSelectOperator != '=' ? this.selectedComboOperator : '=';
    }

 

    handleFilterDone(event) {

        this.filFieldDisplay = this.comboboxSelectField;

        this.filOperatorDisplay = this.comboboxSelectOperator;

        var displayVal;

        if (this.inputStringValue != '') {
            displayVal = this.inputStringValue;
        }
        if (this.inputIntegerValue != '') {
            displayVal = this.inputIntegerValue;
        }
        if (this.InputDateValue != '') {
            displayVal = this.InputDateValue;
        }
        if (this.InputBooleanValue != '') {
            displayVal = this.InputBooleanValue;
        }
        if (displayVal == undefined) {
            displayVal = '';
        }

        //  console.log('displayVal-->',displayVal);

        this.filValueDisplay = displayVal;

        this.objData = { field: this.filFieldDisplay, operator: this.filOperatorDisplay, value: this.filValueDisplay };
        //console.log('objData-->>', this.objData);

        if (this.itemIndex != null) {
            this.filterMainData[this.itemIndex] = this.objData;
        }



        this.showBox = false;



    }





    handlerSaveFilter() {

        //this.apexFilterData =  this.filterMainData;
        //console.log('apexFilterData-->>',this.apexFilterData);

        this.apexFilterData = JSON.stringify(this.filterMainData);
        console.log('apexFilterData-->>', this.apexFilterData);



        getFilterSavaData({ objectApiName: this.objectApiName, filterMain: this.apexFilterData })
            .then(result => {
                console.log('resilt final--->>', JSON.parse(JSON.stringify(result)));
                this.DATA = result;

            });


    }

















}