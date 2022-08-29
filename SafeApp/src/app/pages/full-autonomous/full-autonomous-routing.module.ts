import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FullAutonomousPage } from './full-autonomous.page';

const routes: Routes = [
  {
    path: '',
    component: FullAutonomousPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FullAutonomousPageRoutingModule {}
