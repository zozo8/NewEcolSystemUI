import { Component, OnInit} from "@angular/core";
import Login from "./interfaces/login.model";
import { ResponseLoginUR } from "./interfaces/UR/responseLoginUr.model";
import { LoginService } from "./login.service";
import { TranslateService } from "@ngx-translate/core";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent{

  loading:boolean;
  errorText:string;
  panelTitle:string;

  constructor(
    private loginService:LoginService,
    private translateService:TranslateService
  ) { }


  public loginObj:Login = {
    password:"",
    userName:""
  };

  login():void {
    this.loading = true;
    this.errorText = "";
    this.loginService.loginToUR(this.loginObj).subscribe({
      next:(res:ResponseLoginUR)=> {

        this.loginService.authenticate(res);
      },
      complete:()=>{
        this.loading = false
      },
      error:()=> {
        this.loading = false;
        this.errorText = this.translateService.instant("login_page.error");
      }
    });
  }

  setLanguage(ln:string):void{
    this.translateService.use(ln);
    localStorage.setItem("actualLanguage",ln);
  }


}
