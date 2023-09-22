<aura:application extends="force:slds" controller="ListViewClass">
       
    

    
    
   <aura:handler name="init" value="{!this}"  action="{!c.handleDataChange}" />
    
    <aura:attribute name="dataList" type="List" />
    <aura:attribute name="viewName" type="String" />
    <aura:attribute name="listViewId" type="String" />
    <aura:attribute name="objName" type="String" />
    <aura:attribute name="accountList" type="List"/>
     <aura:attribute name="printColumns" type="List" />
    <aura:attribute name="copyList" type="List" />
    
    <div class="main-container" >
    <div class="container">
        <div class="header-section">
            <div class="img">
                <img src="/img/salesforce_printable_logo.gif" alt="Salesforce" width="146" height="47" title="Salesforce"></img>
            </div>
            <div class="list">
                <ul>
                    <li><a onclick="{!c.closeWindow}" style="font-size:10px;">Close Window</a></li>
                    <li><a onclick="{!c.printTab}" style="font-size:10px;">Print This Page</a></li>
                </ul>
            </div>
        </div>
        <div class="detail">
            <div class="records">
                <h1 ><b style="color:black;">{!v.viewName}</b></h1>
                <p style="color:black;font-size:10px;">Display  1 - {!v.dataList.length} records</p>
            </div>
            <div class="selection">
                <label style="color:black;font-size:10px;">Number of records &nbsp;</label>
                <select id="options" name="rowperpage" onchange="{!c.selectOption}" style="color: black;">
                    <option value="{!v.copyList.length}" selected="selected">{!v.copyList.length}</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                </select>
            </div>
        </div>
        <div class="table-record">
             <div class="table">
                <div class="pbHeader"> &nbsp;</div>
              
            </div>  
            <div style="border-left:1px solid #ececec;">
           <lightning:datatable
                             class="tableClass"
                             data="{!v.dataList}"
                             aura:id="recordTable"
                             columns="{!v.printColumns}"
                             keyField="Id"
                             showRowNumberColumn="true"
                             hideCheckboxColumn="true"
                             />
                </div>
        </div>
        
        <div class="footer">
            <div class="footer-content">
                <p style="color:black;font-size:10px;">Copyright © 2000-2023 salesforce.com, inc. All rights reserved.</p>
            </div>
        </div>
    </div>
    </div>
</aura:application>