import { Component, Input } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-table-button',
  templateUrl: './table-button.component.html',
  styleUrls: ['./table-button.component.css'],
  providers: [DialogService],
})
export class TableButtonComponent {
  private _buttonList: MenuItem[];
  public get buttonList(): MenuItem[] {
    return this._buttonList;
  }

  @Input()
  public set buttonList(v: MenuItem[]) {
    this._buttonList = v;
  }

  @Input()
  icon: string;

  @Input()
  gridId: number;

  // @Output()
  // selectedColumnList = new EventEmitter<void>();

  setting: MenuItem[];
  ref: DynamicDialogRef;

  constructor() {}
}
