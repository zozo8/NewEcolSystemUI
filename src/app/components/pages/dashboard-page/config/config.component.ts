import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import {
  setConfigComponentMode,
  setConfigLayout,
  setConfigMenuColor,
  setConfigScale,
  setConfigTopbarMode,
} from 'src/app/modules/login/state/login.actions';
import { LoginState } from 'src/app/modules/login/state/loginState';
import { DashboardPageComponent } from '../dashboard-page.component';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
})
export class ConfigComponent implements OnInit {
  scale = 14;
  scales: number[] = [12, 13, 14, 15, 16];
  themes: any[];
  menuThemes: any[];
  menuTheme = 'light';
  topbarThemes: any[];
  topbarTheme = 'blue';
  theme = 'indigo';
  matchingMenuTheme = false;
  matchingTopbarTheme = false;
  selectedMenuTheme: any;
  selectedTopbarTheme: any;
  configActive = false;
  isInputBackgroundChanged = false;

  theme_customization: string;

  constructor(
    public app: AppComponent,
    public dashboard: DashboardPageComponent,
    private translate: TranslateService,
    private store: Store<LoginState>
  ) {}

  ngOnInit(): void {
    this.theme_customization = this.translate.instant(
      'layout.theme_customization'
    );
    this.themes = [
      { name: 'indigo', color: '#3F51B5' },
      { name: 'pink', color: '#E91E63' },
      { name: 'purple', color: '#9C27B0' },
      { name: 'deeppurple', color: '#673AB7' },
      { name: 'blue', color: '#2196F3' },
      { name: 'lightblue', color: '#03A9F4' },
      { name: 'cyan', color: '#00BCD4' },
      { name: 'teal', color: '#009688' },
      { name: 'green', color: '#4CAF50' },
      { name: 'lightgreen', color: '#8BC34A' },
      { name: 'lime', color: '#CDDC39' },
      { name: 'yellow', color: '#FFEB3B' },
      { name: 'amber', color: '#FFC107' },
      { name: 'orange', color: '#FF9800' },
      { name: 'deeporange', color: '#FF5722' },
      { name: 'brown', color: '#795548' },
      { name: 'bluegrey', color: '#607D8B' },
    ];

    this.menuThemes = [
      { name: 'light', color: '#FDFEFF' },
      { name: 'dark', color: '#434B54' },
      { name: 'indigo', color: '#1A237E' },
      { name: 'bluegrey', color: '#37474F' },
      { name: 'brown', color: '#4E342E' },
      { name: 'cyan', color: '#006064' },
      { name: 'green', color: '#2E7D32' },
      { name: 'deeppurple', color: '#4527A0' },
      { name: 'deeporange', color: '#BF360C' },
      { name: 'pink', color: '#880E4F' },
      { name: 'purple', color: '#6A1B9A' },
      { name: 'teal', color: '#00695C' },
    ];

    this.topbarThemes = [
      { name: 'lightblue', color: '#2E88FF' },
      { name: 'dark', color: '#363636' },
      { name: 'white', color: '#FDFEFF' },
      { name: 'blue', color: '#1565C0' },
      { name: 'deeppurple', color: '#4527A0' },
      { name: 'purple', color: '#6A1B9A' },
      { name: 'pink', color: '#AD1457' },
      { name: 'cyan', color: '#0097A7' },
      { name: 'teal', color: '#00796B' },
      { name: 'green', color: '#43A047' },
      { name: 'lightgreen', color: '#689F38' },
      { name: 'lime', color: '#AFB42B' },
      { name: 'yellow', color: '#FBC02D' },
      { name: 'amber', color: '#FFA000' },
      { name: 'orange', color: '#FB8C00' },
      { name: 'deeporange', color: '#D84315' },
      { name: 'brown', color: '#5D4037' },
      { name: 'grey', color: '#616161' },
      { name: 'bluegrey', color: '#546E7A' },
      { name: 'indigo', color: '#3F51B5' },
    ];

    this.selectedMenuTheme = this.menuThemes.find(
      (theme) => theme.name === this.menuTheme
    );
    this.selectedTopbarTheme = this.topbarThemes.find(
      (theme) => theme.name === this.topbarTheme
    );
  }

  decrementScale() {
    this.scale--;
    this.applyScale();
  }

  incrementScale() {
    this.scale++;
    this.applyScale();
  }

  applyScale() {
    this.store.dispatch(setConfigScale({ val: this.scale }));
    document.documentElement.style.fontSize = this.scale + 'px';
  }

  onInputStyleClick() {
    this.isInputBackgroundChanged = true;
  }

  onLayoutModeChange(ev: Event, mode: string) {
    const appLogoLink: HTMLImageElement = document.getElementById(
      'app-logo'
    ) as HTMLImageElement;
    this.app.layoutMode = mode;
    this.store.dispatch(setConfigLayout({ val: mode }));

    if (!this.isInputBackgroundChanged) {
      this.app.inputStyle = mode === 'dark' ? 'filled' : 'outlined';
    }

    if (mode === 'dark') {
      this.app.menuTheme = 'dark';
      this.app.topbarTheme = 'dark';
      appLogoLink.src = 'assets/images/logo_b.png';
    } else {
      this.app.menuTheme = 'light';
      this.app.topbarTheme = 'blue';
      appLogoLink.src = 'assets/images/logo.png';
    }

    const layoutLink: HTMLLinkElement = document.getElementById(
      'layout-css'
    ) as HTMLLinkElement;
    const layoutHref =
      'assets/layout/css/layout-' + this.app.layoutMode + '.css';
    this.replaceLink(layoutLink, layoutHref);

    const themeLink = document.getElementById('theme-css');
    const urlTokens = themeLink?.getAttribute('href')?.split('/');
    if (urlTokens) {
      urlTokens[urlTokens.length - 1] = 'theme-' + this.app.layoutMode + '.css';
      const newURL = urlTokens.join('/');

      this.replaceLink(themeLink, newURL, this.dashboard['refreshChart']);
    }
  }

  changeTheme(theme: string) {
    this.theme = theme;
    this.store.dispatch(setConfigComponentMode({ val: theme }));
    const themeLink: HTMLLinkElement = document.getElementById(
      'theme-css'
    ) as HTMLLinkElement;
    const themeHref =
      'assets/theme/' + theme + '/theme-' + this.app.layoutMode + '.css';
    this.replaceLink(themeLink, themeHref);
  }

  changeMenuTheme(theme: any) {
    this.selectedMenuTheme = theme;
    this.app.menuTheme = theme.name;
    this.store.dispatch(setConfigMenuColor({ val: theme.name }));
  }

  changeTopbarTheme(theme: any) {
    this.selectedTopbarTheme = theme;
    this.app.topbarTheme = theme.name;
    this.store.dispatch(setConfigTopbarMode({ val: theme.name }));

    const appLogoLink: HTMLImageElement = document.getElementById(
      'app-logo'
    ) as HTMLImageElement;

    if (
      theme.name === 'white' ||
      theme.name === 'yellow' ||
      theme.name === 'amber' ||
      theme.name === 'orange' ||
      theme.name === 'lime'
    ) {
      appLogoLink.src = 'assets/images/logo.png';
    } else {
      appLogoLink.src = 'assets/images/logo_b.png';
    }
  }

  isIE() {
    return /(MSIE|Trident\/|Edge\/)/i.test(window.navigator.userAgent);
  }

  replaceLink(linkElement: any, href: any, callback?: any) {
    if (this.isIE()) {
      linkElement.setAttribute('href', href);
      if (callback) {
        callback();
      }
    } else {
      const id = linkElement.getAttribute('id');
      const cloneLinkElement = linkElement.cloneNode(true);

      cloneLinkElement.setAttribute('href', href);
      cloneLinkElement.setAttribute('id', id + '-clone');

      linkElement.parentNode.insertBefore(
        cloneLinkElement,
        linkElement.nextSibling
      );

      cloneLinkElement.addEventListener('load', () => {
        linkElement.remove();
        cloneLinkElement.setAttribute('id', id);

        if (callback) {
          callback();
        }
      });
    }
  }
}
