import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FilterColumnName } from '../models/requests/filterColumnName.model';
import { RequestBodyGetList } from '../models/requests/requestBodyGetList.model';

@Injectable({
  providedIn: 'root'
})
export class MainpageService {

  constructor(
    private http:HttpClient
  ) { }


  getUsers():void{

    let filtersColumnName:FilterColumnName[] = [
      {
        filters:[],
        columnName:"Id",
        dataType:"Int"
      }
    ];

    let example:RequestBodyGetList = {
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

    this.http.post<any>(environment.endpointApiPath+"/api/Users/GetUsers/Get",example).subscribe({
      next:(res:any)=>{
        console.log(res)
      },
      error:(err:Error)=>{
        console.error(err)
      }
    })
  }
}
