import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  addToDO=false;
  task:any;
  taskList:any=[];

  constructor(
    public fbs:FirebaseService,
    public nav:NavController
  ) {}

  ionViewWillEnter(){

    this.fbs.checkUser()
    .then(_=>{

      this.fbs.readEntry()
      .then(res=>{
        // console.log("TO DO", res);
        this.taskList=res;
      })
      .catch(err=>{
        console.log(err);
      })

    })
    .catch(err=>{
      console.log(err);
      this.signOut();
    })
  }

  toggleAddToDO(){

    if(this.addToDO==false){
      this.addToDO=true
    }

    else if(this.addToDO==true){
      this.addToDO=false;
    }
  }

  async signOut(){
    
    await this.fbs.logout()
    await this.nav.navigateBack('login')
  }

  createTask(){
    this.fbs.createEntry(this.task)
    .then(_=>{
      console.log("TASK ADDED")
    })
    .catch(err=>{
      console.log("ERROR ADDING TASK", err)
    })

    this.toggleAddToDO();
    this.task=null;
    this.ionViewWillEnter();
  }

  updateTask(id){

    this.fbs.updateEntry(id)
    .then(_=>{
      console.log("TASK UPDATED")
    })
    .catch(err=>{
      console.log("ERROR UPDATE TASK", err)
    })

    this.ionViewWillEnter();
  }

  deleteTask(id){
    this.fbs.deleteEntry(id)
    .then(_=>{
      console.log("ENTRY DELETED")
    })
    .catch(err=>{
      console.log("ERROR", err);
    })

    this.ionViewWillEnter();
  }
}
