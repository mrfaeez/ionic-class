import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:any;
  password:any;

  constructor(
    public fbs:FirebaseService,
    public nav:NavController,
    public menu:MenuController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.menu.enable(false);
  }

  login(){
    this.fbs.login(this.email,this.password)
    .then(res=>{
      console.log("SUCCESS", res)
      this.nav.navigateForward('folder/test');
    },err=>{
      console.log("ERROR", err)
    })
  }
}
