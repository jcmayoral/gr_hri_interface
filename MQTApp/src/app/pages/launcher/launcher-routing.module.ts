import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LauncherPage } from './launcher.page';

const routes: Routes = [
  {
    path: '',
    component: LauncherPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LauncherPageRoutingModule {}
