import {  AfterContentInit, AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { DynamicTabDirective } from "src/app/directivies/dynamic-tab.directive";
import { Tab } from "src/app/models/tab.model";
import { MainpageComponent } from "../mainpage/mainpage.component";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"]
})
export class TabsComponent implements OnInit {

  tabs:Tab[] = [];
  activeTab = 0;

  @ViewChild(DynamicTabDirective, {static:true}) dynamicTab!:DynamicTabDirective;

  @Output()
  changeDisplay = new EventEmitter();

  constructor(
    private translateService:TranslateService

  ) { }


  ngOnInit(): void {
     this.refreshTabs(
      {
        header:this.translateService.instant("app_menu.mainpage"),
        component:MainpageComponent,
        selected:true
      }
    );
  }

  public refreshTabs(tab:Tab):void {
    if (tab.component) {
      var extTab = this.tabs.findIndex(x=>x.component === tab.component);
      if(extTab === -1){
        this.tabs.push(tab);

        const viewContainerRef = this.dynamicTab.viewContainerRef;
        viewContainerRef.clear();
        viewContainerRef.createComponent(tab.component);

      } else {
        this.activeTab = extTab;
      }
    }

    this.changeDisplay.emit();
  }


  changeTab(ev:any):void{
    const comp = this.tabs[ev.index].component;
    const viewContainerRef = this.dynamicTab.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(comp);
  }

  closeTab(ev:any):void{
    this.tabs.splice(ev.index,1);
  }

}


