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

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { DropdownModule } from 'primeng/dropdown';
import { UniversalComponentsModule } from '../universal-components/universal-components.module';
import { DictionariesRoutingModule } from './dictionaries-routing.module';
import { ProductTradeNameFormComponent } from './pages/product-trade-name/product-trade-name-form/product-trade-name-form.component';
import { ProductTradeNameComponent } from './pages/product-trade-name/product-trade-name.component';
import { EstimateTypeComponent } from './pages/estimate-type/estimate-type.component';

@NgModule({
  declarations: [ProductTradeNameComponent, ProductTradeNameFormComponent, EstimateTypeComponent],
  imports: [
    CommonModule,
    DictionariesRoutingModule,
    ButtonModule,
    TableModule,
    ToastModule,
    ToolbarModule,
    SplitterModule,
    SplitButtonModule,
    InputTextModule,
    PanelModule,
    CheckboxModule,
    MenubarModule,
    ConfirmDialogModule,
    MessagesModule,
    TabViewModule,
    DynamicDialogModule,
    UniversalComponentsModule,
    TranslateModule,
    FormsModule,
    DropdownModule,
  ],
})
export class DictionariesModule {}
