import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ResponseLoginApi } from "../modules/login/interfaces/responseLoginApi.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {


  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  logout():void {
    let ln:string = localStorage.getItem("language")??"pl";
    localStorage.clear();
    localStorage.setItem("language", ln);
    this.router.navigate(["/"]);
  }

  isExpired(): boolean {
    if (localStorage.getItem("tokenExp")) {
      console.log("refreshToken",localStorage.getItem("refreshToken"));
      const exp = parseInt(localStorage.getItem("tokenExp")??"")-3000;
      const actualDate = (new Date().getTime() + 1) / 1000;
      console.log("exp: " + exp + " actualDate:" + actualDate + " różnica: " + (exp - actualDate).toString());
      if (exp >= actualDate) {
          return true;
      } else {
          return false;
      }
    }

    return false;
  }

  refreshToken(): Observable<ResponseLoginApi> {
    return this.http.post<ResponseLoginApi>(environment.endpointApiPath+"/Home/RefreshToken",null);

  }

}




