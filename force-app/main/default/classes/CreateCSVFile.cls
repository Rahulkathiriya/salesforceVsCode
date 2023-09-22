public class CreateCSVFile {
    public static void createCsv(){
        String csvColumnHeader;
        List<String> csvRowValues = new List<String>();
        String parentId;
        for(Account acc : [select Id,Name,Type,AccountNumber,CreatedDate FROM Account LIMIT 10]){
            
            string formatedDate = acc.CreatedDate.format('M/d/yyyy h:mm:ss a z');
            string accountName = acc.Name != null ? string.valueOf(acc.Name).escapeCsv() : '';
            string accountType = acc.Type != null ? acc.Type : '';
            string accountNumber = acc.AccountNumber != null ? acc.AccountNumber : '';
            
            string csvRowVal = formatedDate + ',' + accountName + ',' + accountType + ',' + accountNumber ;
            csvRowValues.add(csvRowVal);
            parentId = acc.Id;
            
            system.debug('csvRowVal--->' + csvRowVal);
        }
        csvColumnHeader = 'Date, Name, Type, Account Number /n';
        string csvFile = csvColumnHeader + string.join(csvRowValues, '\n');
        
        system.debug('csvFile---->'+csvFile);
        
        //send Emaile
        Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
        Messaging.EmailFileAttachment attach1 = new Messaging.EmailFileAttachment();
        blob b;
        
        b =Blob.valueof(csvFile);
        
        
        attach1.setFileName('test.csv');
        attach1.setBody(b);
        message.setFileAttachments(new Messaging.EmailFileAttachment[] {attach1});
        string[] toAddresses = new string[] {'vegaddhruvil2323@gmail.com'};
        message.setToAddresses(toAddresses);
        message.setSubject('how-to-create-or-generate-a-csv-file-in-apex-salesforce-techdicer'); 
        message.setHtmlBody('This email is for testing purpose of Create csv files');
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] {message});
        
        
        
    }
}


/* downloadExcelFile : function(component,event,helper){

var csv = component.get('v.csv');
var blob = new Blob([csv],{type : "application/pdf — Portable Document Format (.pdf)"});
var link = document.createElement("a");
link.href = URL.createObjectURL(blob);
link.download = "accounts.csv";
link.click();


}, 


@auraEnabled
public static String generateCSV(List<Account> accList){

String csv = ' Account Id , Name , Site , BillingState , Type , Phone , Active__c , Status__c \n';

for(Account accs : accList){
system.debug('acclists --> ' + accs);
}

for(Account acc : accList){
csv += '" ' + acc.Id + ' ", ' + acc.Name + '," ' + acc.Site + '", ' + acc.BillingState + ', ' + acc.Type + '," ' + acc.Phone + '", '+ acc.Active__c + ','+acc.Status__c+'\n';
}

return csv;
}

var action = component.get('c.generateCSV');    
action.setParams({
accList: component.get('v.accList')
});
action.setCallback(this,function(resp){           
if(resp.getState() === 'SUCCESS'){
//    console.log('return csv value --> ',resp.getReturnValue());
component.set('v.csv',resp.getReturnValue());
}


*/