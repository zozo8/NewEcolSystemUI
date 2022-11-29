import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Tab } from 'src/app/models/tab.model';
import { MainSummaryComponent } from 'src/app/pages/main-summary/main-summary.component';
import { Summary1Component } from 'src/app/pages/summary1/summary1.component';

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

  constructor(private translate: TranslateService) {}

  ngOnInit(): void {
    this.refreshTabs({
      header: this.translate.instant('pages.summary1.title'),
      component: MainSummaryComponent,
      icon: Summary1Component.icon,
    });
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
