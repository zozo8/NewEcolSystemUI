import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { clearTokens, setLastActivity } from '../state/login.actions';
import { getLastActivity, getTokenExp } from '../state/login.selector';
import { LoginState } from '../state/loginState';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loginObj: LoginState;
  compsiteSub = new Subscription();

  constructor(
    private router: Router,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  logout(): void {
    this.store.dispatch(clearTokens());
    localStorage.clear();
    this.router.navigate(['/']);
  }

  isExpired(): boolean {
    //do zmiany wg opisu z review
    const exp = this.commonService.getValueFromObservable(
      this.store.select(getTokenExp)
    );
    const actualDate = (new Date().getTime() + 1) / 1000;
    return exp >= actualDate;
  }

  setLastActivity(): void {
    const date = new Date().getTime() + 10 * 60000;
    this.store.dispatch(setLastActivity({ val: date }));
  }

  checkLastActivity(): boolean {
    var ret = new BehaviorSubject<boolean>(false);
    this.compsiteSub.add(
      this.store.select(getLastActivity).subscribe({
        next: (res: number) => {
          const actualDate = new Date().getTime();
          const lastActivity = Number.parseInt(res.toString());
          if (actualDate > lastActivity) {
            ret.next(false);
          } else {
            ret.next(true);
          }
        },
      })
    );
    return ret.getValue();

    // do zmiany wg review
    // const actualDate = new Date().getTime();
    // let lastAct: number = this.commonService.getValueFromObservable(
    //   this.store.select(getLastActivity)
    // );
    // if (lastAct) {
    //   let lastActivity = Number.parseInt(lastAct.toString());
    //   if (actualDate > lastActivity) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // } else {
    //   return false;
    // }
  }
}
