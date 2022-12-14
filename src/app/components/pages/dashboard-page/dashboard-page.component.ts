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
import { MenuItem } from 'primeng/api';
import { Observable, Subscription, timer } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Tab } from 'src/app/models/tab.model';
import { AuthService } from 'src/app/modules/login/auth/auth.service';
import { setLanguage } from 'src/app/modules/login/state/login.actions';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { CommonService } from 'src/app/services/common.service';
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
  private newTabSub: Subscription;

  constructor(
    private authService: AuthService,
    private translateService: TranslateService,
    private store: Store<LoginState>,
    public app: AppComponent,
    public renderer: Renderer2,
    private menuService: MenuService,
    private commonService: CommonService
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

  setLanguage(ln: string): void {
    this.store.dispatch(setLanguage({ language: ln }));
    this.translateService.use(ln);
  }

  onInlineMenuClick(event: Event, key: any) {
    if (key !== this.currentInlineMenuKey) {
      this.inlineMenuActive[this.currentInlineMenuKey] = false;
    }

    this.inlineMenuActive[key] = !this.inlineMenuActive[key];
    this.currentInlineMenuKey = key;
    this.inlineMenuClick = true;
  }

  logout(): void {
    this.authService.logout();
  }

  openTab(name: string) {
    if (name) this.commonService.addTabToStore(name);
  }
}
