import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { MenubarModule } from "primeng/menubar";
import { SplitButtonModule } from "primeng/splitbutton";
import { TreeModule } from "primeng/tree";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { DashboardPageComponent } from "./components/pages/dashboard-page/dashboard-page.component";
import { MainpageComponent } from "./components/pages/dashboard/mainpage/mainpage.component";
import { NotfoundComponent } from "./components/pages/notfound/notfound.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthconfigInterceptor } from "./shared/authconfig.interceptor";
import { FormsModule } from "@angular/forms";
import { AdminModule } from "./modules/admin/admin.module";
import { LoginModule } from "./modules/login/login.module";

@NgModule({
  declarations: [
    AppComponent,
    DashboardPageComponent,
    MainpageComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    LoginModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ButtonModule,
    InputTextModule,
    PanelModule,
    MenubarModule,
    SplitButtonModule,
    TreeModule,
    TableModule,
    ToastModule

  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:AuthconfigInterceptor,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
