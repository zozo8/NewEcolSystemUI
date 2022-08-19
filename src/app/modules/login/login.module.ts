import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { LoginComponent } from "./login.component";
import { FormsModule } from "@angular/forms";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { ProgressBarModule } from "primeng/progressbar";


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
    PanelModule,
    ProgressBarModule
  ],
  exports:[
  ]
})
export class LoginModule { }
