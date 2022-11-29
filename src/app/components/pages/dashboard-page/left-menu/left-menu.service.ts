import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsersComponent } from 'src/app/modules/admin/pages/users/users.component';
import { ProductTradeNameComponent } from 'src/app/modules/dictionaries/pages/product-trade-name/product-trade-name.component';
import { MainSummaryComponent } from 'src/app/pages/main-summary/main-summary.component';
import { Summary1Component } from 'src/app/pages/summary1/summary1.component';

@Injectable({
  providedIn: 'root',
})
export class LeftMenuService {
  constructor(private translateService: TranslateService) {}

  getMenu(): TreeNode[] {
    return [
      {
        label: 'podsumowanie test',
        icon: 'pi pi-home',
        component: MainSummaryComponent,
        data: 'Podsumowanie',
      },
      {
        label: this.translateService.instant('app_menu.mainpage'),
        icon: 'pi pi-home',
        component: Summary1Component,
        data: 'Zakładka wyświetla wykresy, podsumowania i komunikaty systemowe.',
      },
      {
        label: this.translateService.instant('app_menu.admin_header'),
        icon: 'pi pi-lock',
        children: [
          {
            label: this.translateService.instant('app_menu.admin.users'),
            icon: UsersComponent.icon,
            component: UsersComponent,
            data: 'Zakładka wyświetla listę użytkowników. Umożliwa ich edycję oraz przypisywanie im grup, parametrów i zakładów.',
          },
        ],
      },
      {
        label: this.translateService.instant('app_menu.dictionaries_header'),
        icon: 'pi pi-book',
        children: [
          {
            label: this.translateService.instant(
              'app_menu.dictionaries.product_groups'
            ),
            icon: 'pi pi-bookmark-fill',
            component: ProductTradeNameComponent,
            data: 'Zakładka wyświetla liste grup produktów grupujących środki smarne.',
          },
        ],
      },
    ];
  }

  getPages(ev: any): Observable<TreeNode[]> {
    let ret = new BehaviorSubject<TreeNode[]>([]);
    let pages: TreeNode[] = [];
    this.getMenu().forEach((item) => {
      if (item.children !== undefined) {
        item.children
          ?.filter((x) => x.label?.toLowerCase().includes(ev.query))
          .forEach((ch) => {
            pages.push(ch);
          });
      } else {
        if (item.label?.toLowerCase().includes(ev.query)) {
          pages.push(item);
        }
      }
    });
    ret.next(pages);

    return ret.asObservable();
  }
}
