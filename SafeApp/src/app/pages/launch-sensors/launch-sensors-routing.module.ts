import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LaunchSensorsPage } from './launch-sensors.page';

const routes: Routes = [
  {
    path: '',
    component: LaunchSensorsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LaunchSensorsPageRoutingModule {}
