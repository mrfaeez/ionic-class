import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
    public nav:NavController
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.fbs.checkUser()
    .then(_=>{
      this.nav.navigateForward('home')
    })
    .catch(err=>{
      console.log('do nothing', err)
    })
  }

  loginEmail(){
    this.fbs.login(this.email, this.password)
    .then(_=>{
      this.nav.navigateForward('home');
    })
    .catch(err=>{
      alert(err);
    })
  }

  

}
