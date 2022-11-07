import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { Observable, timer } from 'rxjs';
import { AuthService } from 'src/app/modules/login/auth/auth.service';
import { getUserName } from 'src/app/modules/login/state/login.selector';
import { LoginState } from 'src/app/modules/login/state/loginState.model';
import { environment } from 'src/environments/environment';
import { DashboardMenuService } from './dashboard-menu.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css'],
  animations: [
    trigger('loadDashboardTrigger', [
      state(
        'hide',
        style({
          opacity: '0',
        })
      ),
      state(
        'show',
        style({
          opacity: '1',
        })
      ),
      transition('hide=>show', [animate('1s')]),
    ]),
  ],
})
export class DashboardPageComponent implements OnInit {
  leftMenu: MenuItem[];
  topMenu: MenuItem[];
  userMenu: MenuItem[];

  visibleMenu: boolean;
  loadDashboard: boolean;
  clientNodes: any[];
  selectedClientNode: any[] = [];
  userName$: Observable<string>;
  appVersion: string;

  constructor(
    private authService: AuthService,
    private menuService: DashboardMenuService,
    private translateService: TranslateService,
    private store: Store<LoginState>
  ) {}

  ngOnInit(): void {
    this.appVersion = `${environment.appVersion} ${this.translateService.currentLang}`;
    //this.setTimer();
    this.topMenu = this.getTopMenu();
    this.userMenu = this.menuService.getUserMenu();

    this.getClientNodes();
    this.userName$ = this.store.select(getUserName);
    timer(500).subscribe(() => {
      this.loadDashboard = true;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  getTopMenu(): MenuItem[] {
    return [
      {
        title: this.translateService.instant('common.show_menu'),
        icon: 'pi pi-align-justify',
        command: () => {
          this.visibleMenu = true;
        },
      },
    ];
  }

  private setTimer(): void {
    const source = timer(2000, 5000);
    source.subscribe((val) => {
      if (!this.authService.checkLastActivity()) {
        this.authService.logout();
      }
    });
  }

  changeStateDisplaySidebar(): void {
    this.visibleMenu = false;
  }

  getClientNodes(): void {
    this.clientNodes = [
      {
        label: 'Orlen',
        data: 'Orlen',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            label: 'PTA Włocławek',
            data: '1',
            collapsedIcon: 'pi pi-file',
            key: '1',
          },
          {
            label: 'CCGT Płock',
            data: '2',
            collapsedIcon: 'pi pi-file',
            key: '2',
          },
          {
            label: 'CCGT Włocławek',
            data: '3',
            collapsedIcon: 'pi pi-file',
            key: '3',
          },
          {
            label: 'EC PŁOCK',
            data: '4',
            collapsedIcon: 'pi pi-file',
            key: '4',
          },
        ],
      },
      {
        label: 'NGK',
        data: 'NGK',
        expandedIcon: 'pi pi-folder-open',
        collapsedIcon: 'pi pi-folder',
        children: [
          {
            label: 'NGK Gliwice',
            data: '5',
            collapsedIcon: 'pi pi-file',
            key: '3',
          },
          {
            label: 'NGK Dąbrowa Górnicza',
            data: '6',
            collapsedIcon: 'pi pi-file',
            key: '6',
          },
        ],
      },
    ];
  }
}
