import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'run-components',
    loadChildren: () => import('./pages/launcher/launcher.module').then( m => m.LauncherPageModule)
  },
  {
    path: 'diagnostics',
    loadChildren: () => import('./pages/diagnostics/diagnostics.module').then( m => m.DiagnosticsPageModule)
  },
  {
    path: 'semi-autonomous',
    loadChildren: () => import('./pages/semi-autonomous/semi-autonomous.module').then( m => m.SemiAutonomousPageModule)
  },
  {
    path: 'stats',
    loadChildren: () => import('./pages/stats/stats.module').then( m => m.StatsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
