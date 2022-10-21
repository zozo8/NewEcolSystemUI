import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MenubarModule } from "primeng/menubar";
import { SplitButtonModule } from "primeng/splitbutton";
import { PanelModule } from "primeng/panel";
import { MessagesModule } from "primeng/messages";
import { TableModule } from "primeng/table";
import { DndModule } from "ngx-drag-drop";
import { DropdownModule } from "primeng/dropdown";

import { UniversalComponentsRoutingModule } from "./universal-components-routing.module";
import { UniversalComponentsComponent } from "./universal-components.component";


import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";
import { TableComponent } from "./components/table/table.component";
import { TableButtonComponent } from "./components/table-button/table-button.component";
import { FormTableSetColumnComponent } from "./components/dialogs/form-table-set-column/form-table-set-column.component";
import { FormComponent } from "./components/form/form.component";
import { FormDictionaryValueDialogComponent } from "./components/dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component";
import { TableButtonService } from "./components/table-button/table-button.service";


@NgModule({
  declarations: [
    UniversalComponentsComponent,
    TableComponent,
    TableButtonComponent,
    FormTableSetColumnComponent,
    FormComponent,
    FormDictionaryValueDialogComponent
  ],
  imports: [
    CommonModule,
    UniversalComponentsRoutingModule,
    MenubarModule,
    SplitButtonModule,
    PanelModule,
    MessagesModule,
    TableModule,
    DndModule,
    DropdownModule,
    TranslateModule,
    FormsModule
  ],
  providers:[
    TableButtonService
  ],
  entryComponents:[
    FormDictionaryValueDialogComponent
  ],
  exports:[
    TableButtonComponent,
    TableComponent,
    FormComponent
  ]
})
export class UniversalComponentsModule { }
