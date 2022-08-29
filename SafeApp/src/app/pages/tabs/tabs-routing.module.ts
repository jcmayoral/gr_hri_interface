import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'teleop',
        loadChildren: () => import('../teleop/teleop.module').then(m => m.TeleopPageModule)
      },
      {
        path: 'semiautonomous',
        loadChildren: () => import('../semi-autonomous/semi-autonomous.module').then(m => m.SemiAutonomousPageModule)
      },
      {
        path: 'fullautonomous',
        loadChildren: () => import('../full-autonomous/full-autonomous.module').then(m => m.FullAutonomousPageModule)
      },
      {
        path: 'launch-sensors',
        loadChildren: () => import('../launch-sensors/launch-sensors.module').then(m => m.LaunchSensorsPageModule)
      },
      {
        path: 'diagnostics',
        loadChildren: () => import('../diagnostics/diagnostics.module').then(m => m.DiagnosticsPageModule)
      },
      {
        path: 'stats',
        loadChildren: () => import('../stats/stats.module').then(m => m.StatsPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/teleop',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/teleop',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
