import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Tab } from 'src/app/models/tab.model';
import { UsersComponent } from 'src/app/modules/admin/pages/users/users.component';
import { getTabs } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState.model';
import { Summary1Component } from 'src/app/pages/summary1/summary1.component';
import { CommonService } from 'src/app/services/common.service';
import { LeftMenuService } from '../../dashboard-page/left-menu/left-menu.service';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  tabs: Tab[] = [];
  activeTab: number;
  tabs$: Observable<Tab[]>;
  tabs2$: Observable<Tab[]>;
  component: any;

  @Output()
  changeDisplay = new EventEmitter();

  constructor(
    private translateService: TranslateService,
    private leftMenuService: LeftMenuService,
    private store: Store<LoginState>,
    private common: CommonService
  ) {}

  ngOnInit(): void {
    //this.component = Summary2Component;
    // this.store.dispatch(
    //   addTab({
    //     tab: {
    //       component: Summary1Component,
    //       header: Summary1Component.header,
    //       icon: Summary1Component.icon,
    //       tooltip: Summary1Component.tooltip,
    //     },
    //   })
    // );
    //this.component = UsersComponent;
    this.tabs$ = this.store.select(getTabs);
    this.tabs$.subscribe({
      next: (res: Tab[]) => {
        res.forEach((t) => {
          console.log('t', t);
          this.tabs.push(t);
        });
      },
      complete: () => {
        this.tabs.forEach((res) => {
          res.component = Summary1Component;
        });
      },
    });
    // const test: Tab[] = this.common.getValueFromObservable(this.tabs$);
    // this.tabs.concat(test);

    //this.tabs$ = this.getData();
    // this.getData().subscribe({
    //   next: (res: Tab[]) => {
    //     console.log('res', res);
    //     this.tabs = res;
    //   },
    //   complete: () => console.log(this.tabs),
    // });

    // const start = this.leftMenuService
    //   .getMenu()
    //   .filter((x) => x.component === UsersComponent)[0];

    // this.refreshTabs({
    //   header: UsersComponent.header,
    //   component: UsersComponent,
    //   tooltip: UsersComponent.header,
    //   icon: UsersComponent.icon,
    // });
  }

  refreshTabs(tab: Tab): void {
    this.tabs.push(tab);
  }

  getData(): Observable<Tab[]> {
    const res = new BehaviorSubject<Tab[]>([]);

    const tabs: Tab[] = [
      {
        header: UsersComponent.header,
        component: UsersComponent,
        icon: UsersComponent.icon,
        tooltip: UsersComponent.header,
      },
      {
        header: Summary1Component.header,
        component: Summary1Component,
        icon: Summary1Component.icon,
        tooltip: Summary1Component.header,
      },
    ];

    res.next(tabs);
    return res.asObservable();
  }

  // public refreshTabs(tab: Tab): void {
  //   if (tab.component) {
  //     let extTab = this.tabs.findIndex((x) => x.component === tab.component);
  //     if (extTab === -1) {
  //       this.tabs.push(tab);
  //       this.activeTab = this.activeTab === undefined ? 0 : this.activeTab + 1;
  //     } else {
  //       this.activeTab = extTab;
  //     }
  //   }

  //   //this.changeDisplay.emit();
  // }

  // private setParents(tab:Tab):void {
  //   this.parents = [];

  //   if(tab.parent){
  //     this.parents.push({
  //       label: this.translateService.instant(tab.parent?.label??""),
  //       icon:tab.parent?.icon,
  //       tooltip:tab.parent?.data
  //     }
  //     );
  //   };

  //   this.parents.push(
  //   {
  //     label:tab.header,
  //     icon:tab.icon,
  //     tooltip:tab.tooltip
  //   });
  // }

  closeTab(ev: any): void {
    this.tabs.splice(ev.index, 1);
  }
}
