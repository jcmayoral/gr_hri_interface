import { Component } from '@angular/core';
import { HapticsService } from './services/haptics.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private haptics: HapticsService) {
    console.log("haptics main")
    this.haptics.hapticsImpactLight()
  }
}
