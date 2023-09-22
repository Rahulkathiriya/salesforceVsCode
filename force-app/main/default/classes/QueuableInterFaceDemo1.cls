public class QueuableInterFaceDemo1 implements queueable{
    
    public void execute(QueueableContext qx){
        system.debug('i am execute a  method of QueuableInterFaceDemo1 class');
        
        Contact con = new Contact();
        con.LastName = 'saleforce noob Contact2';
        insert con;
        system.debug('contact name is ==='+ con.Name);
        
        Id jobId = system.enqueueJob(new QueuableInterFaceDemo2());
        system.debug('job id of QueuableInterFaceDemo2 ='+jobId);
    }
}