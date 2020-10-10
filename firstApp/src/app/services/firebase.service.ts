import { Injectable } from '@angular/core';

import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  login(email, password){
    return new Promise((resolve, reject)=>{

      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res=>{
        resolve(res);
      },err=>{
        reject(err);
      })
    })
  }
}
