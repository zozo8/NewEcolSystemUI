import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { getPackedSettings } from "http2";
import { TreeNode } from "primeng/api";
import { BehaviorSubject, Observable } from "rxjs";
import { UsersComponent } from "src/app/modules/admin/pages/users/users.component";
import { ProductTradeNameComponent } from "src/app/modules/dictionaries/pages/product-trade-name/product-trade-name.component";
import { MainpageComponent } from "../../dashboard/mainpage/mainpage.component";

@Injectable({
  providedIn: "root"
})
export class LeftMenuService {

  constructor(
    private translateService:TranslateService
  ) { }

  getMenu():TreeNode[] {

    return [
      {
        label: this.translateService.instant("app_menu.mainpage"),
        icon:"pi pi-home",
        component:MainpageComponent,
        data:"Zakładka wyświetla wykresy, podsumowania i komunikaty systemowe."
      },
      {
        label:this.translateService.instant("app_menu.admin_header"),
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
      {
        label:this.translateService.instant("app_menu.dictionaries_header"),
        icon:"pi pi-book",
        children:[
          {
            label:this.translateService.instant("app_menu.dictionaries.product_groups"),
            icon:"pi pi-bookmark-fill",
            component:ProductTradeNameComponent,
            data:"Zakładka wyświetla liste grup produktów grupujących środki smarne."
          }
        ]
      }
  ];
  }

  getPages(val:string):Observable<TreeNode[]>{
    var ret = new BehaviorSubject<TreeNode[]>([]);
    var pages:TreeNode[] = [];
    this.getMenu().forEach(item=>{
      console.log("item", item.children);
       if(item.children !== undefined){
        item.children?.filter(x=>x.label?.toLowerCase().includes(val)).forEach(ch=>{
          console.log("ch", ch);
          pages.push(ch);
        });
      } else {
        if(item.label?.toLowerCase().includes(val)){
          pages.push(item);
        }
      }
    });
    console.log("pages", pages);
    ret.next(pages);

    return ret.asObservable();
  }

}
