import { Component } from '@angular/core';
import { NavController} from '@ionic/angular';
import {RequestsService} from '../../services/requests.service'

//import { create } from 'nipplejs';
import {create} from 'nipplejs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  size :number = 50;

  constructor(public navCtrl: NavController, 
              private req : RequestsService,
              ) {

  }

  ngAfterViewInit() {
    console.log(document.getElementById('zone_joystick'));

    var options = {
        zone: document.getElementById('zone_joystick'),
        size: 2 * this.size
    };

    var manager = create(options);

    manager.on('added', function (evt, nipple) {
      console.log('added');
      console.log(nipple.angle, nipple.direction, nipple.force, nipple.force, nipple.position, nipple.pressure)
      console.log(nipple.raw, nipple.vector)
    })

    manager.on("move", function(evt,data){
      console.log("move", data.angle)
    })
      /*
      nipple.on('move', function (evt, data) {

        if(data.angle) {
          if(Math.abs(data.force) <= 1) {
            // px, py are between 0 and 1
            let px = +Math.sin(data.angle.radian) * data.force;
            let py = -Math.cos(data.angle.radian) * data.force;

            console.log('px: ' + px);
            console.log('py: ' + py);
          }
        }

      });
      
      }).on('removed', function (evt, nipple) {
        console.log('removed');
        nipple.off('move');
    });
    */
  }

  async lock(){
    console.log("lock")
    const response = await this.req.lock()
    console.log("response", response)
  }


}
