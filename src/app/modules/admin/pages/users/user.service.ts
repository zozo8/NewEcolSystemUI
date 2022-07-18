import { HttpClient } from "@angular/common/http";
import { Injectable, SkipSelf } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, tap } from "rxjs";
import { FilterColumnName } from "src/app/models/requests/filterColumnName.model";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService{

  constructor(
     private http:HttpClient
  ) { }

  getData():Observable<ResponseBodyGetList> {
  let requestObj:RequestBodyGetList = this.getRequestObj();
   return this.http.post<ResponseBodyGetList>(environment.endpointApiPath+"/api/Users/GetUsers/Get",requestObj);

  }

 getRequestObj():RequestBodyGetList {
    let filtersColumnName:FilterColumnName[] = [
      {
        filters:[],
        columnName:"Id",
        dataType:"Int"
      },
      {
        filters:[],
        columnName:"UserName",
        dataType:"Int"
      },
      {
        filters:[],
        columnName:"userEmail",
        dataType:"Int"
      },
      {
        filters:[],
        columnName:"evaluationDate",
        dataType:"Int"
      }
    ];

    let obj:RequestBodyGetList = {
      pageNumber:1,
      pageSize:10,
      order:{
        columnName:"Id",
        isAscending:true
      },
      filter:{
        filters:filtersColumnName
      }
    };

    return obj;
  }


}
