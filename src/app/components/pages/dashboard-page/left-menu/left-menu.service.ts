import { Injectable } from "@angular/core";
import { TreeNode } from "primeng/api";
import { UsersComponent } from "src/app/modules/admin/pages/users/users.component";
import { ProductTradeNameComponent } from "src/app/modules/dictionaries/pages/product-trade-name/product-trade-name.component";
import { MainpageComponent } from "../../dashboard/mainpage/mainpage.component";

@Injectable({
  providedIn: "root"
})
export class LeftMenuService {

  constructor() { }

  getMenu():TreeNode[] {

    return [
      {
        label: "app_menu.mainpage",
        icon:"pi pi-home",
        component:MainpageComponent,
        data:"Zakładka wyświetla wykresy, podsumowania i komunikaty systemowe."
      },
      {
        label:"app_menu.admin_header",
        icon:"pi pi-lock",
        children:[
          {
            label:"app_menu.admin.users",
            icon:"pi pi-user",
            component:UsersComponent,
            data:"Zakładka wyświetla listę użytkowników. Umożliwa ich edycję oraz przypisywanie im grup, parametrów i zakładów."
          }
        ]
      },
      // {
      //   label:"app_menu.dictionaries_header",
      //   icon:"pi pi-book",
      //   children:[
      //     {
      //       label:"app_menu.product_groups",
      //       icon:"pi pi-bookmark-fill",
      //       component:ProductTradeNameComponent,
      //       data:"Zakładka wyświetla liste grup produktów grupujących środki smarne."
      //     }
      //   ]
      // }
  ];
  }
}
