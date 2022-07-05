import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Login } from '../models/login.model';
import { LoginCredentialMD } from '../models/UR/loginCredentialMD.model';
import { endpointLoginUR } from '../shared/global';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http:HttpClient
  ) { }

  loginToUR(obj:Login):Observable<any>{
    let loginObjUR = this.getLoginObjUR(obj);

    const newHeaders = new HttpHeaders();
        newHeaders.append('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
        newHeaders.append('Access-Control-Allow-Methods', 'POST');
        newHeaders.append('Access-Control-Allow-Origin', '*');
        newHeaders.append('Access-Control-Allow-Credentials', 'true');
        newHeaders.append('Content-Type', 'application/json; charset=UTF-8');

    return this.http
            .post<any>(endpointLoginUR,loginObjUR, {headers:newHeaders})
            .pipe(tap(console.log))
  }

  getLoginObjUR(obj: Login):LoginCredentialMD {
    let res:LoginCredentialMD = {
      app:"AO",
      hashName:"Sha512",
      hashedPassword:"rH0zZd42dwpfDhG1OUp53iWCP2ptcMhVAZ5tdiy9zVIZ23NteMGMJOm1KVT0DbvXf+/fOmH2TK6Pq+/OnOsWfw==",
      login:obj.userName,
      instance:"Prod"
    }

    return res;
  }
}


