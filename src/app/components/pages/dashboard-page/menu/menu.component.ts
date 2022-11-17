import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { UsersComponent } from 'src/app/modules/admin/pages/users/users.component';
import { ProductTradeNameComponent } from 'src/app/modules/dictionaries/pages/product-trade-name/product-trade-name.component';
import { Summary1Component } from 'src/app/pages/summary1/summary1.component';
import { Summary2Component } from 'src/app/pages/summary2/summary2.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  model: any[];

  constructor(
    public app: AppComponent,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.model = [
      {
        label: 'Strona główna',
        icon: 'pi pi-fw pi-home',
        items: [
          {
            label: Summary1Component.header,
            icon: Summary1Component.icon,
            badge: '4',
            badgeClass: 'p-badge-info',
            component: Summary1Component,
            tooltip: Summary1Component.tooltip,
          },
          {
            label: Summary2Component.header,
            icon: Summary2Component.icon,
            badge: '2',
            badgeClass: 'p-badge-info',
            component: Summary2Component,
            tooltip: Summary2Component.tooltip,
          },
        ],
      },
      {
        label: 'Serwis smarowniczy',
        icon: 'pi pi-fw pi-wrench',
        items: [
          {
            label: 'Drzewo urządzeń',
            icon: 'pi pi-fw pi-id-card',
          },
          {
            label: 'Administracja',
            icon: 'pi pi-fw pi-compass',
            items: [
              {
                label: 'Słowniki',
                icon: 'pi pi-fw pi-prime',
                items: [
                  {
                    label: ProductTradeNameComponent.header,
                    icon: ProductTradeNameComponent.icon,
                    component: ProductTradeNameComponent,
                    tooltip: ProductTradeNameComponent.tooltip,
                  },
                  {
                    label: 'Grupy zadań',
                    icon: 'pi pi-fw pi-prime',
                  },
                  {
                    label: 'Rodzaje zadań',
                    icon: 'pi pi-fw pi-prime',
                  },
                ],
              },
              {
                label: UsersComponent.header,
                icon: UsersComponent.icon,
                component: UsersComponent,
                tooltip: UsersComponent.header,
              },
            ],
          },
        ],
      },
      {
        label: 'Ecol Majątek',
        icon: 'pi pi-fw pi-car',
      },
      {
        label: 'Ecol Laboratorium',
        icon: 'pi pi-fw pi-bell',
      },
    ];
  }
}
