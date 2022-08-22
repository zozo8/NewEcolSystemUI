import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { timer } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { AppMenu } from "./appMenu";
import { UserMenu } from "./usermenu";

@Component({
  selector: "app-dashboard-page",
  templateUrl: "./dashboard-page.component.html",
  styleUrls: ["./dashboard-page.component.css"]
})
export class DashboardPageComponent implements OnInit {
  menu: MenuItem[];
  userMenu: MenuItem[];

  constructor(
    private authService:AuthService
  ) { }


  ngOnInit(): void {
    this.setTimer();
    this.menu = AppMenu;
    this.userMenu = UserMenu;
  }

  logout():void {
    this.authService.logout();
  }

  private setTimer() {
    const source = timer(2000, 5000);
    source.subscribe(val => {
      if(!this.authService.checkLastActivity()){
        this.authService.logout();
      }
    });

  }

}
