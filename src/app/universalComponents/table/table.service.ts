import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FilterMetadata, LazyLoadEvent } from "primeng/api";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { RequestBodyGetList } from "../../models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "../../models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "../../models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "../../models/responses/responseBodyGetList.model";

@Injectable({
  providedIn: "root"
})
export class TableService {

  ret:RequestGridDataColumnValue[];
  constructor(
    private http:HttpClient
    ) {
    }

  // get response for table from api
  getResponseObj(requestPath:string, requestObj:RequestBodyGetList):Observable<ResponseBodyGetList> {
    return this.http.post<ResponseBodyGetList>(environment.endpointApiPath+requestPath,requestObj);
   }

   // get request from api for default params or dynamic params from universal table component (ev)
  getRequestObj(columns:RequestGridDataColumnValue[], ev?:LazyLoadEvent):RequestBodyGetList {
    console.log("start ev",ev, columns);
    if(ev === undefined) {
      return this.getStartFilterObj(columns);
    } else {
      let obj:RequestBodyGetList = {
        pageNumber:(ev.first??0)/10+1,
        pageSize:ev?.rows,
        order:{
          columnName:ev?.sortField ?? "id",
          isAscending:(ev?.sortOrder === 1)?false:true
        },
        filter:{
          filters:this.getFilters(ev,columns)
        }
      };

      console.log("end ev",obj);
      return obj;
    }

   }


  getFilters(ev:LazyLoadEvent,columns:RequestGridDataColumnValue[] ): RequestGridDataColumnValue[] {
    var res:RequestGridDataColumnValue[];
    // columns.forEach(val=>{
    //    console.log("filters:",ev.filters![val.columnName]); // dokonczyc, trzeba jakos dobrac sie do filtrów i je przeslac dalej
    // });
    return columns;
  }



   // get column list for grid
   getColumns(path:string):Observable<RequestGridDataColumn> {
    return this.http.get<RequestGridDataColumn>(environment.endpointApiPath+path);
   }

   // set specyfic fdormat columns, require to create data, filters etc in table components
   GetColumnsOutput(columns: RequestGridDataColumnValue[]): RequestGridDataColumnValue[] {
    let columnsOutput:RequestGridDataColumnValue[] = [];
    columns.forEach((res)=> {
      columnsOutput.push({
        columnName : res.columnName,
        dataType :this.getSepcificDataType(res.dataType),
        displayName : res.displayName,
        filters : res.filters,
        isVisible : res.isVisible
      });
    }
    );

    return columnsOutput;
  }

  private getSepcificDataType(val:string):string {
    switch (val) {
      case "Boolean":
        return "boolean";
      case "Int32":
        return "numeric";
      case "String":
        return "text";
      case "DateTime":
        return "date";
      default:
        return "text";
    }
  }

  private getStartFilterObj(columns:RequestGridDataColumnValue[]): RequestBodyGetList {
    let obj:RequestBodyGetList = {
      pageNumber:1,
      pageSize:10,
      order:{
        columnName:"id",
        isAscending:true
      },
      filter:{
        filters:columns
      }
    };
    return obj;
  }



}
