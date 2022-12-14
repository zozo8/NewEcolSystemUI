import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { ApiService } from 'src/app/services/api.service';
import { CommonService } from 'src/app/services/common.service';
import { getMainPageDiagramPercentages } from 'src/app/services/path';

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
export class DiagramPercentageComponent implements OnInit, OnDestroy {
  list: IDataset[];
  compsiteSub = new Subscription();

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

    this.compsiteSub.add(
      this.store.select(getDepartments).subscribe({
        next: (depts: number[]) => {
          this.list = [];
          this.apiService
            .getResponseByPost(getMainPageDiagramPercentages(), depts)
            .subscribe({
              next: (res: any) => {
                res.value.forEach((el: any) => {
                  this.list.push({
                    title: el.label,
                    subtitle: el.label2,
                    value: el.percentage,
                  });
                });
              },
            });
        },
      })
    );
  }

  ngOnDestroy(): void {
    this.compsiteSub.unsubscribe();
  }
}
