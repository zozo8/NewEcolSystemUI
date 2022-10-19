import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
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
      const exp = parseInt(localStorage.getItem("tokenExp")??"");
      const actualDate = (new Date().getTime() + 1) / 1000;
      //console.log("exp: " + exp + " actualDate:" + actualDate + " różnica: " + (exp - actualDate).toString());
      return exp>=actualDate;

    }

    return false;
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




