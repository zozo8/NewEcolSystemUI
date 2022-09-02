import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ButtonModule } from "primeng/button";
import { TableModule } from "primeng/table";
import { ToastModule } from "primeng/toast";
import { ToolbarModule } from "primeng/toolbar";
import { SplitterModule } from "primeng/splitter";
import { SplitButtonModule } from "primeng/splitbutton";
import { InputTextModule } from "primeng/inputtext";
import { PanelModule } from "primeng/panel";
import { CheckboxModule } from "primeng/checkbox";
import { MenubarModule } from "primeng/menubar";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { MessagesModule } from "primeng/messages";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./pages/users/users.component";
import { TableComponent } from "src/app/universalComponents/table/table/table.component";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule} from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";


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
    ToastModule,
    ButtonModule,
    ToolbarModule,
    SplitterModule,
    SplitButtonModule,
    InputTextModule,
    TranslateModule,
    PanelModule,
    FormsModule,
    CheckboxModule,
    MenubarModule,
    ConfirmDialogModule,
    MessagesModule

  ]
})
export class AdminModule { }
