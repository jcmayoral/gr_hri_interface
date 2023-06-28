import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NavController, ViewDidEnter} from '@ionic/angular';

//import { create } from 'nipplejs';
import {create} from 'nipplejs';
import { Speed } from 'src/app/interfaces/speed';
import {RequestsService} from '../../services/requests.service'

@Component({
  selector: 'app-teleop',
  templateUrl: 'teleop.page.html',
  styleUrls: ['teleop.page.scss']
})
export class TeleopPage implements OnInit{
  size :number = 50;
  manager;
  thumbnail: any;
  objectURL: any;
  timer: any
  speed: Speed
  url : string

  constructor(public navCtrl: NavController, 
              public req : RequestsService,
              private sanitizer: DomSanitizer
              ) {
    this.url = "http://localhost:8000/get_nav_feedback"
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
      var size = this.size
      this.manager.on("move", async(evt,data)=>{
        //console.log("move", data.angle, data.position, data.distance, evt, this.speed)
        console.log(evt.type, evt.target.id, evt.target.actives[0], speed)
        speed.vel_x = data.distance/size;
        speed.vel_z = data.angle.degree/360
        const response = await func.publish_speed(speed.vel_x, speed.vel_z)
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

  updateImage(){
    console.log("update", this.speed)
    var image = document.getElementById("feedback") as HTMLImageElement;
    console.log(image, image.complete)

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
