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
}
