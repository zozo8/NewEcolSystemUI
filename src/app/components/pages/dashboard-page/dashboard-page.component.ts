import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Observable, timer } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Tab } from 'src/app/models/tab.model';
import { AuthService } from 'src/app/modules/login/auth/auth.service';
import { LoginState } from 'src/app/modules/login/state/loginState.model';
import { environment } from 'src/environments/environment';
import { MenuService } from './menu.service';

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
export class DashboardPageComponent implements OnInit, AfterViewInit {
  //new
  topbarMenuActive: boolean;
  menuActive: boolean;
  staticMenuDesktopInactive: boolean;
  mobileMenuActive: boolean;
  menuClick: boolean;
  mobileTopbarActive: boolean;
  topbarRightClick: boolean;
  topbarItemClick: boolean;
  activeTopbarItem: string;
  documentClickListener: () => void;
  configActive: boolean;
  configClick: boolean;
  rightMenuActive: boolean;
  menuHoverActive = false;
  searchClick = false;
  search = false;
  currentInlineMenuKey: string;
  inlineMenuActive: any[] = [];
  inlineMenuClick: boolean;

  //

  leftMenu: MenuItem[];
  topMenu: MenuItem[];
  userMenu: MenuItem[];

  visibleMenu: boolean;
  loadDashboard: boolean;
  clientNodes: any[];
  selectedClientNode: any[] = [];
  userName$: Observable<string>;
  appVersion: string;
  newTab: Tab;

  constructor(
    private authService: AuthService,
    // private menuService: DashboardMenuService,
    private translateService: TranslateService,
    private store: Store<LoginState>,
    public app: AppComponent,
    public renderer: Renderer2,
    private menuService: MenuService,
    private primengConfig: PrimeNGConfig
  ) {}

  ngAfterViewInit(): void {
    // hides the horizontal submenus or top menu if outside is clicked
    this.documentClickListener = this.renderer.listen('body', 'click', () => {
      if (!this.topbarItemClick) {
        this.activeTopbarItem = '';
        this.topbarMenuActive = false;
      }

      if (!this.menuClick && (this.isHorizontal() || this.isSlim())) {
        this.menuService.reset();
      }

      if (this.configActive && !this.configClick) {
        this.configActive = false;
      }

      if (!this.menuClick) {
        if (this.mobileMenuActive) {
          this.mobileMenuActive = false;
        }

        if (this.isOverlay()) {
          this.menuActive = false;
        }

        this.menuHoverActive = false;
        this.unblockBodyScroll();
      }

      if (!this.searchClick) {
        this.search = false;
      }

      if (
        this.inlineMenuActive[this.currentInlineMenuKey] &&
        !this.inlineMenuClick
      ) {
        this.inlineMenuActive[this.currentInlineMenuKey] = false;
      }

      this.inlineMenuClick = false;
      this.searchClick = false;
      this.configClick = false;
      this.topbarItemClick = false;
      this.topbarRightClick = false;
      this.menuClick = false;
    });
  }

  ngOnInit(): void {
    this.menuActive = this.isStatic() && !this.isMobile();

    this.appVersion = `${environment.appVersion} ${this.translateService.currentLang}`;
    // //this.setTimer();
    // this.topMenu = this.getTopMenu();
    // this.userMenu = this.menuService.getUserMenu();

    // this.getClientNodes();
    // this.userName$ = this.store.select(getUserName);
    timer(500).subscribe(() => {
      this.loadDashboard = true;
    });
  }

  //new
  isOverlay() {
    return this.app.menuMode === 'overlay';
  }

  isStatic() {
    return this.app.menuMode === 'static';
  }

  isHorizontal() {
    return this.app.menuMode === 'horizontal';
  }

  isSlim() {
    return this.app.menuMode === 'slim';
  }

  isMobile() {
    return window.innerWidth <= 991;
  }

  isDesktop() {
    return window.innerWidth > 991;
  }

  blockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.add('blocked-scroll');
    } else {
      document.body.className += ' blocked-scroll';
    }
  }

  onMenuClick(ev: Event) {
    this.menuClick = true;

    if (
      this.inlineMenuActive[this.currentInlineMenuKey] &&
      !this.inlineMenuClick
    ) {
      this.inlineMenuActive[this.currentInlineMenuKey] = false;
    }
  }

  unblockBodyScroll(): void {
    if (document.body.classList) {
      document.body.classList.remove('blocked-scroll');
    } else {
      document.body.className = document.body.className.replace(
        new RegExp(
          '(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)',
          'gi'
        ),
        ' '
      );
    }
  }

  onMenuButtonClick(ev: Event) {
    this.menuActive = !this.menuActive;
    this.topbarMenuActive = false;
    this.topbarRightClick = true;
    this.menuClick = true;

    if (this.isDesktop()) {
      this.staticMenuDesktopInactive = !this.staticMenuDesktopInactive;
    } else {
      this.mobileMenuActive = !this.mobileMenuActive;
      if (this.mobileMenuActive) {
        this.blockBodyScroll();
      } else {
        this.unblockBodyScroll();
      }
    }

    ev.preventDefault();
  }

  onTopbarMobileButtonClick(ev: Event) {
    this.mobileTopbarActive = !this.mobileTopbarActive;
    ev.preventDefault();
  }

  onTopbarItemClick(ev: Event, item: string) {
    this.topbarItemClick = true;

    if (this.activeTopbarItem === item) {
      this.activeTopbarItem = '';
    } else {
      this.activeTopbarItem = item;
    }

    if (item === 'search') {
      this.search = !this.search;
      this.searchClick = !this.searchClick;
    }

    ev.preventDefault();
  }

  onSearchKeydown(ev: any) {
    if (ev.keyCode === 27) {
      this.search = false;
    }
  }

  onRightMenuButtonClick(ev: Event) {
    this.rightMenuActive = !this.rightMenuActive;
    ev.preventDefault();
  }

  onRippleChange(ev: any) {
    this.app.ripple = ev.checked;
    this.primengConfig.ripple = ev.checked;
  }

  onRTLChange(event: any) {
    this.app.isRTL = event.checked;
  }

  onInlineMenuClick(event: Event, key: any) {
    if (key !== this.currentInlineMenuKey) {
      this.inlineMenuActive[this.currentInlineMenuKey] = false;
    }

    this.inlineMenuActive[key] = !this.inlineMenuActive[key];
    this.currentInlineMenuKey = key;
    this.inlineMenuClick = true;
  }

  //

  logout(): void {
    this.authService.logout();
  }

  addTab(tab: Tab) {
    this.newTab = tab;
  }

  // getTopMenu(): MenuItem[] {
  //   return [
  //     {
  //       title: this.translateService.instant('common.show_menu'),
  //       icon: 'pi pi-align-justify',
  //       command: () => {
  //         this.visibleMenu = true;
  //       },
  //     },
  //   ];
  // }

  // private setTimer(): void {
  //   const source = timer(2000, 5000);
  //   source.subscribe((val) => {
  //     if (!this.authService.checkLastActivity()) {
  //       this.authService.logout();
  //     }
  //   });
  // }

  // changeStateDisplaySidebar(): void {
  //   this.visibleMenu = false;
  // }

  // getClientNodes(): void {
  //   this.clientNodes = [
  //     {
  //       label: 'Orlen',
  //       data: 'Orlen',
  //       expandedIcon: 'pi pi-folder-open',
  //       collapsedIcon: 'pi pi-folder',
  //       children: [
  //         {
  //           label: 'PTA Włocławek',
  //           data: '1',
  //           collapsedIcon: 'pi pi-file',
  //           key: '1',
  //         },
  //         {
  //           label: 'CCGT Płock',
  //           data: '2',
  //           collapsedIcon: 'pi pi-file',
  //           key: '2',
  //         },
  //         {
  //           label: 'CCGT Włocławek',
  //           data: '3',
  //           collapsedIcon: 'pi pi-file',
  //           key: '3',
  //         },
  //         {
  //           label: 'EC PŁOCK',
  //           data: '4',
  //           collapsedIcon: 'pi pi-file',
  //           key: '4',
  //         },
  //       ],
  //     },
  //     {
  //       label: 'NGK',
  //       data: 'NGK',
  //       expandedIcon: 'pi pi-folder-open',
  //       collapsedIcon: 'pi pi-folder',
  //       children: [
  //         {
  //           label: 'NGK Gliwice',
  //           data: '5',
  //           collapsedIcon: 'pi pi-file',
  //           key: '3',
  //         },
  //         {
  //           label: 'NGK Dąbrowa Górnicza',
  //           data: '6',
  //           collapsedIcon: 'pi pi-file',
  //           key: '6',
  //         },
  //       ],
  //     },
  //   ];
  // }
}
