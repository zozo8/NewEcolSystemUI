import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ColumnSetting } from 'src/app/models/requests/columnSetting.model';
import { ResponseColumnSettingValueData } from 'src/app/models/responses/columns/responseColumnSettingValueData';
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
    columns: ResponseColumnSettingValueData[]
  ): Observable<boolean> {
    const bs = new BehaviorSubject<boolean>(false);

    const userId = this.commonService.getValueFromObservable(
      this.store.select(getUserId)
    );

    if (userId > 0 && gridId) {
      columns.forEach((el, i) => {
        const requestPath = putModelPath('ColumnSetting', el.id);
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
    el: ResponseColumnSettingValueData,
    userId: number,
    index: number
  ): ColumnSetting {
    let obj: ColumnSetting = {
      id: el.id,
      gridId: gridId,
      userId: userId,
      columnName: el.columnName,
      columnType: el.columnType,
      displayName: el.displayName,
      format: el.format,
      roundPlace: el.roundPlace,
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
