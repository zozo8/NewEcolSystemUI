import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { GridEnum } from 'src/app/models/gridEnum';
import { RequestGridDataColumn } from 'src/app/models/requests/requestGridDataColumn.model';
import { ResponseBodyGetList } from 'src/app/models/responses/responseBodyGetList.model';
import { setDepartments } from 'src/app/modules/login/state/login.actions';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { columnListPath, getModelListPath } from 'src/app/services/path';

export interface ISelectDepartemnt {
  id: number;
  group: string;
  items?: ISelectDepartemntValue[];
}

export interface ISelectDepartemntValue {
  label: string;
  value: number;
}

@Component({
  selector: 'app-select-department',
  templateUrl: './select-department.component.html',
  styleUrls: ['./select-department.component.scss'],
})
export class SelectDepartmentComponent implements OnInit, OnDestroy {
  departments: ISelectDepartemnt[] = [];
  selectedDepartments: number[] = [];
  compsiteSubs = new Subscription();
  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private translateService: TranslateService,
    private apiService: ApiService,
    private commonService: CommonService,
    private store: Store<LoginState>
  ) {}

  ngOnInit(): void {
    this.getDepartments();
    this.selectedDepartments = this.commonService.getValueFromObservable(
      this.store.select(getDepartments)
    );
    this.config.closeOnEscape = true;
  }

  getDepartments() {
    this.compsiteSubs.add(
      this.apiService
        .getColumns(columnListPath(GridEnum.Departments))
        .subscribe({
          next: (res: RequestGridDataColumn) => {
            const reqObj = this.commonService.getRequestObj(res.value, {
              first: 1,
              rows: 100,
              sortField: 'clientId',
              sortOrder: -1,
            });

            this.compsiteSubs.add(
              this.apiService
                .getResponseObj(getModelListPath('Department'), reqObj)
                .subscribe({
                  next: (res: ResponseBodyGetList) => {
                    res.value.data.forEach((element) => {
                      const group = this.departments.find(
                        (x) => x.id === element.clientId
                      );
                      if (group === undefined) {
                        const childs = res.value.data.filter(
                          (x) => x.clientId === element.clientId
                        );
                        const parent = res.value.data.find(
                          (x) => x.clientId === element.clientId
                        );
                        const obj: ISelectDepartemnt = {
                          id: parent.clientId,
                          group: parent.clientName,
                        };

                        obj.items = [];
                        childs.forEach((ch) => {
                          const chObj: ISelectDepartemntValue = {
                            label: ch.departmentName,
                            value: ch.id,
                          };

                          obj.items?.push(chObj);
                        });

                        this.departments.push(obj);
                      }
                    });
                  },
                })
            );
          },
        })
    );
  }

  close(): void {
    this.ref.close();
  }

  submit(): void {
    this.store.dispatch(setDepartments({ val: this.selectedDepartments }));
    this.ref.close(true);
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
