import { Component, OnInit } from '@angular/core';
// import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.page.html',
  styleUrls: ['./all-list.page.scss'],
})
export class AllListPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  async getData(){
    const {Http}=Plugins;

    await Http.request({
      method: 'GET',
      url: ''
    })
    .then(res=>{
      console.log(res)
    })
    .catch(err=>{
      console.log(err);
    })
  }

}
