import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'run-components',
    loadChildren: () => import('./pages/launch-sensors/launch-sensors.module').then( m => m.LaunchSensorsPageModule)
  },
  {
    path: 'diagnostics',
    loadChildren: () => import('./pages/diagnostics/diagnostics.module').then( m => m.DiagnosticsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
