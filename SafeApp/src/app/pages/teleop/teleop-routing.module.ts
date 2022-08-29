import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TeleopPage } from './teleop.page';

const routes: Routes = [
  {
    path: '',
    component: TeleopPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeleopPageRoutingModule {}
