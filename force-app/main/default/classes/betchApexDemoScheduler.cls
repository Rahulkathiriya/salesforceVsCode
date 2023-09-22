public class betchApexDemoScheduler  implements schedulable{

    public void execute(schedulableContext sch){
	Id jobId = Database.executeBatch(new betchApexDemo());
        system.debug('job id of betchApexDemo in betchApexDemoScheduler is =='+jobId);
    }
}