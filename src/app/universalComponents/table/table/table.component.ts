import { Component, Input, OnChanges, OnInit, SimpleChanges } from "@angular/core";
import { MessageService } from "primeng/api";
import { Toast } from "primeng/toast";
import { Observable } from "rxjs";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { tableColsStructure } from "src/app/models/tableColsStructure.model";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
  providers:[MessageService]
})
export class TableComponent {
  dataLoading: boolean;
  // dataSource: any;
  //colsTmp: any[];
  cols:tableColsStructure[];
  dataSource:ResponseBodyGetList;


private _dataTable : Observable<ResponseBodyGetList>;
get dataTable(): Observable<ResponseBodyGetList> {
  return this._dataTable;
}

@Input()
set dataTable(v : Observable<ResponseBodyGetList>) {
  this._dataTable = v;

  this.dataLoading = true;
  v.subscribe({
    next:(res:ResponseBodyGetList)=>{
      // this.dataSource = res.value.data;
      //this.colsTmp = res.value.data[0];
      this.dataSource = res;
    },
    complete:()=>{
      this.cols = this.getColsArray(this.dataSource.value.data[0]);
      this.dataLoading = false;
    },
    error:(err:Error)=>{
      this.dataLoading = false;
      console.error(err);
    }
  });

}

  constructor() { }

private getColsArray(cols:any):tableColsStructure[]  {
  var res:tableColsStructure[] = [];

  Object.keys(cols).forEach((el: string) => {
    let obj:tableColsStructure = {
      key:el,
      name: this.getTextWithSpaces(el),
      description: el,
      dataType:"string",
      filter:true,
      sortable:true,
      visible:true
    };
    res.push(obj);
  });
  return res;
}

getTextWithSpaces(el: string): string {
  let result:string = el.replace(/([A-Z])/g, " $1");
  let finalResult:string = result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
  return finalResult;
}


}


