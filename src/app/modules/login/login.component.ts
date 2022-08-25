import { Component, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import Login from "./interfaces/login.model";
import { ResponseLoginUR } from "./interfaces/UR/responseLoginUr.model";
import { LoginService } from "./login.service";
import { TranslateService } from "@ngx-translate/core";
import {
  trigger,
  state,
  style,
  animate,
  transition
} from "@angular/animations";
import {  timer } from "rxjs";



@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
  animations: [
    trigger("showContentTrigger",[
      state("hide",style({
        opacity:"0"
      })),
      state("show", style({
        color:"white",
        opacity:"1"
      })),
      transition("hide=>show",[
        animate("1s ease-out")
      ])
    ]),
    trigger("showAdvTrigger",[
      state("startShowAdv", style({
        textAlign:"right",
        opacity:"0"
      })),
      state("endShowAdv", style({
        textAlign:"center",
        opacity:"0.5",
        paddingRight:"40px"

      })),
      transition("startShowAdv=>endShowAdv",[
          animate("1s ease-out")
      ])
    ]),
    trigger("hideAdvTrigger",[
      state("startHideAdv", style({
        opacity:"1",
      })),
      state("endHideAdv", style({
        opacity:"0",
      })),
      transition("startHideAdv=>endHideAdv",[
          animate("1.5s ease-in")
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  loading:boolean;
  errorText:string;
  panelTitle:string;
  showContent:boolean;
  showAdv:boolean[] = [false,false,false,false];
  hideAdvs:boolean;


  constructor(
    private loginService:LoginService,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
   this.startAnimations();
  }

  startAnimations(){
    timer(1500).subscribe(()=> this.showContent = !this.showContent);
    timer(2000).subscribe(()=> this.showAdv[0] = true);
    timer(2300).subscribe(()=> this.showAdv[1] = true);
    timer(2600).subscribe(()=> this.showAdv[2] = true);
    timer(2900).subscribe(()=> this.showAdv[3] = true);
  }

  loginObj:Login = {
    password:"",
    userName:""
  };

  login():void {
    this.hideAdvs = true;
    this.loading = true;
    this.errorText = "";
    timer(2000).subscribe(()=> {
      this.loginService.loginToUR(this.loginObj).subscribe({
        next:(res:ResponseLoginUR)=> {
          this.loginService.authenticate(res);
        },
        complete:()=> {
            this.loading = false;
        },
        error:()=> {
          this.loading = false;
          this.hideAdvs = false;
          this.errorText = this.translateService.instant("pages.login_page.error");
        }
      });
    });
  }

  setLanguage(ln:string):void {
    this.translateService.use(ln);
    localStorage.setItem("actualLanguage",ln);
  }

}
