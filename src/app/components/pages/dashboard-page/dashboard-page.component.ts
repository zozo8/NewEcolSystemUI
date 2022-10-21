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
import { TabsComponent } from "../dashboard/tabs/tabs.component";
import { DynamicTabDirective } from "src/app/directivies/dynamic-tab.directive";
import { UsersComponent } from "src/app/modules/admin/pages/users/users.component";
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
export class DashboardPageComponent implements OnInit  {
  leftMenu: MenuItem[];
  topMenu: MenuItem[];
  userMenu: MenuItem[];

  display:boolean;
  loadDashboard:boolean;
  clientNodes:any[];
  selectedClientNode:any[] = [];
  userName:string;
  appVersion:string;

  @ViewChild(DynamicTabDirective, {static:true}) dynamicTab!:DynamicTabDirective;

  constructor(
    private authService:AuthService,
    private menuService:DashboardMenuService,
    private translateService:TranslateService,
    private dashboardPageService:DashboardPageService
  ) { }


  ngOnInit(): void {
    this.appVersion = environment.appVersion +" "+ this.translateService.currentLang;
    this.setTimer();
    this.topMenu = this.getTopMenu();
    this.userMenu = this.menuService.getUserMenu();

    this.clientNodes = this.dashboardPageService.getClientNodes();
    this.userName = localStorage.getItem("userName")??"";

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

  selectNodeClient(ev:Event):void {
    console.log(ev, this.selectedClientNode);
  }

  changeStateDisplaySidebar():void {
    this.display = false;
  }
}
