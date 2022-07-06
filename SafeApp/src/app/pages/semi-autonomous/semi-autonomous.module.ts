import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SemiAutonomousPageRoutingModule } from './semi-autonomous-routing.module';

import { SemiAutonomousPage } from './semi-autonomous.page';
import { ScatterComponent } from 'src/app/components/scatter/scatter.component';
import { VoronoiComponent } from 'src/app/components/voronoi/voronoi.component';
import { MapComponent } from 'src/app/components/map/map.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SemiAutonomousPageRoutingModule
  ],
  declarations: [SemiAutonomousPage, ScatterComponent, VoronoiComponent, MapComponent]
})
export class SemiAutonomousPageModule {}
