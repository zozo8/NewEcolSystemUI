import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { BehaviorSubject, observable, Observable, of, Subject, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RequestBodyGetList } from '../models/requests/requestBodyGetList.model';
import { RequestGridDataColumn } from '../models/requests/requestGridDataColumn.model';
import { RequestGridDataColumnValue } from '../models/requests/requestGridDataColumnValue.model';
import { ResponseBodyGetList } from '../models/responses/responseBodyGetList.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService<T> {


  returnList:T[];

  constructor(
    private http:HttpClient
  ) { }

  // get request from api for default params or dynamic params from universal table component (ev)
  getRequestObj(columns:RequestGridDataColumnValue[], ev?:LazyLoadEvent):RequestBodyGetList {
    console.log("start ev",ev, columns);
    if(ev === undefined) {
      return this.getStartFilterObj(columns);
    } else {
      let obj:RequestBodyGetList = {
        pageNumber:(ev.first??0)/10+1,
        pageSize:ev?.rows,
        order:{
          columnName:ev?.sortField ?? "id",
          isAscending:(ev?.sortOrder === 1)?false:true
        },
        filter:{
          filters:this.getFilters(ev,columns)
        }
      };

      console.log("end ev",obj);
      return obj;
    }

   }

   private getFilters(ev:LazyLoadEvent,columns:RequestGridDataColumnValue[] ): RequestGridDataColumnValue[] {
    var res:RequestGridDataColumnValue[];
    // columns.forEach(val=>{
    //    console.log("filters:",ev.filters![val.columnName]); // dokonczyc, trzeba jakos dobrac sie do filtrów i je przeslac dalej
    // });
    return columns;
  }

   private getStartFilterObj(columns:RequestGridDataColumnValue[]): RequestBodyGetList {
    let obj:RequestBodyGetList = {
      pageNumber:1,
      pageSize:10,
      order:{
        columnName:"id",
        isAscending:true
      },
      filter:{
        filters:columns
      }
    };
    return obj;
  }

    // get response for table from api
  getResponseObj(requestPath:string, requestObj:RequestBodyGetList):Observable<ResponseBodyGetList> {
    return this.http.post<ResponseBodyGetList>(environment.endpointApiPath+requestPath,requestObj);
  }

    // get column list for grid
  getColumns(path:string):Observable<RequestGridDataColumn> {
    return this.http.get<RequestGridDataColumn>(environment.endpointApiPath+path);
  }



  getList(path:string, columnPath:string):Observable<T[]>{
  var requestBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:100000});
  var resBS = new Subject<T[]>();
  var columns:RequestGridDataColumnValue[];

   this.getColumns(columnPath).subscribe({
    next:(res:RequestGridDataColumn)=>{
      columns = res.value
    },
    complete:()=>{
       let requestObj = this.getRequestObj(columns);
       requestBS.next(requestObj);

    }
   });

   requestBS.subscribe((req)=>{
    if(req.pageNumber!== 100000){
      this.getResponseObj(path,req).subscribe({
        next:(res:ResponseBodyGetList)=>{
          this.returnList = res.value.data;
        },
        complete:()=>{
          resBS.next(this.returnList);
        }
       });
    }
   })

   return resBS.asObservable();
  }

  getMenuItemList(list: Observable<T[]>,id: string, name: string): MenuItem[] {
    let res:MenuItem[];
    list.subscribe({
      next:(l)=>{
        type ObjectKey = keyof typeof l;
        const idd = id as ObjectKey;
        const namee = name as ObjectKey;
        console.log("neeext",l[idd],l[namee]);
      }
    })


    return [];
  }

}
