import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, observable, Observable, of, Subject, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { ParamDict } from "../models/dto/modules/admin/dictionary/paramDict";
import { RequestBodyGetList } from "../models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "../models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "../models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "../models/responses/responseBodyGetList.model";

@Injectable({
  providedIn: "root"
})
export class BaseService<T> {


  returnList:T[];
  listMenuItem:MenuItem[]=[];

  constructor(
    private http:HttpClient
  ) { }

  // get request from api for default params or dynamic params from universal table component (ev)
  getRequestObj(columns:RequestGridDataColumnValue[], ev?:LazyLoadEvent, pageSize?:number):RequestBodyGetList {
    if(ev === undefined) {
      return this.getStartFilterObj(columns, pageSize);
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

   private getStartFilterObj(columns:RequestGridDataColumnValue[], pageSize?:number): RequestBodyGetList {
    let obj:RequestBodyGetList = {
      pageNumber:1,
      pageSize:pageSize??10,
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


// get list entity, get column and create request obj
  getObservableList4path(path:string, columnPath:string):Observable<T[]> {
  var requestBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:100000});
  var resBS = new Subject<T[]>();
  var columns:RequestGridDataColumnValue[];

   this.getColumns(columnPath).subscribe({
    next:(res:RequestGridDataColumn)=> {
      columns = res.value;
    },
    complete:()=> {
       let requestObj = this.getRequestObj(columns,undefined, 10000);
       requestBS.next(requestObj);

    }
   });

   requestBS.subscribe((req)=> {
    if(req.pageNumber!== 100000) {
      this.getResponseObj(path,req).subscribe({
        next:(res:ResponseBodyGetList)=> {
          this.returnList = res.value.data;
        },
        complete:()=> {
          resBS.next(this.returnList);
        }
       });
    }
   });

   return resBS.asObservable();
  }

  getMenuItemList(listPath:string, columnPath:string, id:string, label:string):Observable<MenuItem[]> {
    let list:MenuItem[]=[];
    let retBS = new Subject<MenuItem[]>();

    this.getObservableList4path(listPath,columnPath).subscribe({
      next:(res:any[])=>{
        res.forEach(element => {
          list.push({
            id:element[id],
            label:element[label]
          });
        });
        retBS.next(list);
      }
    });

    return retBS.asObservable();
  }

}
