import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LaunchSensorsPageRoutingModule } from './launch-sensors-routing.module';

import { LaunchSensorsPage } from './launch-sensors.page';

//import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LaunchSensorsPageRoutingModule
  ],
  //providers: [File],
  declarations: [LaunchSensorsPage]
})
export class LaunchSensorsPageModule {}
