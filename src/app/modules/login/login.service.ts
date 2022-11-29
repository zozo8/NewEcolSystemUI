import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { sha512 } from 'js-sha512';
import { Observable, Subject } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { authenticatePath, loginToURPath } from 'src/app/services/path';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth/auth.service';
import Login from './interfaces/login.model';
import { LoginCredentialMD } from './interfaces/UR/loginCredentialMD.model';
import { ResponseLoginUR } from './interfaces/UR/responseLoginUr.model';
import {
  saveLoginObject,
  saveTokenExp,
  saveTokenUr,
} from './state/login.actions';
import { getLanguage } from './state/login.selector';
import { LoginState } from './state/loginState';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  loginToUR(obj: Login): Observable<ResponseLoginUR> {
    // this.loginStore.dispatch(clearTokens());

    const loginObjUR: LoginCredentialMD = this.getLoginObjUR(obj);
    return this.http.post<ResponseLoginUR>(
      environment.endpointLoginUR + loginToURPath(),
      loginObjUR
    );
  }

  authenticate(obj: ResponseLoginUR): Observable<boolean> {
    const resBs = new Subject<boolean>();

    this.store.dispatch(saveTokenUr({ token: obj.accessToken.value }));
    this.http
      .get<LoginState>(environment.endpointApiPath + authenticatePath())
      .subscribe({
        next: (res: LoginState) => {
          this.setLoginStateStore(res);
        },
        error: (err: string) => {
          resBs.next(false);
        },
        complete: () => {
          this.authService.setLastActivity();
          this.router.navigate(['/dashboard']);
          resBs.next(true);
        },
      });

    return resBs;
  }

  setLoginStateStore(res: LoginState): void {
    this.store.dispatch(saveLoginObject({ obj: res }));
    this.decodateToken(res);
  }

  private getLoginObjUR(obj: Login): LoginCredentialMD {
    let res: LoginCredentialMD = {
      app: environment.urApp,
      hashName: environment.urHashName,
      hashedPassword: this.getHashedPassword(obj.password),
      login: obj.userName,
      instance: environment.urInstance,
    };

    return res;
  }

  decodateToken(res: LoginState): void {
    const decodate = JSON.parse(window.atob(res.token.split('.')[1]));
    this.store.dispatch(saveTokenExp({ exp: decodate.exp }));
    const rights: string[] =
      decodate['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    // const admin = rights.filter((x) => x.includes('Administrator')); // do zmiany
  }

  getHashedPassword(password: string): string {
    let arrayBuffer: ArrayBuffer = sha512.update(password).arrayBuffer();
    let buffer: Buffer = Buffer.from(arrayBuffer);
    let res: string = buffer.toString('base64');
    return res;
  }

  getCultureInfo(): string {
    let ret: string;
    const ln = this.commonService.getValueFromObservable(
      this.store.select(getLanguage)
    );

    switch (ln) {
      case 'pl':
        ret = 'pl-PL';
        break;
      case 'en':
        ret = 'en-GB';
        break;
      default:
        ret = 'pl-PL';
        break;
    }

    return ret;
  }
}
