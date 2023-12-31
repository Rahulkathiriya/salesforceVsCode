<aura:application extends="force:slds" controller="fieldlevelsecurityinAccesible" >
    
    <aura:attribute name="recordId" type="Id" />
    <aura:attribute name="Accounts" type="Account" />
    <aura:attribute name="Columns" type="List" />
    
    <!-- pagination -->
    <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
    <aura:attribute name="ContactList" type="Account[]"/>
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
        <h1 class="slds-text-body_small"><b>All Accounts</b></h1>
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
    
    
    <div class="custom-color">
      
        <table class="slds-table slds-table_bordered slds-table_cell-buffer">
            <thead>
                <tr class="slds-text-title_caps">
                    <th scope="col">
                        <strong><div class="slds-truncate" title="Name">Name</div></strong>
                    </th>
                    <th scope="col">
                        <strong><div class="slds-truncate" title="Account Site">Site</div></strong>
                    </th>
                    <th scope="col">
                        <strong><div class="slds-truncate" title="Phone">Phone</div></strong>
                    </th>
                    <th scope="col">
                        <strong><div class="slds-truncate" title="Employees">NumberOfEmployees</div></strong>
                    </th>
                </tr>
            </thead>
            <tbody>
                <aura:iteration items="{!v.ContactList}" var="con"> 
                    <tr>
                        <th scope="row" data-label="Name">
                            <div class="slds-truncate" title="{!con.Name}">{!con.Name}</div>
                        </th>
                        <th scope="row" data-label="Site">
                            <div class="slds-truncate" title="{!con.Site}">{!con.Site}</div>
                        </th>
                        <th scope="row" data-label="Phone">
                            <div class="slds-truncate" title="{!con.Phone}">{!con.Phone}</div>
                        </th>
                        <th scope="row" data-label="NumberOfEmployees">
                            <div class="slds-truncate" title="{!con.NumberOfEmployees}">{!con.NumberOfEmployees}</div>
                        </th>
                    </tr>
                </aura:iteration> 
            </tbody>
        </table>
    </div>
 
    <div class="slds-align_absolute-center" style="height:5rem">Copyright © 2000-2022 salesforce.com, inc. All rights reserved.</div>       
</aura:application>