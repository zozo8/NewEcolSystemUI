import { Component, OnDestroy, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";
import { LoginService } from "./modules/login/login.service";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit,OnDestroy {

  constructor(
    private translateService:TranslateService,
    private primeNgConfig: PrimeNGConfig,
    private authService:AuthService,
    private loginService:LoginService
    ) {

  }

  ngOnInit(): void {

    if (!this.authService.checkLastActivity()) {
      this.authService.logout();
    }

    this.translateService.addLangs(["pl", "en", "de"]);
    const lan = localStorage.getItem( "actualLanguage" ) ?? "pl";

    if ( lan !== "null" ) {
      this.translateService.use(lan);
    } else {
      this.translateService.setDefaultLang("pl");
    }

      this.translateService.get("primeng").subscribe(res => {
        this.primeNgConfig.setTranslation(res);
      });
  }

  ngOnDestroy(): void {
    localStorage.clear();
  }
}
