import { MegaMenuItem, MenuItem } from "primeng/api";
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

  getLeftMenu():MenuItem[] {

    return [
      {
        label: this.translateService.instant("app_menu.equipment_tree"),
        icon:"pi pi-align-left",
        routerLink:""
      },
      {
        label:this.translateService.instant("app_menu.orders_header"),
        icon:"pi pi-align-justify",
        items:[
          {
            label:this.translateService.instant("app_menu.orders.orders"),
            routerLink:"/dashboard/orders"
          },
          {
            label:this.translateService.instant("app_menu.orders.order_cards"),
            routerLink:"/dashboard/order-cards"
          }
        ]
      },
      {
          label: this.translateService.instant("app_menu.browsers_header"),
          icon:"pi pi-align-justify",
          items: [
            {
                  label: this.translateService.instant("app_menu.browsers.tree_elements_header"),
                  items: [
                      {
                        label: this.translateService.instant("app_menu.browsers.tree_elements.objects"),
                        routerLink: "/dashboard/objects",
                      },
                      {
                        label: this.translateService.instant("app_menu.browsers.tree_elements.nodes"),
                        routerLink: "/dashboard/nodes",
                      },
                      {
                        label: this.translateService.instant("app_menu.browsers.tree_elements.equipments"),
                        routerLink: "/dashboard/equipments",
                      },
                      {
                        label: this.translateService.instant("app_menu.browsers.tree_elements.lubricant_points"),
                        routerLink: "/dashboard/lubricant-points",
                      }
                  ]
              }
          ]
      },
      {
          label: this.translateService.instant("app_menu.dictionaries_header"),
          icon: "pi pi-fw pi-align-justify",
          items: [
              {
                label: this.translateService.instant("app_menu.dictionaries.task_types")
              },
              {
                label: this.translateService.instant("app_menu.dictionaries.task_groups")
              }
          ]
      },
      {
        label:this.translateService.instant("app_menu.admin_header"),
        icon:"pi pi-fw pi-lock",
        items:[
          {
            label:this.translateService.instant("app_menu.admin.users"),
            icon:"pi pi-user",
            routerLink:"/dashboard/admin/users"
          }
        ]

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

