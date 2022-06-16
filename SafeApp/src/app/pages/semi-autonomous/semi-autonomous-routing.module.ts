import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SemiAutonomousPage } from './semi-autonomous.page';

const routes: Routes = [
  {
    path: '',
    component: SemiAutonomousPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SemiAutonomousPageRoutingModule {}
