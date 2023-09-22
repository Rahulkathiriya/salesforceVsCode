public class m1 {

    public static void map1(){
        
        map<integer,string> m1 =new map <integer, string>();
        
        m1.put(19,'dhruvil');
            m1.put(15,'abc');
            m1.put(29,'sdf');
            m1.put(39,'fhdy');
        system.debug(m1);
        
        
        map<integer,string> m11 =new map <integer, string>{1 => 'sjdb', 2 => 'sdjs', 3 => 'jdfjdgdf'};
              system.debug(m11);
        
        m1.putAll(m11);
          system.debug(m1);
        
     system.debug(m1.get(3));
        
        list<string> l=new list<string>();
        l=m1.values();
        system.debug(l);
        
            map<integer,string> o =new map <integer, string>();
          o = m1.clone();
             system.debug(o);
        
            system.debug(m1.KeySet());
        
       system.debug(m1.containsKey(15));
        
         system.debug(m1.isEmpty());
        
         system.debug(m1.size());
        
        system.debug(4);
        
        m1.clear();
        system.debug(m1);
        
    }  
}