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

import { DictionariesRoutingModule } from "./dictionaries-routing.module";
import { DictionariesComponent } from "./dictionaries.component";
import { ProductTradeNameComponent } from "./pages/product-trade-name/product-trade-name.component";
import { UniversalComponentsModule } from "../universal-components/universal-components.module";
import { ProductTradeNameFormComponent } from "./pages/product-trade-name/product-trade-name-form/product-trade-name-form.component";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { DropdownModule } from "primeng/dropdown";


@NgModule({
  declarations: [
    DictionariesComponent,
    ProductTradeNameComponent,
    ProductTradeNameFormComponent
  ],
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
    DropdownModule
  ]
})
export class DictionariesModule { }
