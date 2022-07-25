import { Component, OnInit} from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { BehaviorSubject, Observable} from "rxjs";
import { IComponentResponse } from "src/app/Interfaces/IComponentResponse";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableResponseService } from "src/app/services/table-response.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})

export class UsersComponent implements OnInit, IComponentResponse {

  dataObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  columnsOutput:RequestGridDataColumnValue[];
  filterColumnPath = "/api/Users/GetUserGridData/Get";
  requestPath = "/api/Users/GetUsers/Get";
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:1});

  constructor(
   private service:TableResponseService
  ) { }

  ngOnInit(): void {
   this.getResponse(null);
  }

  onNewRequestParam(ev:LazyLoadEvent):void {
    this.getResponse(ev);
  }

  getResponse(ev:LazyLoadEvent | null):void {

   this.prepareRequest(ev);
   this.reqObjBS.subscribe(x=> {
      this.dataObj = this.service.getResponseObj(this.requestPath,x);
   });
  }

  prepareRequest(ev:LazyLoadEvent | null):void {
    this.service.getFilterColumnName(this.filterColumnPath).subscribe({
      next:(res:RequestGridDataColumn)=> {
        this.columns = res.value;
      },
      complete:()=> {
       this.columnsOutput = this.service.GetColumnsOutput(this.columns);
        let res = this.service.getRequestObj(this.columns, ev);
        this.reqObjBS.next(res);
      }
    });

  }

}
