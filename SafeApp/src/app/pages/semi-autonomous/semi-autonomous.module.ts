import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemiAutonomousPageRoutingModule } from './semi-autonomous-routing.module';

import { SemiAutonomousPage } from './semi-autonomous.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemiAutonomousPageRoutingModule
  ],
  declarations: [SemiAutonomousPage]
})
export class SemiAutonomousPageModule {}
