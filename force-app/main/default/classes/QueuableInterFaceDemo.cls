public class QueuableInterFaceDemo implements queueable{

    public void execute(QueueableContext qx){
        system.debug('i am execute a  method of QueuableInterFaceDemo class');
        
        Account acc = new Account ();
        acc.Name = 'saleforce noob Account2';
        insert acc;
        system.debug('acc name is ==='+ acc.Name);
        
        
        Id jobId = system.enqueueJob(new QueuableInterFaceDemo1());
        system.debug('job id of QueuableInterFaceDemo1 ='+jobId);
    }
}