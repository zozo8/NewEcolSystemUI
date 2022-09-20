import { Component, Input} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem, LazyLoadEvent } from "primeng/api";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { Observable } from "rxjs";
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { ParamDict } from "src/app/models/dto/modules/admin/dictionary/paramDict";
import { User } from "src/app/models/dto/modules/admin/user";
import { UserParam } from "src/app/models/dto/modules/admin/userParam";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { BaseService } from "src/app/services/base.service";
import { FormDialogComponent } from "src/app/universalComponents/form-dialog/form-dialog.component";
import { TableButtonService } from "src/app/universalComponents/table-button/table-button.service";

@Component({
  selector: "app-user-param",
  templateUrl: "./user-param.component.html",
  styleUrls: ["./user-param.component.css"],
  providers:[DialogService]
})
export class UserParamComponent implements ITableButtonsComponent {

  @Input()
  masterId?:number

  buttons: MenuItem[];
  obj: TableMenuStructure;
  deletePath: string = "/api/UserParams/DeleteUserParam/Delete";
  postPath: string;
  putPath: string;

  ref:DynamicDialogRef;
  dictionaryPath = "/api/ParamDicts/GetParamDicts/Get";
  columnPath = "/api/ParamDicts/GetParamDictGridData/Get";

  constructor(
    private tableButtonService:TableButtonService,
    private translateService:TranslateService,
    public dialogService:DialogService,
    private baseService:BaseService<ParamDict>
  ) {

  }

  getButtons(): MenuItem[] {
    return [
      {
        label:this.translateService.instant("btn.add"),
        icon:"pi pi-fw pi-plus",
        disabled:false,
        command:()=>this.post()
      },
      {
        label:this.translateService.instant("btn.remove"),
        icon:"pi pi-fw pi-minus",
        disabled:false,
        command:()=>this.delete()
      },
      {
        label:this.translateService.instant("btn.refresh"),
        icon:"pi pi-fw pi-refresh",
        disabled:false,
        command:()=>this.refresh()
      }
    ];
  }

  post(): void {
    var data:MenuItem[]=[{
      id:"2",
      label:"test1"
    },{
      id:"3",
      label:"test2"
    }
  ]
    //var test = this.baseService.getList(this.dictionaryPath,this.columnPath);
    //console.log("tesssssss",test);

        this.ref = this.dialogService.open(FormDialogComponent, {
          data:data,
          header:"Wybierz parametr"
        });

        this.ref.onClose.subscribe((obj:any)=>{
          console.log("Wybrany obiekt",obj);
        })



  }
  delete(): void {
    throw new Error("Method not implemented.");
  }
  put(): void {
    throw new Error("Method not implemented.");
  }
  refresh(): void {
    throw new Error("Method not implemented.");
  }



}
