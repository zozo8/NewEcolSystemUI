import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ResponseBodyById } from 'src/app/models/responses/responseBodyById.model';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';

interface IDataset {
  title: string;
  subtitle: string;
  value: number;
}

@Component({
  selector: 'app-diagram-percentage',
  templateUrl: './diagram-percentage.component.html',
  styleUrls: ['./diagram-percentage.component.scss'],
})
export class DiagramPercentageComponent implements OnInit {
  list: IDataset[] = [];

  constructor(
    private translate: TranslateService,
    private store: Store<LoginState>,
    private apiService: ApiService,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const depts: number[] = this.commonService.getValueFromObservable(
      this.store.select(getDepartments)
    );

    this.apiService
      .getResponseByPost('/api/MainPageDiagramPercentages', depts)
      .subscribe({
        next: (res: ResponseBodyById) => {
          res.value.forEach((el: any) => {
            this.list.push({
              title: el.label,
              subtitle: el.label2,
              value: el.percentage * 100,
            });
          });
        },
      });
  }
}
