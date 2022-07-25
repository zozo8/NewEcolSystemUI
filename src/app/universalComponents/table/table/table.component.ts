import { Component, EventEmitter, Input, Output} from "@angular/core";
import { LazyLoadEvent, MessageService } from "primeng/api";
import { Observable } from "rxjs";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
  providers:[MessageService]
})
export class TableComponent {
  dataLoading: boolean;
  cols:RequestGridDataColumnValue[] =[];
  dataSource:ResponseBodyGetList;
  columnFilter:string[];

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
  console.log("column filters", this.columnFilter);
}

@Input()
height:number;

@Output()
newRequestParam = new EventEmitter<LazyLoadEvent>();

  constructor(
  ) { }

  loadData(event:LazyLoadEvent):void {
    this.newRequestParam.emit(event);
  }

}


