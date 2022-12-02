import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UniversalComponentsModule } from '../universal-components/universal-components.module';
import { AdminRoutingModule } from './admin-routing.module';
import { UserFormComponent } from './pages/users/user-form/user-form.component';
import { UserParamComponent } from './pages/users/user-param/user-param.component';
import { UsersComponent } from './pages/users/users.component';

import { UserDepartmentComponent } from './pages/users/user-department/user-department.component';
import { UserGroupComponent } from './pages/users/user-group/user-group.component';

@NgModule({
  declarations: [
    UsersComponent,
    UserFormComponent,
    UserParamComponent,
    UserGroupComponent,
    UserDepartmentComponent,
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
    DynamicDialogModule,
    UniversalComponentsModule,
  ],
})
export class AdminModule {}
