import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TreeNode } from 'primeng/api';
import { UsersComponent } from 'src/app/modules/admin/pages/users/users.component';
import { ClientComponent } from 'src/app/modules/dictionaries/pages/client/client.component';
import { EstimateTypeComponent } from 'src/app/modules/dictionaries/pages/estimate-type/estimate-type.component';
import { ProductTradeNameComponent } from 'src/app/modules/dictionaries/pages/product-trade-name/product-trade-name.component';
import { MainSummaryComponent } from 'src/app/pages/main-summary/main-summary.component';
import { Summary1Component } from 'src/app/pages/summary1/summary1.component';
import { Summary2Component } from 'src/app/pages/summary2/summary2.component';
import { TreeComponent } from 'src/app/pages/tree/tree.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(private translate: TranslateService) {}

  getMenu(): TreeNode[] {
    // w TypeScript przyjęło się dążenie do immutability, dlatego "na szybko" sugeruję używać const zawsze, a let niech będzie używane jedynie świadomie i gdy nie ma innej opcji
    const data: TreeNode[] = [
      {
        label: this.translate.instant('sidebar.mainpage'),
        icon: 'pi pi-fw pi-home',
        children: [
          {
            label: this.translate.instant('pages.main_summary.title'),
            icon: MainSummaryComponent.icon,
            component: 'MainSummaryComponent',
          },
          {
            label: this.translate.instant('pages.summary1.title'),
            icon: Summary1Component.icon,
            component: 'Summary1Component',
          },
          {
            label: this.translate.instant('pages.summary2.title'),
            icon: Summary2Component.icon,
            component: 'Summary2Component',
          },
        ],
      },
      {
        label: this.translate.instant('sidebar.service'),
        icon: 'pi pi-fw pi-wrench',
        children: [
          {
            label: this.translate.instant(TreeComponent.title),
            icon: TreeComponent.icon,
            component: 'TreeComponent',
          },
          {
            label: this.translate.instant('sidebar.administraction'),
            icon: 'pi pi-fw pi-unlock',
            children: [
              {
                label: this.translate.instant('sidebar.dictionaries'),
                icon: 'pi pi-fw pi-list',
                children: [
                  {
                    label: this.translate.instant(
                      ProductTradeNameComponent.title
                    ),
                    icon: ProductTradeNameComponent.icon,
                    component: 'ProductTradeNameComponent',
                  },
                  {
                    label: this.translate.instant(EstimateTypeComponent.title),
                    icon: EstimateTypeComponent.icon,
                    component: 'EstimateTypeComponent',
                  },
                  {
                    label: this.translate.instant(ClientComponent.title),
                    icon: ClientComponent.icon,
                    component: 'ClientComponent',
                  },
                ],
              },
              {
                label: this.translate.instant(UsersComponent.title),
                icon: UsersComponent.icon,
                component: 'UsersComponent',
              },
            ],
          },
        ],
      },
      {
        label: this.translate.instant('sidebar.equipments'),
        icon: 'pi pi-fw pi-car',
      },
      {
        label: this.translate.instant('sidebar.laboratory'),
        icon: 'pi pi-fw pi-bell',
      },
    ];
    return data;
  }

  getItemsWithComponent(): TreeNode[] {
    const res: TreeNode[] = [];
    const items = this.getMenu();
    // var ogólnie się nie używa w TS. Tu użyjemy let.
    for (let item of items) {
      if (item.children !== undefined) {
        item.children.forEach((ch1) => {
          if (ch1.component !== undefined) {
            res.push(ch1);
          }
          if (ch1.children !== undefined) {
            ch1.children.forEach((ch2) => {
              if (ch2.component !== undefined) {
                res.push(ch2);
              }
              if (ch2.children !== undefined) {
                ch2.children.forEach((ch3) => {
                  if (ch3.component !== undefined) {
                    res.push(ch3);
                  }
                  if (ch3.children !== undefined) {
                    ch3.children.forEach((ch4) => {
                      if (ch4.component !== undefined) {
                        res.push(ch4);
                      }
                    });
                  }
                });
              }
            });
          }
        });
      }
    }
    return res;
  }
}
