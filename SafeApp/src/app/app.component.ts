import { Component } from '@angular/core';
import { HapticsService } from './services/haptics.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  timer: any;
  constructor(private haptics: HapticsService) {
    console.log("haptics main")
    this.StartTimer()
  }

  StartTimer(){
    this.timer = setTimeout(x => 
      {
        console.log("main timer")
        this.haptics.hapticsImpactLight()
        this.StartTimer();
      }, 2000);
 

  }
}
