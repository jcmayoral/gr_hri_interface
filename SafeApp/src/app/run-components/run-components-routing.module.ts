import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RunComponentsPage } from './run-components.page';

const routes: Routes = [
  {
    path: '',
    component: RunComponentsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RunComponentsPageRoutingModule {}
