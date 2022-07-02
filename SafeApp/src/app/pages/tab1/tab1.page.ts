import { Component, OnInit } from '@angular/core';
import { NavController, ViewDidEnter} from '@ionic/angular';

//import { create } from 'nipplejs';
import {create} from 'nipplejs';
import {RequestsService} from '../../services/requests.service'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  size :number = 50;
  manager: any

  constructor(public navCtrl: NavController, 
              public req : RequestsService,
              ) {
  }

  ngOnInit(){
    console.log("constructor")
    var options = {
        zone: document.getElementById('zone_joystick'),
        size: 2 * this.size, 
        follow: true
    };

    this.manager = create(options);
    this.setup()
  }

  setup(){
    const func = this.req;
    const size = this.size;
    this.manager.on('added', function (evt, nipple) {
      nipple.on('start move end dir plain', function (evt) {
          // DO EVERYTHING
          console.log("start")
      })
    })
    .on('removed', function (evt, nipple) {
      nipple.off('start move end dir plain');
      //this.call()
    });

    this.manager.on("move", async function(evt, data){
      console.log("move", data.angle, data.position, data.distance, evt)
      const response = await func.publish_speed(data.distance/size, data.angle.degree/360)
      var image = document.getElementById("feedback") as HTMLImageElement;

      if (image!= null){
        image.src = 'data:image/png;base64'+btoa(response.body);
      }
      console.log(response, image)
    })
    /*
    this.manager.on('added', function (evt, nipple) {
      console.log('added');
      console.log(nipple.angle, nipple.direction, nipple.force, nipple.force, nipple.position, nipple.pressure)
      console.log(nipple.raw, nipple.vector)
    })
    */
  }

  async lock(){
    console.log("lock")
    const response = await this.req.lock()
    console.log("response", response)
  }


}
