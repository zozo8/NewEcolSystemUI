import { Component, OnInit } from "@angular/core";
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
    this.leftMenu = this.menuService.getMainMenu();
    this.userMenu = this.menuService.getUserMenu();
    this.searchMenu = this.menuService.getSearchMenu();
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
          this.display = !this.display;
         }
      },
    ];
  }

  private setTimer():void {
    const source = timer(2000, 5000);
    source.subscribe(val => {
      if(!this.authService.checkLastActivity()){
        this.authService.logout();
      }
    });

  }


  selectNodeClient(ev:Event){
    console.log(ev, this.selectedClientNode);
  }

}
