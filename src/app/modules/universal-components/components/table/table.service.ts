import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  ret: ResponseGridDataColumnValue[];
  constructor(private apiService: ApiService) {}

  // set specyfic format columns, require to create data, filters etc in table components
  GetColumnsOutput(
    columns: ResponseGridDataColumnValue[]
  ): ResponseGridDataColumnValue[] {
    let columnsOutput: ResponseGridDataColumnValue[] = [];
    columns.forEach((res) => {
      columnsOutput.push({
        columnName: res.columnName,
        dataType: this.getSepcificDataType4PrimeNg(res.dataType),
        displayName: res.displayName,
        filters: res.filters,
        isVisible: res.isVisible,
      });
    });

    return columnsOutput;
  }

  private getSepcificDataType4PrimeNg(val: string): string {
    switch (val) {
      case 'Boolean':
        return 'boolean';
      case 'Int32':
        return 'numeric';
      case 'Single':
        return 'float';
      case 'String':
        return 'text';
      case 'DateTime':
        return 'date';
      default:
        return val;
    }
  }

  getObjDto(
    path: string,
    obj: TableMenuStructure
  ): Observable<TableMenuStructure> {
    var retObj = new BehaviorSubject<TableMenuStructure>(obj);
    this.apiService.getResponseByGet(path).subscribe({
      next: (res: any) => {
        obj.objectDto = res.value;
        obj.objectEditDto = { ...res.value };
        retObj.next(obj);
      },
    });

    return retObj;
  }
}
