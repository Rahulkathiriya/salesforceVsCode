import { LightningElement, track } from 'lwc';

export default class ToDo extends LightningElement {
@track
    todoTasks =[];
    newTask = '';

    updateNewTask(event){

this.newTask = event.target.value;
      //console.log(event.target);
       //console.log(event.target.value);
       //console.log(this.newTask);
    };

    addTaskToList(event){
       // console.log('on button click');
       console.log(event.target.value);
       // unshift function - used to add element at the beggining (front) of array
    /*   this.todoTasks.unshift({
        id: this.todoTasks.length +1,
        name : this.newTask 
       });  */

       // push function - used to add element at the end of the array
     this.todoTasks.push({
        id: this.todoTasks.length +1,
        name : this.newTask 
       }); 
    //   console.log(this.todoTasks);

    this.newTask='';
    }
}