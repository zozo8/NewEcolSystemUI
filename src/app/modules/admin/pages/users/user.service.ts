import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { FilterColumnName } from "src/app/models/requests/filterColumnName.model";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class UserService {

  constructor(
    private http:HttpClient
  ) { }

  getUsers():Observable<RequestBodyGetList> {
    let requestObj = this.getRequestObj();
    return this.http.post<RequestBodyGetList>(environment.endpointApiPath+"/api/Users/GetUsers/Get",requestObj);
  }

  private getRequestObj():RequestBodyGetList {
    let filtersColumnName:FilterColumnName[] = [
      {
        filters:[],
        columnName:"Id",
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
