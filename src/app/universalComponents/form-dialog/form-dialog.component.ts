import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {

  options:MenuItem[];
  value:string;
  selectedOption:MenuItem;

  constructor(
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.config.closeOnEscape = true;
    this.config.contentStyle={"max-height":"500px", "overflow":"auto"};
    this.options = this.config.data;
  }

}
