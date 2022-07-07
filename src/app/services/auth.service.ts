import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Login } from "../models/login.model";
import { LoginCredentialMD } from "../models/UR/loginCredentialMD.model";
import { ResponseLoginUR} from "../models/UR/responseLoginUr.model";
import { ResponseLoginApi } from "../models/user/responseLoginApi.model";
import { endpointApiPath} from "../shared/global";

@Injectable({
  providedIn: "root"
})
export class AuthService {

  constructor(
    private http:HttpClient,
    private router:Router
  ) { }

  loginToUR(obj:Login):Observable<ResponseLoginUR> {
    localStorage.removeItem("tokenUR");
    let loginObjUR = this.getLoginObjUR(obj);

    return this.http.post<ResponseLoginUR>("/api/auth/login",loginObjUR);
  }

  authenticate(obj: ResponseLoginUR) {
    if(obj) {
        localStorage.setItem("tokenUR",obj.accessToken.value);

        this.http.get<ResponseLoginApi>(endpointApiPath+"/Home/Authenticate")
        .subscribe({
          next:(res:ResponseLoginApi)=> {
            console.log("pobrany token: "+res.token);
            this.setLocalStorageUserData(res);
          },
          error:(err:string)=> {
            console.error("błąd pobierania z api:",err);
          },
          complete:()=> {
            this.router.navigate(["/dashboard/mainpage"]);
          }
        });
    }
  }

  setLocalStorageUserData(res: ResponseLoginApi) {
    localStorage.setItem("token",res.token);
    localStorage.setItem("refreshToken",res.refreshToken);
    localStorage.setItem("userId", res.id.toString());
    localStorage.setItem("userEmail", res.email);

    this.decodateToken(res);
  }

  decodateToken(res: ResponseLoginApi) {
    const decodate = JSON.parse(window.atob(res.token.split(".")[1]));
    localStorage.setItem("tokenExp", decodate.exp);
    const rights: string[] =  decodate["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    if (rights) {
      const admin  = rights.filter(x => x.includes("Administrator"));
      if (admin) {
        localStorage.setItem("admin", "true");
      }
    }
  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/"]);
  }


  private getLoginObjUR(obj: Login):LoginCredentialMD {
    let res:LoginCredentialMD = {
      app:"ES",
      hashName:"Sha512",
      hashedPassword:"rH0zZd42dwpfDhG1OUp53iWCP2ptcMhVAZ5tdiy9zVIZ23NteMGMJOm1KVT0DbvXf+/fOmH2TK6Pq+/OnOsWfw==",
      login:"ecol2",
      instance:"ESW"
    };

    return res;
  }

  isExpired(): boolean {
    if (localStorage.getItem("tokenExp")) {
      const exp = parseInt(localStorage.getItem("tokenExp")??"");
      const actualDate = (new Date().getTime() + 1) / 1000;
      console.log('exp: ' + exp + ' actualDate:' + actualDate + ' różnica: ' + (exp - actualDate).toString());
      if (exp >= actualDate) {
          return true;
      } else {
          return false;
      }
    }

    return false;
  }

}




