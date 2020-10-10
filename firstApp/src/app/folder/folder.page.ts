import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  user_xyz:any;
  animalsArray=[
    'cats',
    'dogs',
    'chicken',
    'cow',
    'goat'
  ]

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  fireAlert() {
    alert("This is a fire alert!")
  }

  whatsMyName() {
    alert(this.user_xyz)
  }

  consoleArrays() {
    for(var x=0; x<this.animalsArray.length; x++){
      console.log('Animals', this.animalsArray[x])
    }

    for(let item of this.animalsArray){
      console.log('New for loop', item);
    }

    this.animalsArray.forEach(item=>{
      console.log('For each', item);
    })
  }

  checkAnimal() {
    if(this.user_xyz == 'duck'){
      alert("quack");
    }

    else if(this.user_xyz == 'snake'){
      alert("tsss");
    }

    else{
      alert("No Animal detected");
    }
  }

  async getStuff(){

    const { Http } = Plugins;

    const ret = await Http.request({
      method: 'GET',
      url: 'http://localhost:3000/',
    })
    .then(res=>{
      console.log("From Server", res);
    })
  }

}
