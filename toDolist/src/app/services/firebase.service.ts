import { Injectable } from '@angular/core';
import { rejects } from 'assert';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() { }

  // can also use auth guard
  checkUser(){

    return new Promise((resolve,reject)=>{

      firebase.auth().onAuthStateChanged(res=>{
        if(res!=null){
          resolve(res);
        }
        else{
          reject()
        }
      })
    })
    
  }

  login(email,password){

    return new Promise((resolve,reject)=>{
      
      firebase.auth().signInWithEmailAndPassword(email,password)
      .then(res=>{
        resolve(res);
      },err=>{
        rejects(err);
      })
    })
  }

  async logout(){

    await firebase.auth().signOut();
    await console.log("exit")

  }

  createEntry(task){

    return new Promise((resolve,reject)=>{

      let date=new Date();
      let timestamp=date.getTime();
      let user=firebase.auth().currentUser;
      // let email=user.email;

      let pack_data={
        task:task,
        timestamp:timestamp,
        status:'new',
        uid: user.uid
      }

      firebase
      .firestore()
      .collection('todo')
      .add(pack_data)
      .then(res=>{
        resolve(res);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  readEntry(){

    return new Promise((resolve,reject)=>{
      let user=firebase.auth().currentUser;
      let uid=user.uid;

      firebase
      .firestore()
      .collection('todo')
      .where('uid', '==', uid)
      .get()
      .then(results=>{
        let pack_data=[];

        results.forEach(data=>{
          pack_data.push({
            id:data.id,
            data:data.data()
          })
        })
        resolve(pack_data);
      })
      .catch(err=>{
        reject(err);
      })
    })

  }

  updateEntry(randomID){
    
    return new Promise((resolve,reject)=>{

      firebase
      .firestore()
      .collection('todo')
      .doc(randomID)
      .update({
        status:'done'
      })
      .then(res=>{
        resolve(res);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

  deleteEntry(randomID){

    return new Promise((resolve,reject)=>{

      firebase
      .firestore()
      .collection('todo')
      .doc(randomID)
      .delete()
      .then(res=>{
        resolve(res);
      })
      .catch(err=>{
        reject(err);
      })
    })
  }

}
