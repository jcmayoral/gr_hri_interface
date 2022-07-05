import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ViewDidEnter} from '@ionic/angular';

//import { create } from 'nipplejs';
import {create} from 'nipplejs';
import { Speed } from 'src/app/interfaces/speed';
import {RequestsService} from '../../services/requests.service'


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{
  size :number = 50;
  manager: any;
  thumbnail: any;
  objectURL: any;
  timer: any
  speed: Speed

  constructor(public navCtrl: NavController, 
              public req : RequestsService,
              private sanitizer: DomSanitizer
              ) {
  }

  ngOnInit(){
    console.log("constructor")
    var options = {
        zone: document.getElementById('zone_joystick'),
        size: 2 * this.size, 
        follow: true,
        restJoystick: true,
        id: 0
    };

    this.manager = create(options);
    this.setup()
  }

  setup(){
    this.speed = new Speed()
    const func = this.req;
    const size = this.size;
    /*
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
    */

    
    this.manager.on("move", async function(evt, data){
      console.log(this)
      //console.log("move", data.angle, data.position, data.distance, evt, this.speed)
      const response = await func.publish_speed(data.distance/size, data.angle.degree/360)
      //this.speed.vel_x = data.distance/size;
      //this.updateImage()
    })
    
    /*
    this.manager.on('added', function (evt, nipple) {
      console.log('added');
      console.log(nipple.angle, nipple.direction, nipple.force, nipple.force, nipple.position, nipple.pressure)
      console.log(nipple.raw, nipple.vector)
    })
    */
   this.StartTimer()
  }

  maxtime: any=30

  StartTimer(){
    this.timer = setTimeout(x => 
      {
        console.log("timer")
        this.updateImage()
        this.StartTimer();
      }, 2000);
 

  }
   
  
  async lock(){
    console.log(this.speed.vel_x, this.speed.vel_y)
    this.speed.vel_x = 2.0
    console.log("lock")
    const response = await this.req.lock()
    console.log("response", response)
  }

  updateImage(){
    console.log("update")
    var image = document.getElementById("feedback") as HTMLImageElement;
    console.log(image, image.complete)
    if(image.complete) {
        var new_image = new Image();
        //set up the new image
        new_image.id = "feedback";
        image.src = image.src + '?_=' + new Date().getMilliseconds();         
        console.log("a")  
        // insert new image and remove old
        //image.parentNode.insertBefore(new_image,image);
        //image.parentNode.removeChild(image);
    }
  }
}
