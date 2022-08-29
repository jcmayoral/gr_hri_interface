import { SafeHeaderComponent } from '../../components/safe-header/safe-header.component';
import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeleopPage } from './teleop.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { TeleopPageRoutingModule } from './teleop-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    TeleopPageRoutingModule
  ],
  declarations: [TeleopPage, SafeHeaderComponent]
})
export class TeleopPageModule {}
