import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunComponentsPageRoutingModule } from './run-components-routing.module';

import { RunComponentsPage } from './run-components.page';

//import { File } from '@ionic-native/file/ngx';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunComponentsPageRoutingModule
  ],
  //providers: [File],
  declarations: [RunComponentsPage]
})
export class RunComponentsPageModule {}
