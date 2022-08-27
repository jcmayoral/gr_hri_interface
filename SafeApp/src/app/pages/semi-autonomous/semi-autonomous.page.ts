import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';

@Component({
  selector: 'app-semi-autonomous',
  templateUrl: './semi-autonomous.page.html',
  styleUrls: ['./semi-autonomous.page.scss'],
})
export class SemiAutonomousPage implements ViewDidEnter {

  constructor() { 

  }

  ionViewDidEnter() {
    console.log("init")
  
  }


}
