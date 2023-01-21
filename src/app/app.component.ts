import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { PrimeNGConfig } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { AuthService } from './modules/login/auth/auth.service';
import { setLanguage } from './modules/login/state/login.actions';
import { getLanguage } from './modules/login/state/login.selector';
import { LoginState } from './modules/login/state/loginState';
import { CommonService } from './services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  topbarTheme = 'blue';
  menuTheme = 'light';
  layoutMode = 'dark';
  menuMode = 'static';
  inlineMenuPosition = 'bottom';
  inputStyle = 'filled';
  ripple = true;
  isRTL = false;

  constructor(
    private translateService: TranslateService,
    private primeNgConfig: PrimeNGConfig,
    private authService: AuthService,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  ngOnInit(): void {
    if (!this.authService.checkLastActivity()) {
      this.authService.logout();
    }

    // Tutaj podobnie jak wszędzie - z reactive powinniśmy przechodzić na statyczne w ostateczności,
    // nie jako reguła
    this.translateService.addLangs(environment.languages);
    let lan = this.commonService.getValueFromObservable(
      this.store.select(getLanguage)
    );

    if (lan) {
      this.translateService.use(lan);
    } else {
      lan = environment.languages[0];
      this.translateService.setDefaultLang(lan);
    }

    this.store.dispatch(setLanguage({ language: lan }));
    this.translateService.get('primeng').subscribe((res) => {
      this.primeNgConfig.setTranslation(res);
    });
  }
}
