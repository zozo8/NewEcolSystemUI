import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class AuthconfigInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
  const tokenUR = localStorage.getItem("tokenUR");
  const token = localStorage.getItem("token");

  console.log("tokenUR: "+tokenUR + " token:"+token);

    if(!tokenUR) {
      console.log("logowanie");
      return next.handle(request);
    } else if (tokenUR && !token) {
      console.log("autentykacja");
        request = this.applyToken(request, tokenUR);
        return next.handle(request);
    } else {
      if(token){
        console.log("normalne zapytanie do api");
        request = this.applyToken(request, token);
        return next.handle(request);
      } else{
        return next.handle(request);
      }

    }
  }

  applyToken(req: any, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set("Authorization", "Bearer " + token)
     });
  }

}
