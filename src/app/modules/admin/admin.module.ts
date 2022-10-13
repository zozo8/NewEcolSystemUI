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
import { UserParamComponent } from "./pages/users/user-param/user-param.component";
import { TableButtonComponent } from "src/app/universalComponents/table-button/table-button.component";
import { FormDictionaryValueDialogComponent } from "src/app/universalComponents/dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component";
import { UserGroupComponent } from "./pages/users/user-group/user-group.component";
import { UserDepartmentComponent } from "./pages/users/user-department/user-department.component";
import { DepartmentsComponent } from "./dictionaries/departments/departments.component";
import { TaskTypesComponent } from './dictionaries/task-types/task-types.component';

@NgModule({
  declarations: [
    AdminComponent,
    UsersComponent,
    TableComponent,
    UserFormComponent,
    FormComponent,
    UserParamComponent,
    TableButtonComponent,
    UserGroupComponent,
    UserDepartmentComponent,
    DepartmentsComponent,
    TaskTypesComponent
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
    DynamicDialogModule
  ],
  entryComponents:[
    FormDictionaryValueDialogComponent
  ]
})
export class AdminModule { }
