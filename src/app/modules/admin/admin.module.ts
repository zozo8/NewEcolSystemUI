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
import { TabViewModule } from "primeng/tabview";
import { BreadcrumbModule } from "primeng/breadcrumb";
import { DynamicDialogModule } from "primeng/dynamicdialog";

import { AdminRoutingModule } from "./admin-routing.module";
import { AdminComponent } from "./admin.component";
import { UsersComponent } from "./pages/users/users.component";
import { TableComponent } from "src/app/universalComponents/table/table.component";
import { HttpClientModule } from "@angular/common/http";
import { TranslateModule} from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { UserFormComponent } from "./pages/users/user-form/user-form.component";
import { FormComponent } from "src/app/universalComponents/form/form.component";
import { UserParamComponent } from './pages/users/user-param/user-param.component';
import { TableButtonComponent } from "src/app/universalComponents/table-button/table-button.component";
import { FormDialogComponent } from "src/app/universalComponents/form-dialog/form-dialog.component";

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    TableComponent,
    UserFormComponent,
    FormComponent,
    UserParamComponent,
    TableButtonComponent
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
    MessagesModule,
    TabViewModule,
    BreadcrumbModule,
    DynamicDialogModule
  ],
  entryComponents:[
    FormDialogComponent
  ]
})
export class AdminModule { }
