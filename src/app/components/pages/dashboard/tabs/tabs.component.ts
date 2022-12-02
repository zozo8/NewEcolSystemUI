import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Tab } from 'src/app/models/tab.model';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { MainSummaryComponent } from 'src/app/pages/main-summary/main-summary.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  tabs: Tab[] = [];
  activeTab: number;

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
    this.addStartTab();
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
    this.tabs.splice(ev.index, 1);
  }

  closeTabs(): void {
    this.tabs = [];
  }

  addStartTab(): void {
    // this.store.select(getDepartments).subscribe({
    //   next: (res: number[]) => {
    //     if (res.length > 0) {
    this.refreshTabs({
      header: this.translate.instant('pages.main_summary.title'),
      component: MainSummaryComponent,
      icon: MainSummaryComponent.icon,
    });
    // }
    //   },
    // });
  }
}
