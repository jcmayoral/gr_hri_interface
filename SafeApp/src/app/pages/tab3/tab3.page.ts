import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  timer: any;
  url: string;

  constructor() {
    this.StartTimer()
    this.url = "http://grassrobotics.sytes.net:8000/get_nav_feedback"

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
