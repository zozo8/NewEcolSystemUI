import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpHeaders,
  HttpClient
} from "@angular/common/http";
import { BehaviorSubject, catchError, filter, Observable, switchMap, take,tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ResponseLoginApi } from "../modules/login/interfaces/responseLoginApi.model";
import { LoginService } from "../modules/login/login.service";
import { environment } from "src/environments/environment";


@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  isRefreshingToken = false;
  tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private authService:AuthService,
    private loginService:LoginService,
    private http:HttpClient
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
  const tokenUR = localStorage.getItem("tokenUR");
  const token = localStorage.getItem("token");
  this.authService.isExpired();
  console.log("interceptpor wejscie")

    if(!tokenUR) {
      return next.handle(request);
    } else if (tokenUR && !token) {
        request = this.applyToken(request, tokenUR);
        return next.handle(request);
     } else {
      console.log("tokeny ma, wykonanie zapytania");
        this.authService.setLastActivity();
        request = this.applyToken(request, token??"");
        return next.handle(request).pipe(
          catchError((err:any)=> {
            if (err instanceof HttpErrorResponse && err.status === 401) {
              return this.refreshToken(request, next);
            } else {
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

      return this.refreshTokenApi().pipe(
        switchMap((res: ResponseLoginApi) => {
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
    console.log("dodanie tokena",token);
    return req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
     });
  }

  refreshTokenApi(): Observable<ResponseLoginApi> {
    let refreshToken = localStorage.getItem("refreshToken")??"";
    const httpOptions = {
      headers: new HttpHeaders({
        "RefreshToken":refreshToken
      })
    };

    return this.http.post<ResponseLoginApi>(environment.endpointApiPath+"/Home/RefreshToken",null,httpOptions)
              .pipe(tap((res:ResponseLoginApi)=> {
                this.loginService.setLocalStorageUserData(res);
              }));

  }

}
