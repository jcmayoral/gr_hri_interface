import { User } from './shared/user';
import { Component } from '@angular/core';
import { HapticsService } from './services/haptics.service';
import { RequestsService } from './services/requests.service';
import { AudioService } from './services/audio.service';
import { GeolocationService } from './services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  timer: any;
  constructor(private haptics: HapticsService,
              private request: RequestsService, 
              private audio: AudioService, 
              private geo: GeolocationService,
              private user: User) {
    this.audio.preload('Alert', 'assets/audio/starwars.mp3');
    this.geo.setWatchDog()
    this.user.createDB()
    this.StartTimer()
  }

  StartTimer(){

    this.timer = setTimeout(async x => 
      {
        console.log("main timer")
        //this.geo.getCurrentPosition()
        //this.haptics.hapticsImpactLight()

        if (this.user.isLoggedIn()){
          console.log("skip")
          //const resp =  (await this.request.get("status")).data
          if (false){//resp.problem){
            await this.audio.play('Alert')

            await this.haptics.hapticsVibrate().then(()=>{
              //this.audio.play('Alert')
            }).catch(()=>
            {
              //this.audio.play('Alert')

            })
            alert("problem in robot")
          }
        }
        this.StartTimer();
      }, 5000);
 

  }
}
