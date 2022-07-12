import { Component, OnInit } from "@angular/core";
import { tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { MainpageService } from "src/app/services/mainpage.service";

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.css"]
})
export class MainpageComponent {

  constructor(
    private authService:AuthService,
    private mainpageService:MainpageService
  ) { }

  logout():void {
    this.authService.logout();
  }

  getUsers():void {
    this.mainpageService.getUsers();
  }
}
