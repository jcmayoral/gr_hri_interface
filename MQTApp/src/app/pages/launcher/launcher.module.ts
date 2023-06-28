import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LauncherPageRoutingModule } from './launcher-routing.module';

import { LauncherPage } from './launcher.page';

//import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LauncherPageRoutingModule
  ],
  //providers: [File],
  declarations: [LauncherPage]
})
export class LauncherPageModule {}
