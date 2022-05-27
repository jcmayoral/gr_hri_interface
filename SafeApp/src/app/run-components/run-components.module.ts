import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RunComponentsPageRoutingModule } from './run-components-routing.module';

import { RunComponentsPage } from './run-components.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RunComponentsPageRoutingModule
  ],
  declarations: [RunComponentsPage]
})
export class RunComponentsPageModule {}
