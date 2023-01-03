import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DndModule } from 'ngx-drag-drop';
import { DropdownModule } from 'primeng/dropdown';
import { MenubarModule } from 'primeng/menubar';
import { MessagesModule } from 'primeng/messages';
import { PanelModule } from 'primeng/panel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TableModule } from 'primeng/table';

import { UniversalComponentsRoutingModule } from './universal-components-routing.module';
import { UniversalComponentsComponent } from './universal-components.component';

import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ContextMenuModule } from 'primeng/contextmenu';
import { PickListModule } from 'primeng/picklist';
import { FormDictionaryValueDialogComponent } from './components/dialogs/form-dictionary-value-dialog/form-dictionary-value-dialog.component';
import { FormTableSetColumnComponent } from './components/dialogs/form-table-set-column/form-table-set-column.component';
import { FormComponent } from './components/form/form.component';
import { TableButtonComponent } from './components/table-button/table-button.component';
import { TableButtonService } from './components/table-button/table-button.service';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    UniversalComponentsComponent,
    TableComponent,
    TableButtonComponent,
    FormTableSetColumnComponent,
    FormComponent,
    FormDictionaryValueDialogComponent,
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
    FormsModule,
    ContextMenuModule,
    PickListModule,
  ],
  providers: [TableButtonService],
  entryComponents: [FormDictionaryValueDialogComponent],
  exports: [TableButtonComponent, TableComponent, FormComponent],
})
export class UniversalComponentsModule {}
