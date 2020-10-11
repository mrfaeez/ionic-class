import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { from } from 'rxjs';
import { FirebaseService } from '../services/firebase.service';

import { Plugins } from '@capacitor/core';
const { Geolocation } = Plugins;

import { CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  addToDO=false;
  task:any;
  taskList:any=[];
  imagepath:any;

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

  async createTask(){

    const coordinates = await Geolocation.getCurrentPosition();
    console.log('Current', coordinates.coords.latitude, coordinates.coords.latitude);
    
    const location={
      lat: coordinates.coords.latitude,
      long: coordinates.coords.latitude 
    }

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

  async takePicture(){

    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    // image.webPath will contain a path that can be set as an image src.
    // You can access the original file using image.path, which can be
    // passed to the Filesystem API to read the raw data of the image,
    // if desired (or pass resultType: CameraResultType.Base64 to getPhoto)
    var imageUrl = image.webPath;
    // Can be set to the src of an image now
    this.imagepath = imageUrl;
  }
}
