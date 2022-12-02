import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, timer } from 'rxjs';
import Login from './interfaces/login.model';
import { ResponseLoginUR } from './interfaces/UR/responseLoginUr.model';
import { LoginService } from './login.service';
import { setLanguage } from './state/login.actions';
import { LoginState } from './state/loginState';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('showContentTrigger', [
      state(
        'hide',
        style({
          opacity: '0',
        })
      ),
      state(
        'show',
        style({
          color: 'white',
          opacity: '1',
        })
      ),
      transition('hide=>show', [animate('1s ease-out')]),
    ]),
    trigger('showAdvTrigger', [
      state(
        'startShowAdv',
        style({
          textAlign: 'right',
          opacity: '0',
        })
      ),
      state(
        'endShowAdv',
        style({
          textAlign: 'center',
          opacity: '0.5',
          paddingRight: '40px',
        })
      ),
      transition('startShowAdv=>endShowAdv', [animate('1s ease-out')]),
    ]),
    trigger('hideAdvTrigger', [
      state(
        'startHideAdv',
        style({
          opacity: '1',
        })
      ),
      state(
        'endHideAdv',
        style({
          opacity: '0',
        })
      ),
      transition('startHideAdv=>endHideAdv', [animate('1.5s ease-in')]),
    ]),
  ],
})
export class LoginComponent implements OnInit, OnDestroy {
  loading: boolean;
  errorText: string;
  panelTitle: string;
  showContent: boolean;
  showAdv: boolean[] = [false, false, false, false];
  hideAdvs: boolean;
  private compsiteSubs = new Subscription();

  constructor(
    private loginService: LoginService,
    private translateService: TranslateService,
    private store: Store<LoginState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.startAnimations();
  }

  startAnimations() {
    timer(1500).subscribe(() => (this.showContent = !this.showContent));
    timer(2000).subscribe(() => (this.showAdv[0] = true));
    timer(2300).subscribe(() => (this.showAdv[1] = true));
    timer(2600).subscribe(() => (this.showAdv[2] = true));
    timer(2900).subscribe(() => (this.showAdv[3] = true));
  }

  loginObj: Login = {
    password: '',
    userName: '',
  };

  login(): void {
    this.hideAdvs = true;
    this.loading = true;
    this.errorText = '';
    timer(1000).subscribe(() => {
      this.compsiteSubs.add(
        this.loginService.loginToUR(this.loginObj).subscribe({
          next: (res: ResponseLoginUR) => {
            this.compsiteSubs.add(
              this.loginService.authenticate(res).subscribe({
                next: (resAuth: boolean) => {
                  if (resAuth === true) {
                    this.router.navigate(['/dashboard']);
                  } else {
                    this.printErrorMessage();
                  }
                },
              })
            );
          },
          complete: () => {
            this.loading = false;
          },
          error: (er: Error) => {
            this.printErrorMessage();
          },
        })
      );
    });
  }

  printErrorMessage() {
    this.loading = false;
    this.hideAdvs = false;
    this.errorText = this.translateService.instant('pages.login.error');
  }

  setLanguage(ln: string): void {
    this.store.dispatch(setLanguage({ language: ln }));
    this.translateService.use(ln);
  }

  ngOnDestroy(): void {
    this.compsiteSubs.unsubscribe();
  }
}
