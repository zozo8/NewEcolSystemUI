import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { clearTokens } from '../state/login.actions';
import { getTokenExp } from '../state/login.selector';
import { LoginState } from '../state/loginState.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginObj: LoginState;
  loginObjSub: Subscription;

  constructor(
    private router: Router,
    private loginStore: Store<LoginState>,
    private commonService: CommonService
  ) {}

  logout(): void {
    let ln: string = localStorage.getItem('language') ?? 'pl';
    localStorage.clear();
    this.loginStore.dispatch(clearTokens());
    localStorage.setItem('language', ln);
    this.router.navigate(['/']);
  }

  isExpired(): boolean {
    //do zmiany wg opisu z review
    // const exp = parseInt(localStorage.getItem('tokenExp') ?? '');
    const exp = this.commonService.getValueFromObservable(
      this.loginStore.select(getTokenExp)
    );
    const actualDate = (new Date().getTime() + 1) / 1000;
    //console.log("exp: " + exp + " actualDate:" + actualDate + " różnica: " + (exp - actualDate).toString());
    return exp >= actualDate;
  }

  setLastActivity(): void {
    const date = new Date().getTime() + 10 * 60000;
    localStorage.setItem('lastActivity', date.toString());
  }

  checkLastActivity(): boolean {
    // do zmiany wg review
    const actualDate = new Date().getTime();
    let lastAct = localStorage.getItem('lastActivity');
    if (lastAct) {
      let lastActivity = Number.parseInt(lastAct);
      if (actualDate > lastActivity) {
        return false;
      } else {
        return true;
      }
    } else {
      return false;
    }

    // const token = this.commonService.getValueFromObservable(
    //   this.loginStore.select(getToken)
    // );

    // const res = (token ?? '') !== '' ? true : false;
    // return res;
  }
}
