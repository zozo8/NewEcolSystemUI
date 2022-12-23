import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ColumnSetting } from 'src/app/models/requests/columnSetting.model';
import { ResponseGridDataColumnValue } from 'src/app/models/responses/responseGridDataColumnValue.model';
import { getUserId } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { putModelPath } from 'src/app/services/path';

@Injectable({
  providedIn: 'root',
})
export class FormTableSetColumnService implements OnDestroy {
  subs: Subscription = new Subscription();

  constructor(
    private http: HttpClient,
    private store: Store<LoginState>,
    private commonService: CommonService,
    private apiService: ApiService
  ) {}

  setColumnByUserIdGridId(
    gridId: number,
    columns: ResponseGridDataColumnValue[]
  ): Observable<boolean> {
    const bs = new BehaviorSubject<boolean>(false);

    const userId = this.commonService.getValueFromObservable(
      this.store.select(getUserId)
    );
    // jako drugi parametr przekazac id pobranych wczesniej ustawien
    var requestPath = putModelPath('ColumnSetting', userId);
    if (userId > 0 && gridId) {
      columns.forEach((el, i) => {
        var columnObj = this.getColumnObj(gridId, el, userId, i);
        this.subs.add(
          this.apiService.getResponseByPut(requestPath, columnObj).subscribe()
        );
      });
      bs.next(true);
    } else {
      bs.next(false);
    }

    return bs;
  }

  private getColumnObj(
    gridId: number,
    el: ResponseGridDataColumnValue,
    userId: number,
    index: number
  ): ColumnSetting {
    let obj: ColumnSetting = {
      id: 0, //tu bedzie konkretny id jak kolumny beda wczytywane juz z zapisanego filtra
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
      tagOrder: index,
      enableSum: false,
      enableAvg: false,
      enableMax: false,
      enableMin: false,
    };

    return obj;
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
