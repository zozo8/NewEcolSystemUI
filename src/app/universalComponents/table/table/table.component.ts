import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { LazyLoadEvent, MenuItem, MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
  providers:[MessageService]
})
export class TableComponent implements OnInit {
  dataLoading: boolean;
  cols:RequestGridDataColumnValue[] =[];
  dataSource:ResponseBodyGetList;
  columnFilter:string[];
  tableSettingItems:MenuItem[];


private _dataTable : Observable<ResponseBodyGetList>;
get dataTable(): Observable<ResponseBodyGetList> {
  return this._dataTable;
}

@Input()
set dataTable(v : Observable<ResponseBodyGetList>) {
  this._dataTable = v;

  this.dataLoading = true;
  v.subscribe({
    next:(res:ResponseBodyGetList)=> {
      this.dataSource = res;
    },
    complete:()=>{
      this.dataLoading = false;
      console.log("datasource:",this.dataSource);
    },
    error:(err:Error)=>{
      this.dataLoading = false;
      console.error(err);
    }
  });
}


private _columns : RequestGridDataColumnValue[];
public get columns() : RequestGridDataColumnValue[] {
  return this._columns;
}
@Input()
public set columns(v : RequestGridDataColumnValue[]) {
  this.cols = v;
  this.columnFilter = this.cols.map(el=>el.columnName);
}

@Input()
height:number;

@Input()
title:string;

@Output()
newRequestParam = new EventEmitter<LazyLoadEvent>();

  constructor(
  ) { }


  ngOnInit(): void {
    this.tableSettingItems = [
      {
        label:"Wybierz siatkę",
        icon:"pi pi-align-justify",
        items:[
          {
            label:"Siatka 1"
          },
          {
            label:"Siatka 2"
          }
        ]
      },
      {
        label:"Dostosuj kolumny",
        icon:"pi pi-pause"
      },
      {
        label:"Utwórz siatkę",
        icon:"pi pi-plus-circle",
      },
      {
        separator: true
      },
      {
        label:"Eksport danych",
        icon:"pi pi-download",
        items:[
          {
            label:"Do pliku PDF",
            icon:"pi pi-file-pdf"
          },
          {
            label:"Do pliku Excel",
            icon:"pi pi-file-excel"
          },
          {
            label:"Do pliku Word",
            icon:"pi pi-desktop"
          }
        ]
      },

    ];
  }

  loadData(event:LazyLoadEvent):void {
    this.newRequestParam.emit(event);
    console.log(event);
  }

}


