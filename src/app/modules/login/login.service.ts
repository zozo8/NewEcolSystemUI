import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { sha512 } from "js-sha512";
import { Observable, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { environment } from "src/environments/environment";
import Login from "./interfaces/login.model";
import { ResponseLoginApi } from "./interfaces/responseLoginApi.model";
import { LoginCredentialMD } from "./interfaces/UR/loginCredentialMD.model";
import { ResponseLoginUR } from "./interfaces/UR/responseLoginUr.model";

@Injectable({
  providedIn: "root"
})
export class LoginService {


  constructor(
    private http:HttpClient,
    private router:Router,
    private authService:AuthService
  ) { }


  loginToUR(obj:Login):Observable<ResponseLoginUR> {
    localStorage.removeItem("tokenUR");
    localStorage.removeItem("token");

    // const httpOption = {
    //   headers: new HttpHeaders({
    //     "Access-Control-Allow-Origin":"http://nes.ecol.com.pl"
    //   })
    // };

    let loginObjUR = this.getLoginObjUR(obj);
    return this.http.post<ResponseLoginUR>("/api/auth/login/",loginObjUR);
  }


  authenticate(obj: ResponseLoginUR):void {
    if(obj) {
        localStorage.setItem("tokenUR",obj.accessToken.value);

        this.http.get<ResponseLoginApi>(environment.endpointApiPath+"/Home/Authenticate")
        .subscribe({
          next:(res:ResponseLoginApi)=> {
            console.log("pobrany token: "+res.token);
            // console.log("pobrany refresh token: "+res.refreshToken);
            this.setLocalStorageUserData(res);
          },
          error:(err:string)=> {
            console.error("błąd pobierania z api:",err);
          },
          complete:()=> {
            this.authService.setLastActivity();
            this.router.navigate(["/dashboard/mainpage"]);
          }
        });
    }
  }

  private getLoginObjUR(obj: Login):LoginCredentialMD {

    let res:LoginCredentialMD = {
      app:"ES",
      hashName:"Sha512",
      hashedPassword:this.getHashedPassword(obj.password),
      login:obj.userName,
      instance:"ESW"
    };

    return res;
  }

  setLocalStorageUserData(res: ResponseLoginApi):void {
    localStorage.setItem("token",res.token);
    localStorage.setItem("refreshToken",res.refreshToken);
    localStorage.setItem("userId", res.id.toString());
    localStorage.setItem("userEmail", res.email);
    localStorage.setItem("userName", res.userName);

    this.decodateToken(res);
  }

  decodateToken(res: ResponseLoginApi):void {
    const decodate = JSON.parse(window.atob(res.token.split(".")[1]));
    localStorage.setItem("tokenExp", decodate.exp);
    const rights: string[] =  decodate["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (rights) {
      const admin  = rights.filter(x => x.includes("Administrator")); //do zmiany
      if (admin) {
        localStorage.setItem("admin", "true");
      }
    }
  }


  getHashedPassword(password: string):string {
    let arrayBuffer:ArrayBuffer = sha512.update(password).arrayBuffer();
    let buffer:Buffer = Buffer.from(arrayBuffer);
    let res:string = buffer.toString("base64");
    return res;
  }
}
