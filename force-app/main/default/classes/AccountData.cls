public class AccountData {
    
    public static void getAccData(){
        
        List<Account> accountCsv = new List<Account> ();
        
        List<Account> accList = [SELECT Id,Name,Phone,AccountSource,Industry,Rating,Type,CreatedDate FROM Account WHERE CreatedDate >= LAST_N_DAYS:10];
        
        for(Account acc : accList){
            accountCsv.add(acc);
            // system.debug('data-->'+acc);  
        }
        
        String generatedCSVFile ='';
        String queryFields = 'Id,Name,Phone,AccountSource,Industry,Rating,Type,CreatedDate\n';
     
        String fileRow = '';
        String csvFile;
        
        for(Account acc: accountCsv){
            fileRow = '';
            fileRow = fileRow +','+ acc.Id;
            fileRow = fileRow +','+ acc.Name;
            fileRow = fileRow +','+ acc.Phone;
            fileRow = fileRow +','+ acc.AccountSource;
            fileRow = fileRow +','+ acc.Industry;
            fileRow = fileRow +','+ acc.Rating;
            fileRow = fileRow +','+ acc.Type;
            fileRow = fileRow +','+ acc.CreatedDate;
            fileRow = fileRow.replaceFirst(',','');
            generatedCSVFile = generatedCSVFile + fileRow + '\n';
            csvFile = queryFields + generatedCSVFile ;
           // system.debug('csvFile-->'+csvFile);
            
        }
        
        
        
        Messaging.EmailFileAttachment csvAttachment = new Messaging.EmailFileAttachment();
        Blob csvBlob = blob.valueOf(csvFile);
        String csvName = 'Last 10 Days Account Data.csv';
        csvAttachment.setFileName(csvName);
        csvAttachment.setBody(csvBlob);
        
        Messaging.SingleEmailMessage email = new Messaging.SingleEmailMessage();
        String[] toAddresses = new String[]{'vegaddhruvil23@gmail.com'};
        String subject = 'Last 10 Days Account Data.csv';
        email.setSubject(subject);
        email.setToAddresses(toAddresses);
        email.setPlainTextBody('Last 10 Days Account Data.csv');
        email.setFileAttachments(new Messaging.EmailFileAttachment[]{csvAttachment});
        Messaging.SendEmailResult[] r = Messaging.sendEmail(new Messaging.SingleEmailMessage[]{email});
    }
    
    
   /*  var hiddenElement = document.createElement('a');
        hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
        hiddenElement.target = '_self';
        hiddenElement.download = 'EmailSendList.csv';
        //hiddenElement.download = component.get("v.fileName");
        document.body.appendChild(hiddenElement); //Required for FireFox browser
        hiddenElement.click(); // using click() js function to download csv file  */
}