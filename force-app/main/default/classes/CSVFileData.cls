public class CSVFileData {
    
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
        
        Blob csvBlob = blob.valueOf(csvFile);
        String csvName = 'Last 10 Days Account Data';
        

        
        ContentVersion con = new ContentVersion();
        con.VersionData = csvBlob;
        con.Title = csvName;
        con.PathOnClient = csvName + '.csv';
        
        system.debug('con-->'+con);
        insert con;
    
        
        
        
        
        
        
        
        
    }
    
}