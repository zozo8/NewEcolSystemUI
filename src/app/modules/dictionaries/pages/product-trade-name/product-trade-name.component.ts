import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, Observable } from "rxjs";
import { IMasterPage } from "src/app/Interfaces/IMasterPage";
import { ITableButtonsComponent } from "src/app/Interfaces/table/ITableButtonsComponent";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { TableButtonService } from "src/app/modules/universal-components/components/table-button/table-button.service";
import { TableService } from "src/app/modules/universal-components/components/table/table.service";
import { BaseService } from "src/app/services/base.service";
import { PathService } from "src/app/services/path.service";
import { GridEnum } from "src/app/utils/gridEnum";

@Component({
  selector: "app-product-trade-name",
  templateUrl: "./product-trade-name.component.html",
  styleUrls: ["./product-trade-name.component.css"]
})


export class ProductTradeNameComponent implements OnInit, ITableComponent, ITableButtonsComponent, IMasterPage {

  buttons: MenuItem[];
  obj: TableMenuStructure;
  model = "ProductTradeName";

  columns: RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});
  responseObj: Observable<ResponseBodyGetList>;
  lazyLoadObj: LazyLoadEvent;
  selectedId: number;
  gridId = GridEnum.ProductTradeName;
  postPath: string;
  putPath: string;

  constructor(
    private baseService:BaseService,
    private pathService:PathService,
    private tableService:TableService,
    private translateService:TranslateService,
    private tableButtonService:TableButtonService
  ) {
    this.postPath = pathService.post(this.model);
    this.obj = new TableMenuStructure();
  }

  ngOnInit(): void {
    this.getColumns();
     this.getButtons();

    this.reqObjBS.subscribe(request=> {
      if(request?.pageNumber !== 10000) {
        console.log("request", request);
        this.responseObj = this.baseService.getResponseObj(this.pathService.getList(this.model),request);
        console.log("responseiobj", this.responseObj);
      }
    });
  }

  getColumns(): void {
    this.baseService.getColumns(this.pathService.columnList(this.gridId)).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.tableService.GetColumnsOutput(res.value);
         console.log("columns", this.columns);
      }, complete:()=> {
        this.prepareRequest();
      }
  });
  }
  prepareRequest(ev?: LazyLoadEvent | undefined): void {
    let requestObj = this.baseService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
  }
  getLazyLoadEvent(ev: LazyLoadEvent): void {
    this.lazyLoadObj = ev;
    this.prepareRequest(this.lazyLoadObj);
  }
  getSelected(ev: any): void {
    var path = this.pathService.get(this.model,ev.id);
    this.selectedId = ev.id;
    this.tableService.getObjDto(path,this.obj);
  }

  getButtons(): void {
    this.buttons =[
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
        label:this.translateService.instant("btn.edit"),
        icon:"pi pi-fw pi-pencil",
        disabled:false,
        command:()=>this.put()
      },
      {
        label:this.translateService.instant("btn.refresh"),
        icon:"pi pi-fw pi-refresh",
        disabled:false,
        command:()=>this.refreshTable()
      },
      {
        label:"Odśwież z podsumowaniem",
        icon:"pi pi-fw pi-refresh",
        disabled:true
      },
      {
        label:"Korekta grupowa",
        icon:"pi pi-fw pi-pencil",
        disabled:true
      }
    ];
  }

  post(): void {
    this.tableButtonService.post(this.obj).subscribe({
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

  put(): void {
    this.tableButtonService.put(this.obj).subscribe({
      next:(res:TableMenuStructure)=>this.obj = res
    });
  }

  refreshTable(): void {
    this.prepareRequest(this.lazyLoadObj);
    this.obj.editState = false;
  }

}
