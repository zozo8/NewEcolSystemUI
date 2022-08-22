import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { PrimeNGConfig } from "primeng/api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  constructor(
    private translateService:TranslateService,
    private primeNgConfig: PrimeNGConfig
    ) {

  }

  ngOnInit(): void {
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



}
