<aura:application extends="force:slds" controller="fieldlevelsecurityinAccesible" >
    
    <aura:attribute name="recordId" type="Id" />
    <aura:attribute name="Opportunities" type="Opportunity" />
    <aura:attribute name="Columns" type="List" />
    <aura:handler name="init" value="{!this}" action="{!c.myAction}" /> 
    <!-- pagination -->
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    <aura:attribute name="ContactList" type="Opportunity[]"/>
    <aura:attribute name="PageNumber" type="integer" default="1"/>
    <aura:attribute name="TotalPages" type="integer" default="0"/>
    <aura:attribute name="TotalRecords" type="integer" default="0"/>
    <aura:attribute name="RecordStart" type="integer" default="0"/>
    <aura:attribute name="RecordEnd" type="integer" default="0"/>
    
    
    <div class = "slds-no-print">
        <div class="slds-clearfix slds-p-around_medium">
            <lightning:avatar size="large"   
                              src="https://www.seekpng.com/png/detail/67-673215_salesforce-logo-salesforce-logo-transparent-grey.png"
                              class="slds-m-right_small slds-avatar_large" />
            
            <div class="slds-float_right">
                <div class = "slds-no-print">
                    <p><a class="slds-text-color_default" href="javascript:void(0)" onclick="{!c.close}">close window</a></p>
                    <p><a class="slds-text-color_default" href="javascript:void(0)" onclick="{!c.print}">Print This Page</a></p>
                </div>
            </div>
        </div>
    </div>  
    
    <div class="slds-border_top"></div> 
    <div class="slds-m-around_xx-small">
        <h1 class="slds-text-body_small"><b>All Opportunities</b></h1>
        <p>Displaying records: {!v.RecordStart}-{!v.RecordEnd}</p>
        <div class="slds-float_right">
            <ui:inputSelect aura:id="pageSize"  label="Number of records:" change="{!c.onSelectChange}">
                <ui:inputSelectOption text="35" label="35" value="35"/>
                <ui:inputSelectOption text="80" label="80" value="80"/>
                <ui:inputSelectOption text="160" label="160" value="160"/>
            </ui:inputSelect>
            <br/> 
        </div>
    </div>
    
    <div class="slds-m-around_xx-large">
        <force:recordData aura:id="accountRecord"
                          recordId="{!v.recordId}"
                          targetFields="{!v.Account}"
                          layoutType="FULL"
                          />
    </div>
    <div class="custom-color">
          <lightning:datatable data="{! v.Opportunities }" columns="{! v.Columns }" keyField="Id" hideCheckboxColumn="true"/> 
    </div>
  
    <div class="slds-align_absolute-center" style="height:5rem">Copyright © 2000-2022 salesforce.com, inc. All rights reserved.</div>       
</aura:application>