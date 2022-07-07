import { Component, OnInit } from "@angular/core";
import { Login } from "src/app/models/login.model";
import { ResponseLoginUR } from "src/app/models/UR/responseLoginUr.model";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {

  public loginObj:Login = {};
  constructor(
    private authService:AuthService
  ) { }

  login() {

    this.authService.loginToUR(this.loginObj).subscribe({
      next:(res:ResponseLoginUR)=> {
        this.authService.authenticate(res);
      },
      error:(err:string)=> {
        console.error(err);
      },
      complete:()=>console.log("Connect to repo!")
    });
  }


}
