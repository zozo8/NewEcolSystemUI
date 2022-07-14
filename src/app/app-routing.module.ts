import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardPageComponent } from "./components/pages/dashboard-page/dashboard-page.component";
import { MainpageComponent } from "./components/pages/dashboard/mainpage/mainpage.component";
import { NotfoundComponent } from "./components/pages/notfound/notfound.component";
import { AuthGuard } from "./shared/auth.guard";
import { LoginGuard } from "./shared/login.guard";


const routes: Routes = [
  {path:"", redirectTo:"login", pathMatch:"full"},
  {path:"login",canActivate:[LoginGuard], loadChildren:()=> import("../app/modules/login/login.module").then(m=>m.LoginModule)},
  {path:"dashboard", component:DashboardPageComponent,canActivate:[AuthGuard], children:[
    {path:"mainpage", component:MainpageComponent, canActivate:[AuthGuard]},
    {path:"admin", loadChildren:()=> import("../app/modules/admin/admin.module").then(m=>m.AdminModule)}
  ]},


  {path:"**", component:NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
