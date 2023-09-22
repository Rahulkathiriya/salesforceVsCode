public class CreateCSVFIleTechdicerCtrl {
 
    public static void createCsv(){
        String csvColumnHeader;
        List<String> csvRowValues = new List<String>();
        String parentId;
        for(Account acc : [SELECT Id, Name, Type, AccountNumber, CreatedDate FROM Account LIMIT 10]){
            String formattedDate = acc.CreatedDate.format('M/d/yyyy h:mm:ss a z');
            String accountName = acc.Name != null ? String.valueOf(acc.Name).escapeCsv() : '';
            String accountType = acc.Type != null ? acc.Type : '';
            String accountNumber = acc.AccountNumber != null ? acc.AccountNumber : '';
            
            String csvRowVal = formattedDate + ',' + accountName + ',' + accountType + ',' + accountNumber;
            csvRowValues.add(csvRowVal);
            parentId = acc.Id;
        }
            csvColumnHeader = 'Date, Name, Type, Account Number\n';
            String csvFile = csvColumnHeader + String.join(csvRowValues,'\n');
 
            //send email
            Messaging.SingleEmailMessage message = new Messaging.SingleEmailMessage();
            Messaging.EmailFileAttachment attach1 = new Messaging.EmailFileAttachment();
            blob b;
        
         
                b = Blob.valueOf(csvFile);                      
 
            attach1.setFileName('test.csv');
            attach1.setBody(b);
            message.setFileAttachments(new Messaging.EmailFileAttachment[]{attach1});
            String[] toAddresses = new String[] {'sdfds@gmail.com'}; 
            message.setToAddresses(toAddresses); 
            message.setSubject('how-to-create-or-generate-a-csv-file-in-apex-salesforce-techdicer'); 
            message.setHtmlBody('This email is for testing purpose of Create csv files');
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { message });
 
        }
    }