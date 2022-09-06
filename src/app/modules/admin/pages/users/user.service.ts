import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(
    private http:HttpClient,
    private translateService:TranslateService
  ) { }




}
