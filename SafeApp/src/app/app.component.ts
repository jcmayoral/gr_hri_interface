import { Component } from '@angular/core';
import { HapticsService } from './services/haptics.service';
import { RequestsService } from './services/requests.service';
import { AudioService } from './services/audio.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  timer: any;
  constructor(private haptics: HapticsService,
              private request: RequestsService, 
              private audio: AudioService) {
    console.log("haptics main")
    this.audio.preload('Alert', 'assets/audio/starwars.mp3');
    this.StartTimer()
  }

  StartTimer(){
    this.timer = setTimeout(async x => 
      {
        console.log("main timer")

        //this.haptics.hapticsImpactLight()

        const resp = true;// (await this.request.get("status")).data
        if (true) {//(resp.problem){
          await this.audio.play('Alert')

          await this.haptics.hapticsImpactHeavy().then(()=>{
            //this.audio.play('Alert')
          }).catch(()=>
          {
            //this.audio.play('Alert')

          })
          alert("problem in robot")
        }
        this.StartTimer();
      }, 5000);
 

  }
}
