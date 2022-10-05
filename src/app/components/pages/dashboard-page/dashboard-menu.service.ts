import { MenuItem } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";
import { Injectable } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Injectable({
  providedIn: "root"
})
export class DashboardMenuService{



  constructor(
      private translateService:TranslateService,
      private authService:AuthService
  ) {

  }

  getSearchMenu(): MenuItem[] {
    return [
      {
        label:this.translateService.instant("common.search_menu.window")
      },
      {
        label:this.translateService.instant("common.search_menu.equipment")
      },
      {
        label:this.translateService.instant("common.search_menu.point")
      }
    ];
  }



  getUserMenu():MenuItem[] {
    return [
      {
        label:this.translateService.instant("common.user_menu.settings"),
        icon:"pi pi-fw pi-sliders-h",
      },
      {
        label:this.translateService.instant("common.user_menu.user_profile"),
        icon:"pi pi-fw pi-user",
      },
      {
        separator:true
      }, {
        label:this.translateService.instant("common.user_menu.logout"),
        icon:"pi pi-fw pi-power-off",
        command:()=> {
         this.authService.logout();
        }
      }
  ];
  }
}

