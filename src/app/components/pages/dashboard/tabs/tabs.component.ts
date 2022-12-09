import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Tab } from 'src/app/models/tab.model';
import { removeTab } from 'src/app/modules/login/state/login.actions';
import { getTabs } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { components4tabs } from './components4tabs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit, OnDestroy {
  tabs: Tab[] = [];
  activeTab: number;
  compsiteSubs = new Subscription();

  private _newTab: Tab;
  public get newTab(): Tab {
    return this._newTab;
  }

  @Input()
  public set newTab(t: Tab) {
    if (t !== undefined) {
      this.refreshTabs(t);
    }
  }

  constructor(
    private translate: TranslateService,
    private store: Store<LoginState>
  ) {}

  ngOnInit(): void {
    //this.addStartTab();
    this.compsiteSubs.add(
      this.store.select(getTabs).subscribe({
        next: (res: string[]) => {
          if (res) {
            res.forEach((el) => {
              this.addTab(el);
            });
          }
        },
      })
    );
  }

  private addTab(name: string): void {
    const tab = components4tabs.find(
      (x) => x.component.name.toLowerCase() === name.toLocaleLowerCase()
    );
    if (tab) {
      if (!this.tabs.find((x) => x.component.name === tab.component.name)) {
        this.tabs.push({
          component: tab.component,
          header: tab.component.header ?? '',
          active: true,
          icon: tab.component.icon ?? '',
          tooltip: tab.component.header ?? '',
        });
      }
    }
  }

  public refreshTabs(tab: Tab): void {
    if (tab.component) {
      let extTab = this.tabs.findIndex((x) => x.component === tab.component);
      if (extTab === -1) {
        this.tabs.push(tab);
        this.activeTab = this.activeTab === undefined ? 0 : this.activeTab + 1;
      } else {
        this.activeTab = extTab;
      }
    }
  }

  closeTab(ev: any): void {
    const tab = this.tabs[ev.index];
    this.store.dispatch(removeTab({ val: tab.component.name }));
    this.tabs.splice(ev.index, 1);
  }

  // addStartTab(): void {
  //   this.refreshTabs({
  //     header: this.translate.instant('pages.main_summary.title'),
  //     component: MainSummaryComponent,
  //     icon: MainSummaryComponent.icon,
  //   });
  // }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
