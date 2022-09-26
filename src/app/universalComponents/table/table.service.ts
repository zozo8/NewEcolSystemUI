import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RequestGridDataColumnValue } from "../../models/requests/requestGridDataColumnValue.model";

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
        dataType :this.getSepcificDataType4PrimeNg(res.dataType),
        displayName : res.displayName,
        filters : res.filters,
        isVisible : res.isVisible
      });
    }
    );

    return columnsOutput;
  }

  getSepcificDataType4PrimeNg(val:string):string {
    switch (val) {
      case "Boolean":
        return "boolean";
      case "Int":
        return "numeric";
      case "String":
        return "text";
      case "DateTime":
        return "date";
      default:
        return val;
    }
  }

    getSepcificDataType4Api(val:string):string {
      switch (val) {
        case "boolean":
          return "boolean";
        case "numeric":
          return "Int32";
        case "text":
          return "string";
        case "date":
          return "datetime";
        default:
          return val;
      }
    }
}
