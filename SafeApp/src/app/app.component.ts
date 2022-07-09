import { Component } from '@angular/core';
import { HapticsService } from './services/haptics.service';
import { RequestsService } from './services/requests.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  timer: any;
  constructor(private haptics: HapticsService,
              private request: RequestsService) {
    console.log("haptics main")
    this.StartTimer()
  }

  StartTimer(){
    this.timer = setTimeout(async x => 
      {
        console.log("main timer")

        //this.haptics.hapticsImpactLight()

        const resp = (await this.request.get("status")).data
        if (false){//resp.problem){
          await this.haptics.hapticsImpactHeavy()
          alert("problem in robot")
        }
        this.StartTimer();
      }, 5000);
 

  }
}
