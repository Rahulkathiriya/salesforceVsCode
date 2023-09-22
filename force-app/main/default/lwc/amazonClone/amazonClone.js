import { LightningElement } from 'lwc';
import login from '@salesforce/apex/LoginUser.login';

export default class AmazonClone extends LightningElement {

    email;
    password;
    isError=false;
    errorMessage='';

    handleUsername(event){
        this.email = event.target.value;

    }

    handlePasswordChange(event){
        this.password = event.target.value;
        

    }

    handleLogin(){
        console.log('Email-->'+this.email);
        console.log('password-->'+this.password);

        if(this.email != null && this.password != null ){
            login({ userName : this.email, password : this.password })
            .then( result => {
                this.isError = false;
                console.log('result---------->'+JSON.stringify(result));
            })
            .catch( error => {
                console.error(error);
                this.isError = true;
                this.errorMessage = error.body.message;
            })
        }
    }

}