import { Component, OnInit, ViewChild } from "@angular/core";
import { MenuItem } from "primeng/api";
import { timer } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { DashboardMenuService } from "./dashboard-menu.service";
import { TranslateService } from "@ngx-translate/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import { DashboardPageService } from "./dashboard-page.service";
import { environment } from "src/environments/environment";
import { Tab } from "src/app/models/tab.model";
import { DynamicTabDirective } from "src/app/directivies/dynamic-tab.directive";
import { MainpageComponent } from "../dashboard/mainpage/mainpage.component";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"],
  animations: [
    trigger("loadDashboardTrigger",[
      state("hide",style({
        opacity:"0"
      })),
      state("show", style({
        opacity:"1"
      })),
      transition("hide=>show",[
        animate("1s")
      ])
    ])
  ]
})
export class DashboardPageComponent implements OnInit {
  leftMenu: MenuItem[];
  topMenu: MenuItem[];
  userMenu: MenuItem[];
  searchMenu: MenuItem[];
  display:boolean;
  loadDashboard:boolean;
  clientNodes:any[];
  selectedClientNode:any[] = [];
  userName:string;
  appVersion:string;
  tabs:Tab[] = [];
  activeTab = 0;

  @ViewChild(DynamicTabDirective, {static:true}) dynamicTab!:DynamicTabDirective;

  constructor(
    private authService:AuthService,
    private menuService:DashboardMenuService,
    private translateService:TranslateService,
    private dashboardPageService:DashboardPageService
  ) { }


  ngOnInit(): void {
    this.appVersion = environment.appVersion + localStorage.getItem("actualLanguage");
    this.setTimer();
    this.topMenu = this.getTopMenu();
    this.userMenu = this.menuService.getUserMenu();
    this.searchMenu = this.menuService.getSearchMenu();
    this.clientNodes = this.dashboardPageService.getClientNodes();
    this.userName = localStorage.getItem("userName")??"";
   // this.loadComponent();
    // this.refreshTabs(
    //   {
    //     header:this.translateService.instant("app_menu.mainpage"),
    //     component:MainpageComponent,
    //     selected:true
    //   }
    // );

    timer(500).subscribe(()=> {
      this.loadDashboard = true;
    });
  }

  logout():void {
    this.authService.logout();
  }

  getTopMenu():MenuItem[] {
    return [
      {
        title: this.translateService.instant("common.show_menu"),
        icon:"pi pi-align-justify",
        command:()=> {
          this.display = true;
         }
      },
    ];
  }

  private setTimer():void {
    const source = timer(2000, 5000);
    source.subscribe(val => {
      if(!this.authService.checkLastActivity()) {
        this.authService.logout();
      }
    });
  }


  selectNodeClient(ev:Event) {
    console.log(ev, this.selectedClientNode);
  }

  // private loadComponent(){
  //     const viewContainerRef = this.dynamicTab.viewContainerRef;
  //     viewContainerRef.clear();
  //     const componentRef = viewContainerRef.createComponent(UsersComponent);
  //     //componentRef.instance.text = "tekst wygenerrowany dynaicznie z dyrektywy";
  // }

  refreshTabs(tab:Tab):void {
    var extTab = this.tabs.findIndex(x=>x.component === tab.component);
    if(extTab === -1){
      this.tabs.push(tab);
      // tab.header = "Strona testowa "+Math.random().toString();
      // tab.selected = true;
      // tab.tooltip = "Jakis tekst w tooltipie";

      //this.activeTab = this.tabs.length-1;


      // console.log("aktualne taby",this.tabs);
      // //console.log("taby po dodaniu",this.tabs);
      // var last = this.tabs.length;
      // //console.log(last);
      // this.tabs[last-1].selected = true;
      // console.log("aktualne taby 2",this.tabs);

      const viewContainerRef = this.dynamicTab.viewContainerRef;
      viewContainerRef.clear();
      viewContainerRef.createComponent(tab.component);


    } else {
      this.activeTab = extTab;
    }
    this.display = false;
  }

  closeTab(ev:any):void{
    console.log("iundex", ev.index);
    this.tabs.splice(ev.index,1);
  }

  changeStateDisplaySidebar():void {
    this.display = false;
  }

}
