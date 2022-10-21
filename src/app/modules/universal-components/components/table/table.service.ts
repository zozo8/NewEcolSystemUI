import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyById } from "src/app/models/responses/responseBodyById.model";
import { TableMenuStructure } from "src/app/models/tableMenuStructure";
import { BaseService } from "src/app/services/base.service";

@Injectable({
  providedIn: "root"
})
export class TableService {

  ret:RequestGridDataColumnValue[];
  constructor(
    private http:HttpClient,
    private baseService:BaseService
    ) {
    }

  // set specyfic fdormat columns, require to create data, filters etc in table components
  GetColumnsOutput(columns: RequestGridDataColumnValue[]): RequestGridDataColumnValue[] {
    let columnsOutput:RequestGridDataColumnValue[] = [];
    columns.forEach((res)=> {
      columnsOutput.push({
        columnName : res.columnName,
        dataType :this.baseService.getSepcificDataType4PrimeNg(res.dataType),
        displayName : res.displayName,
        filters : res.filters,
        isVisible : res.isVisible
      });
    }
    );

    return columnsOutput;
  }

  getObjDto(path:string, obj:TableMenuStructure):Observable<TableMenuStructure> {
    var retObj = new BehaviorSubject<TableMenuStructure>(obj);
    this.baseService.getObjById(path).subscribe({
      next:(res:ResponseBodyById)=>{
        obj.objectDto = res.value;
        obj.objectEditDto = {...res.value}; // copy without reference
        retObj.next(obj);
      }
    });

    return retObj;
  }
}
