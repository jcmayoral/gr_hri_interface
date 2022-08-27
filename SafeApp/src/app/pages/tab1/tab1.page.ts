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
  manager;
  thumbnail: any;
  objectURL: any;
  timer: any
  speed: Speed
  velx : string = "0";
  vely : string = "0";
  velz : string = "0";
  url : string

  constructor(public navCtrl: NavController, 
              public req : RequestsService,
              private sanitizer: DomSanitizer
              ) {
    this.url = "http://grassrobotics.sytes.net:8000/get_nav_feedback"
    this.speed = new Speed()
  }

  ngOnInit(){
    console.log("constructor")
    var options = {
        zone: document.getElementById('zone_joystick'),
        size: 2 * this.size, 
        follow: true,
        restJoystick: true,
        id: 0,
        dataOnly: false,
        dynamicPage : true
    };

    this.manager = create(options);
    this.setup()
  }

  setup(){
    var speed = new Speed()
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
    })

    this.handleData()

    
    
    /*
    this.manager.on('added', function (evt, nipple) {
      console.log('added');
      console.log(nipple.angle, nipple.direction, nipple.force, nipple.force, nipple.position, nipple.pressure)
      console.log(nipple.raw, nipple.vector)
    })
    */
   this.StartTimer()
  }

  async handleData(){
      const func = this.req;
      var speed = this.speed;
      var test = 0;
      var vx = this.velx;
      var size = this.size
      this.manager.on("move", async function(evt,data){
        //console.log("move", data.angle, data.position, data.distance, evt, this.speed)
        console.log(evt.type, evt.target.id, evt.target.actives[0], speed, vx)
        speed.vel_x = test;
        test = test +1;
        vx = test.toString();
        const response = await func.publish_speed(data.distance/size, data.angle.degree/360)
      })
      //this.updateImage()
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
    console.log("lock")
    const response = await this.req.lock()
    console.log("response", response)
  }

  updateImage(){
    console.log("update", this.speed)
    var image = document.getElementById("feedback") as HTMLImageElement;
    console.log(image, image.complete, this.velx)

    //importthis.velx = this.speed.vel_x.toString();
    //this.vely = this.speed.vel_y.toString();
    //this.velz = this.speed.vel_z.toString();
    if(image.complete) {
        //var new_image = new Image();
        //set up the new image
        //new_image.id = "feedback";
        //console.log(this.sanitizer.bypassSecurityTrustUrl(image.src + '?_=' + new Date().getMilliseconds()))
        image.src = this.url + '?_=' + new Date().getMilliseconds();         
        console.log("a")  
        // insert new image and remove old
        //image.parentNode.insertBefore(new_image,image);
        //image.parentNode.removeChild(image);
    }
  }
}
