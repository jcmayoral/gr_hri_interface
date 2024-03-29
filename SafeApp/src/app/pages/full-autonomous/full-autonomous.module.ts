import { SafeHeaderComponent } from './../../components/safe-header/safe-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FullAutonomousPage } from './full-autonomous.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import {FullAutonomousPageRoutingModule } from './full-autonomous-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: FullAutonomousPage }]),
    FullAutonomousPageRoutingModule,
  ],
  declarations: [FullAutonomousPage, SafeHeaderComponent]
})
export class FullAutonomousPageModule {}
