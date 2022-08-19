import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { Observable } from "rxjs/internal/Observable";
import { environment } from "src/environments/environment";
import { RequestBodyGetList } from "../models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "../models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "../models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "../models/responses/responseBodyGetList.model";
import { TextFormatService } from "./text-format.service";

@Injectable({
  providedIn: "root"
})
export class TableResponseService {
  constructor(
    private http:HttpClient,
    private textFormatService:TextFormatService
    ) { }

  // get response for table from api
  getResponseObj(requestPath:string, requestObj:RequestBodyGetList):Observable<ResponseBodyGetList> {
    return this.http.post<ResponseBodyGetList>(environment.endpointApiPath+requestPath,requestObj);
   }

   // get request from api for default params or dynamic params from universal table component (ev)
  getRequestObj(columns:RequestGridDataColumnValue[], ev:LazyLoadEvent | null):RequestBodyGetList {
   let pageNumber:number = (ev!=null)?((ev.first??0/10)+1):1;
   let pageSize:number = (ev?.rows !== 20)?ev?.rows??10:10;
   let sortField:string = (ev?.sortField !== undefined) ? ev.sortField : "Id";
   let isAscending:boolean = (ev?.sortOrder === 1)?true:false;


   let obj:RequestBodyGetList = {
     pageNumber:pageNumber,
     pageSize:pageSize,
     order:{
       columnName:sortField,
       isAscending:isAscending
     },
     filter:{
       filters:columns
     }
   };
   return obj;

   }

   // get column list for grid
   getFilterColumnName(path:string):Observable<RequestGridDataColumn> {
    return this.http.get<RequestGridDataColumn>(environment.endpointApiPath+path);
   }

   // set specyfic fdormat columns, require to create data, filters etc in table components
   GetColumnsOutput(columns: RequestGridDataColumnValue[]): RequestGridDataColumnValue[] {
    let columnsOutput:RequestGridDataColumnValue[] = [];
    columns.forEach((res)=>
    {
      columnsOutput.push({
        columnName : this.textFormatService.firstLetterToLowerCase(res.columnName),
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
}
