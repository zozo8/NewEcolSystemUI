import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestBodyGetList } from '../models/requests/requestBodyGetList.model';
import { ResponseBodyGetList } from '../models/responses/responseBodyGetList.model';
import { ResponseGridDataColumn } from '../models/responses/responseGridDataColumn.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  // get response with status code and data type any[]
  getResponseBodyGetList(
    requestPath: string,
    requestObj: RequestBodyGetList
  ): Observable<ResponseBodyGetList> {
    return this.http.post<ResponseBodyGetList>(
      environment.endpointApiPath + requestPath,
      requestObj
    );
  }

  // get column list for grid
  getColumns(path: string): Observable<ResponseGridDataColumn> {
    return this.http.get<ResponseGridDataColumn>(
      environment.endpointApiPath + path
    );
  }

  // common request GET
  getResponseByGet(path: string): Observable<any> {
    return this.http.get<any>(environment.endpointApiPath + path);
  }

  // common request POST
  getResponseByPost(path: string, postObj?: any): Observable<any> {
    return this.http.post<any>(environment.endpointApiPath + path, postObj);
  }

  // common request DELETE
  getResponseByDelete(path: string): Observable<any> {
    return this.http.delete(environment.endpointApiPath + path);
  }

  // common request PUT
  getResponseByPut(path: string, putObj: any): Observable<any> {
    return this.http.put(environment.endpointApiPath + path, putObj);
  }
}
