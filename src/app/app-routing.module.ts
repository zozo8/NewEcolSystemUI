import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './components/pages/dashboard-page/dashboard-page.component';
import { AuthGuard } from './modules/login/auth/auth.guard';
import { LoginGuard } from './modules/login/login.guard';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { Summary1Component } from './pages/summary1/summary1.component';

// cli new module: ng generate module customers --route customers --module app.module
const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    canActivate: [LoginGuard],
    loadChildren: () =>
      import('../app/modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'summary1',
        component: Summary1Component,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'dictionaries',
    loadChildren: () =>
      import('./modules/dictionaries/dictionaries.module').then(
        (m) => m.DictionariesModule
      ),
  },
  {
    path: 'universalComponents',
    loadChildren: () =>
      import('./modules/universal-components/universal-components.module').then(
        (m) => m.UniversalComponentsModule
      ),
  },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
