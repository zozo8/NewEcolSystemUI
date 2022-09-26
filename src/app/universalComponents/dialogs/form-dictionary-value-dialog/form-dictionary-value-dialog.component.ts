import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem } from "primeng/api";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { Filter } from "src/app/models/requests/filter.model";
import { BaseService } from "src/app/services/base.service";
import { TableButtonService } from "../../table-button/table-button.service";


@Component({
  selector: "app-form-dictionary-value-dialog",
  templateUrl: "./form-dictionary-value-dialog.component.html",
  styleUrls: ["./form-dictionary-value-dialog.component.css"]
})
export class FormDictionaryValueDialogComponent<T> implements OnInit {

  options:MenuItem[];
  // [dictionary[dictPath,dictColumnPath,prop id, prop label],path,object,[prop name = id, value],filter for query]
  data:[[string,string,string,string],string,T,[string,string],Filter[]];
  value:string;
  selectedOption:MenuItem = {};

  constructor(
    public ref:DynamicDialogRef,
    public config:DynamicDialogConfig,
    private translateService:TranslateService,
    private tableButtonService:TableButtonService,
    private baseService:BaseService
  ) { }

  ngOnInit(): void {
    this.config.closeOnEscape = true;
    if(this.config.data[0]) {
      let dictionary = this.baseService.getMenuItemList(
                            this.config.data[0][0],
                            this.config.data[0][1],
                            this.config.data[0][2],
                            this.config.data[0][3],
                            this.config.data[4]);
      dictionary.subscribe({
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
      next:(res:boolean)=> {
        if(res) {
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
