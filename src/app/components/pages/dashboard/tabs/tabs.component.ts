import { AfterContentInit, Component, ComponentFactoryResolver, ContentChildren, EventEmitter, OnInit, Output, QueryList, ViewChild } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem} from "primeng/api";
import { DynamicTabDirective } from "src/app/directivies/dynamic-tab.directive";
import { Tab } from "src/app/models/tab.model";
import { UsersComponent } from "src/app/modules/admin/pages/users/users.component";
import { LeftMenuService } from "../../dashboard-page/left-menu/left-menu.service";
import { MainpageComponent } from "../mainpage/mainpage.component";

@Component({
  selector: "app-tabs",
  templateUrl: "./tabs.component.html",
  styleUrls: ["./tabs.component.css"]
})
export class TabsComponent {

  tabs:Tab[] = [];
  activeTab:number;
  //parents:MenuItem[] = [];

  @ViewChild(DynamicTabDirective, {static:true}) dynamicTab!:DynamicTabDirective;

  @Output()
  changeDisplay = new EventEmitter();

  constructor(
    private translateService:TranslateService,
    private leftMenuService:LeftMenuService
  ) { }


  ngOnInit(): void {
    const start = this.leftMenuService.getMenu().filter(x=>x.component === MainpageComponent)[0];
    this.refreshTabs({
      header:this.translateService.instant(start.label??""),
      component:start.component,
      tooltip:start.data,
      icon:start.icon
    });
  }

  public refreshTabs(tab:Tab):void {
    //console.log("start tab", tab);
    if (tab.component) {
      var extTab = this.tabs.findIndex(x=>x.component === tab.component);
      if(extTab === -1){
        this.tabs.push(tab);
       // console.log("po dodaniu do tablicy", this.tabs);

        //this.populateTabByComponent(tab.component);
        //this.setParents(tab);
        this.activeTab = this.activeTab === undefined?0:(this.activeTab+1);
        console.log("active tab - new", this.activeTab);

      } else {
        this.activeTab = extTab;
        console.log("active tab - reopen", this.activeTab);
        //this.populateTabByComponent(tab.component);
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

  changeTab(ev:any):void{
    console.log("wybrabny tab ",ev.index);
   // const comp = this.tabs[ev.index].component;
   // this.populateTabByComponent(comp);
  }

  closeTab(ev:any):void{
    this.tabs.splice(ev.index,1);
    //wyliczienie ostatniegi i otwarcie go
  }

  // private populateTabByComponent(component:any):void {
  //   const viewContainerRef = this.dynamicTab.viewContainerRef;
  //   viewContainerRef.clear();
  //   viewContainerRef.createComponent(component);
  // }

  // addTab() {

  //   this.refreshTabs({
  //     header:"users",
  //     component:UsersComponent,
  //     tooltip:"jakeis tam dane dot users component",
  //     icon:"pi pi-user"
  //   });
  // }

}
