import { Component, ComponentFactoryResolver, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Observable } from "rxjs";
import { TableButtonService } from "../table-button/table-button.service";

@Component({
  selector: "app-form-dialog",
  templateUrl: "./form-dialog.component.html",
  styleUrls: ["./form-dialog.component.css"]
})
export class FormDialogComponent<T> implements OnInit {

  options:MenuItem[];
  // [dictionary,path,object,[properies name = id, value]]
  data:[Observable<MenuItem[]>,string,T,[string,string]];
  value:string;
  selectedOption:MenuItem = {};

  constructor(
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private translateService:TranslateService,
    private tableButtonService:TableButtonService
  ) { }

  ngOnInit(): void {
    this.config.closeOnEscape = true;
    if(this.config.data[0]) {
      this.config.data[0].subscribe({
        next:(res:MenuItem[])=>this.options = res
      });
    }
  }

  cancel():void {
    this.ref.close();
  }

  submit():void {
    let obj = this.prepareObj(this.selectedOption,this.config.data[2]);
    this.tableButtonService.save(this.config.data[2],obj.id,this.config.data[1]).subscribe({
      next:(res:boolean)=>{
        if(res){
          this.ref.close(res);
        }
      }
    });
  }

  private prepareObj(opt:MenuItem, obj:any):any {
    let id:string = this.config.data[3][0];
    let label:string = this.config.data[3][1];
    obj[id] = opt.id;
    obj[label] = opt.label;
    return obj;
  }
}
