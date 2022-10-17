import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { FilterMetadata, LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, Observable, Subject} from "rxjs";
import { environment } from "src/environments/environment";
import { Filter } from "../models/requests/filter.model";
import { RequestBodyGetList } from "../models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "../models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "../models/requests/requestGridDataColumnValue.model";
import { ResponseBodyById } from "../models/responses/responseBodyById.model";
import { ResponseBodyGetList } from "../models/responses/responseBodyGetList.model";

@Injectable({
  providedIn: "root"
})
export class BaseService {

  returnList:any[];
  listMenuItem:MenuItem[]=[];

  constructor(
    private http:HttpClient
  ) { }

  // get request from api for default params or dynamic params from universal table component (ev)
  getRequestObj(columns:RequestGridDataColumnValue[], ev?:LazyLoadEvent, filters?:Filter[]):RequestBodyGetList {

    if(ev === undefined) {
      ev = {
        first:1,
        rows:10,
        sortField:"id",
        sortOrder:-1
      };
    } else {
       let first = ev.first??0;
       let rows = ev.rows??10;
       ev.first = (first/rows)+1;
    }

      let obj:RequestBodyGetList = {
        pageNumber:ev.first,
        pageSize:ev?.rows,
        order:{
          columnName:ev?.sortField ?? "id",
          isAscending:(ev?.sortOrder === 1)?false:true
        },
        filter:{
          filters:this.prepareFilters(columns,ev,filters)
        }
      };
      return obj;
   }


   private prepareFilters(columns:RequestGridDataColumnValue[],ev?:LazyLoadEvent, filters?:Filter[] ): RequestGridDataColumnValue[] {
    var res:RequestGridDataColumnValue[]=[];

    columns.forEach(val=> {
      // dla słownikaów
      let filterObj = filters?.find(x=>x.field === val.columnName);
      let filterCols:Filter[] = [];
      if(filterObj) {
        filterCols.push(filterObj);
      }

      // z tabelki
      if(ev?.filters !== undefined ){

            let metaData:FilterMetadata = ev?.filters![val.columnName];
            let filtersString = JSON.stringify(metaData);
            let filters:FilterMetadata[] = JSON.parse(filtersString);
            filters.forEach(el => {
              if(el.value !== null){
                filterCols.push({
                  comparision:el.matchMode,
                  value:el.value
                });
              }
            });
        }

      res.push({
        filters:filterCols,
        columnName:val.columnName,
        dataType: this.getSepcificDataType4Api(val.dataType),
        displayName:val.columnName,
        isVisible:val.isVisible
      });
    });

    return res;
  }

  getSepcificDataType4Api(val:string):string {
    switch (val) {
      case "boolean":
        return "Boolean";
      case "numeric":
        return "Int32";
      case "text":
        return "String";
      case "date":
        return "DateTime";
      default:
        return val;
    }
  }

  getSepcificDataType4PrimeNg(val:string):string {
    switch (val) {
      case "Boolean":
        return "boolean";
      case "Int":
        return "numeric";
      case "String":
        return "text";
      case "DateTime":
        return "date";
      default:
        return val;
    }
  }

    // get response for table from api
  getResponseObj(requestPath:string, requestObj:RequestBodyGetList):Observable<ResponseBodyGetList> {
    return this.http.post<ResponseBodyGetList>(environment.endpointApiPath+requestPath,requestObj);
  }

    // get column list for grid
  getColumns(path:string):Observable<RequestGridDataColumn> {
    return this.http.get<RequestGridDataColumn>(environment.endpointApiPath+path);
  }

  // get obj by id
  getObjById(path:string):Observable<ResponseBodyById> {
    return this.http.get<ResponseBodyById>(environment.endpointApiPath+path);
  }


// get list entity, get column and create request obj
  getObservableList4path(path:string, columnPath:string, filters?:Filter[]):Observable<any[]> {
  var requestBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:100000});
  var resBS = new Subject<any[]>();
  var columns:RequestGridDataColumnValue[];

   this.getColumns(columnPath).subscribe({
    next:(res:RequestGridDataColumn)=> {
      columns = res.value;
    },
    complete:()=> {
       let requestObj = this.getRequestObj(columns,undefined,filters);
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

  getMenuItemList(listPath:string, columnPath:string, id:string, label:string, filters?:Filter[]):Observable<MenuItem[]> {
    let list:MenuItem[]=[];
    let retBS = new Subject<MenuItem[]>();

    this.getObservableList4path(listPath,columnPath,filters).subscribe({
      next:(res:any[])=> {
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

  getFilter4request(prop:string, value:string, comparision:string):Filter{
    let obj:Filter = {
      field:prop,
      value:value,
      comparision:comparision
    };

    return obj;
  }

}
