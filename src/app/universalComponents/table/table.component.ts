import { Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { Observable } from "rxjs";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"]
})
export class TableComponent implements OnInit {
  dataLoading: boolean;
  cols:RequestGridDataColumnValue[] =[];
  dataSource:ResponseBodyGetList;
  columnFilter:string[];
  tableSettingItems:MenuItem[];

  dataValues:any[];
  totalPages:number;
  pageSize:number = 0;
  totalRecords:number = 0;
  ev:LazyLoadEvent;

@Input()
set dataTable(v : Observable<ResponseBodyGetList>) {
if(v!== undefined) {
  this.dataLoading = true;

  v.subscribe({
    next:(res:ResponseBodyGetList)=> {
      this.dataSource = res;
    },
    complete:()=> {
      this.dataValues = this.dataSource.value.data;
      this.totalRecords = this.dataSource.value.totalItems??0;
      this.totalPages = this.dataSource.value.totalPages;
      this.pageSize = this.dataSource.value.pageSize;
      this.dataLoading = false;
    },
    error:(err:Error)=> {
      this.dataLoading = false;
      console.error("Błąd:",err);
    }
  });
}

}

private _columns : RequestGridDataColumnValue[];
public get columns(): RequestGridDataColumnValue[] {
  return this._columns;
}

@Input()
public set columns(v : RequestGridDataColumnValue[]) {
  this._columns = v;
  if( this._columns !== undefined) {
    this.columnFilter = this.cols.map(el=>el.columnName);
  }
}

@Input()
height:number;

@Input()
tableDisabled:boolean;

@Output()
newRequestParam = new EventEmitter<LazyLoadEvent>();

@Output()
selectedObj = new EventEmitter<any>();

  constructor(
  ) { }

  ngOnInit(): void {

  }

  loadData(event:LazyLoadEvent):void {

    if(event.first !== 0 || event.rows !== 0) {
      if(event.sortField === undefined){
        event.sortField = "id";
        event.sortOrder = -1;
      }

      this.newRequestParam.emit(event);
    }
  }

  selectObj(obj:any):void {
     this.selectedObj.emit(obj);
  }

}


