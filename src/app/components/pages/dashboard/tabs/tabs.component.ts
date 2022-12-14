import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, take } from 'rxjs';
import { Tab } from 'src/app/models/tab.model';
import {
  removeTab,
  setActiveTab,
} from 'src/app/modules/login/state/login.actions';
import {
  getActiveTab,
  getTabs,
} from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { CommonService } from 'src/app/services/common.service';
import { components4tabs } from './components4tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  activeTab: number;
  private compsiteSubs = new Subscription();

  constructor(
    private translate: TranslateService,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    this.store
      .select(getTabs)
      .pipe(take(1))
      .subscribe({
        next: (tabs: string[]) => {
          tabs.forEach((tab, i) => {
            this.addTab(tab, i);
          });
        },
        complete: () => {
          this.activeTab = this.commonService.getValueFromObservable(
            this.store.select(getActiveTab)
          );
          this.compsiteSubs.add(
            this.store.select(getActiveTab).subscribe({
              next: (res: number) => {
                this.setTab(res);
              },
            })
          );
        },
      });
  }

  private setTab(i: number) {
    const extTab = this.tabs[i];
    if (extTab) {
      this.activeTab = i;
    } else {
      this.store
        .select(getTabs)
        .pipe(take(1))
        .subscribe({
          next: (res: string[]) => {
            this.addTab(res[i], i);
          },
        });
    }
  }

  private addTab(name: string, lastIndex: number) {
    const tab = components4tabs.find((x) => x.name === name);

    if (tab) {
      this.tabs.push({
        component: tab.component,
        header: this.translate.instant(tab.component.title ?? ''),
        active: true,
        icon: tab.component.icon ?? '',
        tooltip: tab.component.header ?? '',
      });
      this.activeTab = lastIndex;
    }
  }

  closeTab(ev: any): void {
    const tabIndex = ev.index;
    this.store.dispatch(removeTab({ val: tabIndex }));
    this.tabs.splice(ev.index, 1);
    this.store.dispatch(setActiveTab({ val: tabIndex - 1 }));
  }

  selectTab(ev: any) {
    this.store.dispatch(setActiveTab({ val: ev.index }));
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
