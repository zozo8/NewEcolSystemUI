import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from "@angular/common/http";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ResponseLoginApi } from "../modules/login/interfaces/responseLoginApi.model";
import { LoginService } from "../modules/login/login.service";

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private authService:AuthService,
    private loginService:LoginService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("interceptor");
  const tokenUR = localStorage.getItem("tokenUR");
  const token = localStorage.getItem("token");
  this.authService.isExpired();

    if(!tokenUR) {
      return next.handle(request);
    } else if (tokenUR && !token) {
        request = this.applyToken(request, tokenUR);
        return next.handle(request);
     } else {
        console.log("Zwykłe zapytanie");
        request = this.applyToken(request, token??"");
        return next.handle(request).pipe(
          catchError((err:any)=> {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              return this.refreshToken(request, next);
            } else {
              //this.authService.logout();
              return next.handle(request);
            }
          })
        );
    }
  }


  refreshToken(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshingToken) {
      this.isRefreshingToken = true;
      this.tokenSubject.next("");
      console.log("odświeżenie tokenu!");

      return this.authService.refreshToken().pipe(
        switchMap((res: ResponseLoginApi) => {
          this.loginService.setLocalStorageUserData(res);
          this.isRefreshingToken = false;
          this.tokenSubject.next(res.token);
          return next.handle(this.applyToken(request, res.token));
        })
      );
    } else {
      return this.tokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          return next.handle(this.applyToken(request, jwt));
        })
      );
    }
  }

  applyToken(req: any, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
     });
  }

}
