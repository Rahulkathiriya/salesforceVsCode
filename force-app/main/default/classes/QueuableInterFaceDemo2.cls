public class QueuableInterFaceDemo2 implements queueable{

    public void execute(QueueableContext qx){
        system.debug('i am execute a  method of QueuableInterFaceDemo2 class');
        
        Opportunity opp = new Opportunity ();
        opp.Name = 'saleforce noob Opportunity2';
        opp.CloseDate = system.today();
        opp.StageName = 'Closed Won';
        insert opp;
        system.debug('opportunity name is ==='+ opp.Name);
    }
}