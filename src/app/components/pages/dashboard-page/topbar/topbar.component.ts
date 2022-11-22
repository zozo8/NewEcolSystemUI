import { animate, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MegaMenuItem, TreeNode } from 'primeng/api';
import { AppComponent } from 'src/app/app.component';
import { Tab } from 'src/app/models/tab.model';
import { DashboardPageComponent } from '../dashboard-page.component';
import { MenuService } from '../menu/menu.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
  animations: [
    trigger('topbarActionPanelAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scaleY(0.8)' }),
        animate(
          '.12s cubic-bezier(0, 0, 0.2, 1)',
          style({ opacity: 1, transform: '*' })
        ),
      ]),
      transition(':leave', [animate('.1s linear', style({ opacity: 0 }))]),
    ]),
  ],
})
export class TopbarComponent implements OnInit {
  activeItem: number;

  model: MegaMenuItem[] = [
    {
      label: 'RAPORTY',
      icon: 'pi pi-fw pi-print',
      items: [
        [
          {
            label: 'Zlecenia',
            items: [
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
            ],
          },
        ],
        [
          {
            label: 'Urządzenia',
            items: [
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
            ],
          },
        ],
        [
          {
            label: 'Magazyn',
            items: [
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
              {
                label: 'Raport',
                icon: 'pi pi-fw pi-id-card',
              },
            ],
          },
        ],
      ],
    },
  ];

  @ViewChild('searchInput') searchInputViewChild: ElementRef;

  pages: TreeNode[];
  selectedPage: TreeNode;

  constructor(
    public app: AppComponent,
    public dashboard: DashboardPageComponent,
    private menuService: MenuService
  ) {}

  ngOnInit(): void {}

  onSearchAnimationEnd(event: any) {
    switch (event.toState) {
      case 'visible':
        this.searchInputViewChild.nativeElement.focus();
        break;
    }
  }

  select(item: any): void {
    const tab: Tab = {
      header: item.label,
      component: item.component,
      tooltip: item.label,
    };

    this.selectedPage = {};
    this.dashboard.searchClick = true;
    this.dashboard.addTab(tab);
  }

  search(ev: any): void {
    this.pages = this.menuService
      .getItemsWithComponent()
      .filter((x) => x.label?.toLowerCase().includes(ev.query.toLowerCase()));
  }
}
