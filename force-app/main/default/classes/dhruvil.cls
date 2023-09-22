public virtual class dhruvil {

    public virtual void age(){
        system.debug('age is :');
    }
    
    private integer age =21;
    private integer borndate = 2023;
    private string gender = 'Male';
    
    public virtual integer getage(){
        return age;
    }
    public virtual  integer getborndate()
    {
        return borndate;
    }
    public virtual string getgender(){
        return gender;
    }
}