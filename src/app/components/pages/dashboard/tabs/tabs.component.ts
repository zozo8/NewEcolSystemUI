import { Component, EventEmitter, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Tab } from 'src/app/models/tab.model';
import { LeftMenuService } from '../../dashboard-page/left-menu/left-menu.service';
import { MainpageComponent } from '../mainpage/mainpage.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent {
  tabs: Tab[] = [];
  activeTab: number;

  @Output()
  changeDisplay = new EventEmitter();

  constructor(
    private translateService: TranslateService,
    private leftMenuService: LeftMenuService
  ) {}

  ngOnInit(): void {
    const start = this.leftMenuService
      .getMenu()
      .filter((x) => x.component === MainpageComponent)[0];
    this.refreshTabs({
      header: this.translateService.instant(start.label ?? ''),
      component: start.component,
      tooltip: start.data,
      icon: start.icon,
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

    this.changeDisplay.emit();
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
