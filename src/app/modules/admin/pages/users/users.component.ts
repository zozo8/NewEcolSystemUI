import { Component, OnInit} from "@angular/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, Observable,tap} from "rxjs";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TranslateService } from "@ngx-translate/core";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { BaseService } from "src/app/services/base.service";
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { PathService } from "src/app/services/path.service";
import { GridEnum } from "src/app/utils/gridEnum";
import { IMasterPage } from "src/app/Interfaces/IMasterPage";
import { TableService } from "src/app/modules/universal-components/components/table/table.service";
import { TableButtonService } from "src/app/modules/universal-components/components/table-button/table-button.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})


export class UsersComponent implements OnInit, ITableComponent, ITableButtonsComponent, IMasterPage {
  obj:TableMenuStructure;
  lazyLoadObj:LazyLoadEvent;
  responseObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});
  selectedId: number;
  postPath: string;
  putPath: string;
  gridId:number = GridEnum.Users;

  model= "User";
  buttons:MenuItem[];


  constructor(
   private tableService:TableService,
   private translateService:TranslateService,
   private tableButtonService:TableButtonService,
   private baseService:BaseService,
   private pathService:PathService,
  ) {
    this.postPath = pathService.post(this.model);
    this.obj = new TableMenuStructure();
  }

  ngOnInit(): void {
    this.getColumns();
    this.getButtons();

    // ustawiam nasłuchiwanie aby przy zmianie BS odpalił getResponseObj i zasilił tabele z danymi
    this.reqObjBS.subscribe(request=> {
      if(request?.pageNumber !== 10000) {
        this.responseObj = this.baseService.getResponseObj(this.pathService.getList(this.model),request);
      }
    });
  }

  getColumns():void {
     this.baseService.getColumns(this.pathService.columnList(this.gridId)).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.tableService.GetColumnsOutput(res.value);
      }, complete:()=> {
        this.prepareRequest();
      }
  });
  }

  prepareRequest(ev?:LazyLoadEvent):void {
    let requestObj = this.baseService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
  }

// emmiter from table components
  getLazyLoadEvent(ev:LazyLoadEvent):void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }

  getSelected(ev:any):void {
      var path = this.pathService.get(this.model,ev.id);
      this.selectedId = ev.id;

      this.tableService.getObjDto(path,this.obj);
  }

  getSelectedColumns():void{
    console.log("----- pobranie swiezego ustawienia kolumn! -----");
    this.getColumns();
   // this.prepareRequest(this.lazyLoadObj);
  }

  //emmiter from detail component
  refreshTable():void {
    this.prepareRequest(this.lazyLoadObj);
    this.obj.editState = false;
  }


  getButtons():void {
    this.buttons =  [
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
        command:()=>this.refreshTable()
      }
    ];
  }


  post(): void {
    this.tableButtonService.post(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  put(): void {
    this.tableButtonService.put(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  delete(): void {
      this.tableButtonService.delete(this.pathService.delete(this.model, this.obj.objectDto.id)).subscribe({
        next:(res:boolean)=> {
          if(res) { this.refreshTable(); }
        }
      });
  }
}


