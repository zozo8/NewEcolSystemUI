import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseLoginApi } from "../modules/login/interfaces/responseLoginApi.model";
import { LoginService } from "../modules/login/login.service";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private http:HttpClient,
    private router:Router,
    private loginService:LoginService
  ) { }

  logout():void {
    let ln:string = localStorage.getItem("language")??"pl";
    localStorage.clear();
    localStorage.setItem("language", ln);
    this.router.navigate(["/"]);
  }

  isExpired(): boolean {
    if (localStorage.getItem("tokenExp")) {
      const exp = parseInt(localStorage.getItem("tokenExp")??"");
      const actualDate = (new Date().getTime() + 1) / 1000;
      //console.log("exp: " + exp + " actualDate:" + actualDate + " różnica: " + (exp - actualDate).toString());
      return exp>=actualDate;

    }

    return false;
  }

  refreshToken(): Observable<ResponseLoginApi> {
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

  setLastActivity():void {
    const date = new Date().getTime() + (10 * 60000);
    localStorage.setItem("lastActivity", date.toString());
  }

  checkLastActivity(): boolean {
    const actualDate = new Date().getTime();
    let lastAct = localStorage.getItem("lastActivity");
    if(lastAct) {
      let lastActivity = Number.parseInt(lastAct);
      if (actualDate > lastActivity) {
        return false;
      }
      else {
        return true;
      }
    } else {
      return false;
    }
  }

}




