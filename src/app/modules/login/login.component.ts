import { Component} from "@angular/core";
import Login from "./interfaces/login.model";
import { ResponseLoginUR } from "./interfaces/UR/responseLoginUr.model";
import { LoginService } from "./login.service";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent{
  loading:boolean;
  errorText:string;

  public loginObj:Login = {
    password:"",
    userName:""
  };
  constructor(
    private loginService:LoginService
  ) { }


  login():void {
    this.loading = true;
    this.errorText = "";
    this.loginService.loginToUR(this.loginObj).subscribe({
      next:(res:ResponseLoginUR)=> {

        this.loginService.authenticate(res);
      },
      complete:()=>{ this.loading = false},
      error:()=> {
        this.loading = false;
        this.errorText = "Niepoprawny login lub hasło!";
      }
    });
  }


}
