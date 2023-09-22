public virtual class Shape {

    private integer  length  = 10;
    private integer breadth = 10;
    private integer radius = 20;
    private integer triangle = 10;
    
    
    public virtual void area(){
        system.debug('Area is :');
    }
    
    public virtual integer getlength(){
       return length; 
    }
     public virtual integer getbreadth(){
       return breadth; 
    }
    public virtual integer getradius(){
        return radius;
    }
    
    public virtual integer  gettri(){
        return triangle;
    }

    
    
    
}