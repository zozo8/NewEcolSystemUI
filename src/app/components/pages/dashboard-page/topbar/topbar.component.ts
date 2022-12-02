import { animate, style, transition, trigger } from '@angular/animations';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import {
  ConfirmationService,
  MegaMenuItem,
  MessageService,
  TreeNode,
} from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { GridEnum } from 'src/app/models/gridEnum';
import { Tab } from 'src/app/models/tab.model';
import { Department } from 'src/app/modules/admin/models/department';
import { IDepartmentState } from 'src/app/modules/login/state/IDepartmentState';
import { removeDepartment } from 'src/app/modules/login/state/login.actions';
import { getDepartments } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { CommonService } from 'src/app/services/common.service';
import { columnListPath, getModelListPath } from 'src/app/services/path';
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
export class TopbarComponent implements OnInit, OnDestroy {
  activeItem: number;
  departmentsState: IDepartmentState[] = [];
  departments: Department[] = [];
  departmentsId: number[] = [];
  compsiteSubs = new Subscription();

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
    private menuService: MenuService,
    private translate: TranslateService,
    private store: Store<LoginState>,
    private commonService: CommonService,
    private confirmService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.compsiteSubs.add(
      this.store.select(getDepartments).subscribe({
        next: (deps: number[]) => {
          this.departmentsId.push(...deps);
          if (this.departmentsId) {
            this.getDepartments().subscribe({
              next: (res: Department[]) => {
                this.departments.push(...res);
                this.departmentsState = [];
                deps.forEach((dep) => {
                  const depObj = this.departments.find((x) => x.id === dep);
                  if (depObj) {
                    this.departmentsState.push({
                      id: dep,
                      name: depObj?.departmentName,
                    });
                  }
                });
              },
            });
          }
        },
      })
    );
  }

  getDepartments(): Observable<Department[]> {
    return this.commonService.getObservableList4path(
      getModelListPath('Department'),
      columnListPath(GridEnum.Departments),
      undefined,
      {
        first: 1,
        rows: 1000,
      }
    );
  }

  removeDepartment(depId: number) {
    this.confirmService.confirm({
      message: 'Czy napewno nie chcesz już pracować w obrębie tego zakładu?',
      accept: () => {
        this.store.dispatch(removeDepartment({ val: depId }));
        // var deps: number[] = [];
        // deps.push(...this.departmentsId);
        // const index = deps.findIndex((x) => x === dep.id);
        // deps.splice(index, 1);
        // this.store.dispatch(setDepartments({ val: deps }));
        this.messageService.add({
          severity: 'success',
          summary: 'Poprawnie usunięto zakład',
        });
      },
    });
  }

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

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
