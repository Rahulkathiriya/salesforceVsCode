public class pageLayout {
 //Retrieve All Objects in org
    @Auraenabled
    public static List<string> getObjects(boolean shouldGetStandard)
    {
     
        List<string> sObjectList = new List<string>();
        
        system.debug('shouldGetStandard:'+shouldGetStandard);
        for(Schema.SObjectType objTyp : Schema.getGlobalDescribe().Values()){
            String name = objTyp.getDescribe().getName();
            if(shouldGetStandard)
            {
                sObjectList.add(name); 
            }
            if((!name.containsignorecase('history') && !name.containsignorecase('tag')&&
                !name.containsignorecase('share') && !name.containsignorecase('feed')) && 
               name.toLowerCase().right(3) ==  '__c'){      
                   sObjectList.add(name);
               }
        }
        system.debug('sObjectList:'+sObjectList);
        return sObjectList;
    }
    
    @Auraenabled
    public static List<string> getObjectLayout(string objectName)
    {
        return getLayoutNameForObject(objectName);
    }
    
    @Auraenabled
    public static List<string> getLayoutFields(string objectName,string layout)
    {
        return getFields(objectName,layout);
    }
    
    
    static String toolingAPISOQL(string query) {
        String baseURL = URL.getSalesforceBaseUrl().toExternalForm();
        //String baseURL='callout:ToolingRest?';
        return HttpCallout.restGet( baseURL +'/services/data/v41.0/tooling/query?q='+ (query.replace(' ', '+')),'GET', UserInfo.getSessionId());
        //return HttpCallout.restGet( baseURL +'q='+ (query.replace(' ', '+')),'GET', UserInfo.getSessionId());
    } 
    
    static List<string> getLayoutNameForObject(string objectName) {
        string sql='select Layout.Name from ProfileLayout where TableEnumOrId=\'objectName\'';
        String body = toolingAPISOQL(sql.replace('objectName', objectName));
        if(string.isNotBlank(body))
        {
            LayoutRecord data=LayoutRecord.parse(body);
            
            //get only layput name
            List<string> layouts=new List<string>();
            for(LayoutRecord.Record record:data.records)
            {
                if(!layouts.contains(record.Layout.Name))
                {
                    layouts.add(string.valueOf(record.Layout.Name));
                }
            }
            return layouts;
        }
        return null;
    }
    
    static List<string> getFields(string objectName,string layout) {
        string layoutName=String.format('{0}-{1}', new String[]{objectName, layout}); 
        System.debug('layoutName' + layoutName);
        List<Metadata.Metadata> layouts = Metadata.Operations.retrieve(Metadata.MetadataType.Layout, new List<String> {layoutName});
        //get only layput name
        List<string> fields=new List<string>();
        Metadata.Layout layoutMd = (Metadata.Layout)layouts.get(0);
        System.debug('layoutMd' + layoutMd);
        for (Metadata.LayoutSection section : layoutMd.layoutSections) {
            System.debug('section' + section);
            for (Metadata.LayoutColumn column : section.layoutColumns) {
                System.debug('column' + column);
                if (column.layoutItems != null) {
                    for (Metadata.LayoutItem item : column.layoutItems) {
                        System.debug('item' + item);
                        fields.add(item.field);
                        System.debug('fields' + fields);
                    }
                }
            }
        }
        return fields;
    }
}