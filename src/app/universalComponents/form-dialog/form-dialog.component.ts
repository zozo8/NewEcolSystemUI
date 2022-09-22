import { AfterViewInit, Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { SSL_OP_MICROSOFT_SESS_ID_BUG } from "constants";
import { MenuItem } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Observable } from "rxjs";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.css"]
})
export class FormDialogComponent implements OnInit {

  options:MenuItem[];
  data:Observable<MenuItem[]>;
  value:string;
  selectedOption:MenuItem = {};

  constructor(
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.config.closeOnEscape = true;
    if(this.config.data) {
      this.data = this.config.data;
      this.data.subscribe({
        next:(res:MenuItem[])=>this.options = res
      });
    }
  }

  cancel():void {
    this.ref.close();
  }

  submit():void {
    this.ref.close(this.selectedOption);
  }
}
