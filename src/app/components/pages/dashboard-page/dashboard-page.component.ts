import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { timer } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { DashboardMenuService } from "./dashboard-menu.service";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  menu: MenuItem[];
  userMenu: MenuItem[];
  display:boolean;

  constructor(
    private authService:AuthService,
    private menuService:DashboardMenuService
  ) { }


  ngOnInit(): void {
    this.setTimer();
    this.menu = this.menuService.getAppMenu();
    this.userMenu = this.menuService.getUserMenu();
  }

  logout():void {
    this.authService.logout();
  }

  private setTimer():void {
    const source = timer(2000, 5000);
    source.subscribe(val => {
      if(!this.authService.checkLastActivity()){
        this.authService.logout();
      }
    });

  }

}
