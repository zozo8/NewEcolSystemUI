import { HttpClient } from "@angular/common/http";
import { Injectable, SkipSelf } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { LazyLoadEvent } from "primeng/api";
import { Observable, tap } from "rxjs";
import { FilterColumnName } from "src/app/models/requests/filterColumnName.model";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
     private http:HttpClient
  ) { }

  getResponseObj(requestPath:string, requestObj:RequestBodyGetList):Observable<ResponseBodyGetList> {
   return this.http.post<ResponseBodyGetList>(environment.endpointApiPath+requestPath,requestObj);
  }

 getRequestObj(columns:RequestGridDataColumn, ev:LazyLoadEvent | null):RequestBodyGetList {

  console.log("lazyLoadEvent",ev);

  let obj:RequestBodyGetList = {
    pageNumber:1,
    pageSize:10,
    order:{
      columnName:"Id",
      isAscending:true
    },
    filter:{
      filters:columns.value
    }
  };
  return obj;

  }

  getFilterColumnName(path:string):Observable<RequestGridDataColumn> {
    return this.http.get<RequestGridDataColumn>(environment.endpointApiPath+path);
  }

}
