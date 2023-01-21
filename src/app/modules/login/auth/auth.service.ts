import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, Subscription } from 'rxjs';
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

  private lastActivityCheckState$ = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {
    this.compsiteSub.add(
      this.store
        .select(getLastActivity)
        .pipe(
          map((lastActivity) => Number.parseInt(lastActivity.toString())),
          map((lastActivity) => new Date().getTime() > lastActivity)
        )
        .subscribe(this.lastActivityCheckState$)
    );
  }

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

  // W sumie tak to bym zrobił w obrębie tego pliku, ale jeszcze lepiej byłoby to
  // zaszyć jako selector w store i nie robić redundancji z behaviour subject.
  // Można też użyć observable w samym guardzie - co byłoby lepszą opcją (bo skoro robimy reactive app, to wszystko powinno być reactive)
  checkLastActivity = () => this.lastActivityCheckState$.getValue();

  // checkLastActivity(): boolean {
  //   const ret = new BehaviorSubject<boolean>(false);
  //   // starajmy się jak najwięcej wrzucać do .pipe(map/filter)

  //   this.compsiteSub.add(
  //     this.store.select(getLastActivity).subscribe({
  //       next: (res: number) => {
  //         const actualDate = new Date().getTime();
  //         const lastActivity = Number.parseInt(res.toString());
  //         if (actualDate > lastActivity) {
  //           ret.next(false);
  //         } else {
  //           ret.next(true);
  //         }
  //       },
  //     })
  //   );

  //   this.compsiteSub.add(
  //   );
  //   return ret.getValue();

  //   // do zmiany wg review
  //   // const actualDate = new Date().getTime();
  //   // let lastAct: number = this.commonService.getValueFromObservable(
  //   //   this.store.select(getLastActivity)
  //   // );
  //   // if (lastAct) {
  //   //   let lastActivity = Number.parseInt(lastAct.toString());
  //   //   if (actualDate > lastActivity) {
  //   //     return false;
  //   //   } else {
  //   //     return true;
  //   //   }
  //   // } else {
  //   //   return false;
  //   // }
  // }
}
