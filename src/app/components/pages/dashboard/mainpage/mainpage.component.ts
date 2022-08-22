import { Component} from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.css"]
})
export class MainpageComponent {

  constructor(
    private authService:AuthService
  ) { }

  logout():void {
    this.authService.logout();
  }
}
