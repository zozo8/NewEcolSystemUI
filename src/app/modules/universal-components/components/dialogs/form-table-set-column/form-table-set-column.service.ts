import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { ColumnSetting } from 'src/app/models/requests/columnSetting.model';
import { RequestGridDataColumnValue } from 'src/app/modules/universal-components/models/requestGridDataColumnValue.model';
import { ResponseBodyById } from 'src/app/models/responses/responseBodyById.model';
import { getUserId } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState.model';
import { CommonService } from 'src/app/services/common.service';
import { postModelPath } from 'src/app/services/path';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FormTableSetColumnService {
  constructor(
    private http: HttpClient,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  setColumnByUserIdGridId(
    gridId: number,
    columns: RequestGridDataColumnValue[]
  ): Observable<boolean> {
    const bs = new Subject<boolean>();
    // var userId = Number.parseInt(localStorage.getItem("userId")??"");
    const userId = this.commonService.getValueFromObservable(
      this.store.select(getUserId)
    );
    var requestPath = postModelPath('ColumnSetting');
    if (userId > 0 && gridId) {
      columns.forEach((el) => {
        var columnObj = this.getColumnObj(gridId, el, userId);
        this.http
          .post<ResponseBodyById>(
            environment.endpointApiPath + requestPath,
            columnObj
          )
          .subscribe();
      });
      bs.next(true);
    } else {
      bs.next(false);
    }

    return bs.asObservable();
  }

  private getColumnObj(
    gridId: number,
    el: RequestGridDataColumnValue,
    userId: number
  ): ColumnSetting {
    let obj: ColumnSetting = {
      id: 0, //tu wjedzie konkretny id jak kolumny beda wczytywane juz z zapisanego filtra
      gridId: gridId,
      userId: userId,
      columnName: el.columnName,
      columnType: el.dataType,
      displayName: el.displayName,
      format: '',
      roundPlace: 0,
      isVisible: el.isVisible,
      isDefaultSetting: false,
      customWidth: 0,
      tagOrder: 1, //do zmiany
      enableSum: false,
      enableAvg: false,
      enableMax: false,
      enableMin: false,
    };

    return obj;
  }
}
