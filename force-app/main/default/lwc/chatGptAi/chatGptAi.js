import { LightningElement } from 'lwc';

export default class ChatGptAi extends LightningElement {
    question = 'Hello';
    data;
    isLoaded = true;
    isChange = true;
    message = '';

    handlerOnChange(event){
        this.question = event.target.value;
        this.isChange = true;

    }

    handlerOnClick(){
        if(this.isChange){
            this.isLoaded = false;
            this.getChatGPTdata();
            this.isChange = false;
             
        }
    }

    async getChatGPTdata(){
        const endPoint = "https://api.openai.com/v1/chat/completions";
        const myHeaders = new Headers();
        myHeaders.append("Authorization", "Bearer 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");
        myHeaders.append("Content-Type", "aplication/json");

        const raw = JSON.stringify({
            
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "user", 
                        "content": this.question
                    }
                ]
        });

        const requestOptions = {
            method: 'POST',
            headers:myHeaders,
            body: raw,
            redirect: 'follow'
        };
        
        try{
            const response = await fetch(endPoint,requestOptions);
            const result_1 = await response.json();
            this.data = result_1;
            console.log(this.data);
            this.message = this.data.choices[0].message.content;
            this.isLoaded = true;
        }catch(error){
            return console.log('error',error);
        }


    }


}