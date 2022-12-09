import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  BehaviorSubject,
  catchError,
  filter,
  Observable,
  switchMap,
  take,
  tap,
} from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { refreshTokenPath } from 'src/app/services/path';
import { environment } from 'src/environments/environment';
import { LoginService } from '../login.service';
import { getRefreshToken, getToken, getTokenUr } from '../state/login.selector';
import { LoginState } from '../state/loginState';
import { AuthService } from './auth.service';

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {
  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private http: HttpClient,
    private store: Store<LoginState>,
    private commonService: CommonService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const tokenUR = this.commonService.getValueFromObservable(
      this.store.select(getTokenUr)
    );
    const token = this.commonService.getValueFromObservable(
      this.store.select(getToken)
    );

    this.authService.isExpired();

    if (tokenUR === '') {
      return next.handle(request);
    } else if (tokenUR !== '' && token === '') {
      request = this.applyToken(request, tokenUR);
      return next.handle(request);
    } else {
      this.authService.setLastActivity();
      request = this.applyToken(request, token ?? '');
      return next.handle(request).pipe(
        catchError((err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            return this.refreshToken(request, next);
          } else {
            return next.handle(request);
          }
        })
      );
    }
  }

  private refreshToken(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next('');

      return this.refreshTokenApi().pipe(
        switchMap((res: LoginState) => {
          this.isRefreshingToken = false;
          this.tokenSubject.next(res.token);

          return next.handle(this.applyToken(request, res.token));
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((jwt) => {
          return next.handle(this.applyToken(request, jwt));
        })
      );
    }
  }

  private applyToken(req: any, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers
        .set('Authorization', 'Bearer ' + token)
        .set('Accept-Language', this.loginService.getCultureInfo()),
    });
  }

  private refreshTokenApi(): Observable<LoginState> {
    const refreshToken = this.commonService.getValueFromObservable(
      this.store.select(getRefreshToken)
    );
    const httpOptions = {
      headers: new HttpHeaders({
        RefreshToken: refreshToken,
      }),
    };

    return this.http
      .post<LoginState>(
        environment.endpointApiPath + refreshTokenPath,
        null,
        httpOptions
      )
      .pipe(
        tap((res: LoginState) => {
          this.loginService.setLoginStateStore(res);
        })
      );
  }
}
