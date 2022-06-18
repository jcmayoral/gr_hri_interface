import { Component, OnInit } from '@angular/core';
import { ViewDidEnter } from '@ionic/angular';
import {RequestsService} from '../../services/requests.service'

@Component({
  selector: 'app-semi-autonomous',
  templateUrl: './semi-autonomous.page.html',
  styleUrls: ['./semi-autonomous.page.scss'],
})
export class SemiAutonomousPage implements ViewDidEnter {

  constructor(private req: RequestsService) { 

  }

  ionViewDidEnter() {
    console.log("init")
    this.loadPoints()
  
  }

  async loadPoints(){
    console.log("start")
    const response = await this.req.get("get_topomap/");
    console.log("response", response.data.points)
    
    response.data.points.forEach(element => {
      console.log(element)
    });
  }

}
