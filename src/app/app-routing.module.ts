import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardPageComponent } from "./components/pages/dashboard-page/dashboard-page.component";
import { MainpageComponent } from "./components/pages/dashboard/mainpage/mainpage.component";
import { LoginComponent } from "./components/pages/login/login.component";
import { NotfoundComponent } from "./components/pages/notfound/notfound.component";
import { AuthGuard } from "./shared/auth.guard";

const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login", component:LoginComponent,canActivate:[AuthGuard]},
  {path:"dashboard", component:DashboardPageComponent,canActivate:[AuthGuard], children:[
    {path:"mainpage", component:MainpageComponent, canActivate:[AuthGuard]}
  ]},
  {path:"**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
