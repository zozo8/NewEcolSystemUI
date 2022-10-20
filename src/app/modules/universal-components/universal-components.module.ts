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

import { FormDictionaryValueDialogComponent } from "src/app/universalComponents/dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component";
import { TableComponent } from "src/app/universalComponents/table/table.component";
import { FormTableSetColumnComponent } from "src/app/universalComponents/dialogs/form-table-set-column/form-table-set-column.component";
import { TableButtonComponent } from "src/app/universalComponents/table-button/table-button.component";
import { FormComponent } from "src/app/universalComponents/form/form.component";
import { TableButtonService} from "src/app/universalComponents/table-button/table-button.service";
import { TranslateModule } from "@ngx-translate/core";
import { FormsModule } from "@angular/forms";


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
