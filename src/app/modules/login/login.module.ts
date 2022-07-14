import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { LoginRoutingModule } from "./login-routing.module";



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ButtonModule,
    InputTextModule,
    PanelModule
  ],
  exports:[
  ]
})
export class LoginModule { }
