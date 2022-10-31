import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestBodyGetList } from '../models/requests/requestBodyGetList.model';
import { RequestGridDataColumn } from '../models/requests/requestGridDataColumn.model';
import { ResponseBodyById } from '../models/responses/responseBodyById.model';
import { ResponseBodyGetList } from '../models/responses/responseBodyGetList.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http:HttpClient
  ) { }

     // get response for table from api
     getResponseObj(requestPath:string, requestObj:RequestBodyGetList):Observable<ResponseBodyGetList> {
      return this.http.post<ResponseBodyGetList>(environment.endpointApiPath+requestPath,requestObj);
    }

    // getColumnsByGridId(gridId:number):Observable<RequestGridDataColumn> {
  //   //czy są zapisane dla usera, jak nie to startowe

  //   return this.http.get<RequestGridDataColumn>(environment.endpointApiPath+path);
  // }

  // get column list for grid
  getColumns(path:string):Observable<RequestGridDataColumn> {
    return this.http.get<RequestGridDataColumn>(environment.endpointApiPath+path);
  }

    // get obj by id
    getObjById(path:string):Observable<ResponseBodyById> {
      return this.http.get<ResponseBodyById>(environment.endpointApiPath+path);
    }
}
