import { Component } from '@angular/core';

@Component({
  selector: 'app-full-autonomous',
  templateUrl: 'full-autonomous.page.html',
  styleUrls: ['full-autonomous.page.scss']
})
export class FullAutonomousPage {
  timer: any;
  url: string;

  constructor() {
    this.StartTimer()
    this.url = "http://grassrobotics.ddns.net:8000/get_nav_feedback"

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
    var image = document.getElementById("feedback") as HTMLImageElement;
    if(image.complete) {
        image.src = this.url + '?_=' + new Date().getMilliseconds();         
        console.log("a")  
    }
  }

}
