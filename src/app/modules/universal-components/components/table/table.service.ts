import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResponseBodyById } from 'src/app/models/responses/responseBodyById.model';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { TableMenuStructure } from 'src/app/modules/universal-components/models/tableMenuStructure.model';
import { ApiService } from 'src/app/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class TableService {
  ret: RequestGridDataColumnValue[];
  constructor(private apiService: ApiService) {}

  // set specyfic format columns, require to create data, filters etc in table components
  GetColumnsOutput(
    columns: RequestGridDataColumnValue[]
  ): RequestGridDataColumnValue[] {
    let columnsOutput: RequestGridDataColumnValue[] = [];
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
      case 'Int32':
        return 'numeric';
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
    this.apiService.getObjById(path).subscribe({
      next: (res: ResponseBodyById) => {
        obj.objectDto = res.value;
        obj.objectEditDto = { ...res.value };
        retObj.next(obj);
      },
    });

    return retObj;
  }
}
