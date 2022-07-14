import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { MenubarModule } from "primeng/menubar";
import { SplitButtonModule } from "primeng/splitbutton";
import { TreeModule } from "primeng/tree";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./pages/users/users.component";
import { TableComponent } from "src/app/universalComponents/table/table/table.component";
import { HttpClient, HttpClientModule } from "@angular/common/http";


@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    TableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    TableModule,
    ToastModule
  ]
})
export class AdminModule { }
