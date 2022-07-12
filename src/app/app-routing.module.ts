import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardPageComponent } from "./components/pages/dashboard-page/dashboard-page.component";
import { MainpageComponent } from "./components/pages/dashboard/mainpage/mainpage.component";
import { NotfoundComponent } from "./components/pages/notfound/notfound.component";
import { UsersComponent } from "./modules/admin/pages/users/users.component";
import { LoginComponent } from "./modules/login/login.component";
import { AuthGuard } from "./shared/auth.guard";
import { LoginGuard } from "./shared/login.guard";

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginComponent,canActivate:[LoginGuard]},
  {path:"dashboard", component:DashboardPageComponent,canActivate:[AuthGuard], children:[
    {path:"mainpage", component:MainpageComponent, canActivate:[AuthGuard]},
    {path:"admin/users", component:UsersComponent, canActivate:[AuthGuard]},

  ]},
  {path:"**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
