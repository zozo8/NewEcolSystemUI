import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, filter, Observable, Subject} from "rxjs";
import { environment } from "src/environments/environment";
import { Filter } from "../models/requests/filter.model";
import { RequestBodyGetList } from "../models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "../models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "../models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "../models/responses/responseBodyGetList.model";
import { TableService } from "../universalComponents/table/table.service";

@Injectable({
  providedIn: "root"
})
export class BaseService {
  returnList:any[];
  listMenuItem:MenuItem[]=[];

  constructor(
    private http:HttpClient,
    private tableService:TableService
  ) { }

  // get request from api for default params or dynamic params from universal table component (ev)
  getRequestObj(columns:RequestGridDataColumnValue[], ev?:LazyLoadEvent, pageSize?:number, filters?:Filter[]):RequestBodyGetList {
    if(ev === undefined) {
      return this.getStartFilterObj(columns, pageSize, filters);
    } else {
      let obj:RequestBodyGetList = {
        pageNumber:(ev.first??0)/10+1,
        pageSize:ev?.rows,
        order:{
          columnName:ev?.sortField ?? "id",
          isAscending:(ev?.sortOrder === 1)?false:true
        },
        filter:{
          filters:this.prepareFilters(columns,undefined,filters)
        }
      };
      return obj;
    }
   }

   private getStartFilterObj(columns:RequestGridDataColumnValue[], pageSize?:number, filter?:Filter[]): RequestBodyGetList {
    let obj:RequestBodyGetList = {
      pageNumber:1,
      pageSize:pageSize??10,
      order:{
        columnName:"id",
        isAscending:true
      },
      filter:{
        filters:this.prepareFilters(columns,undefined, filter)
      }
    };
    return obj;
  }

   private prepareFilters(columns:RequestGridDataColumnValue[],ev?:LazyLoadEvent, filters?:Filter[] ): RequestGridDataColumnValue[] {
    var res:RequestGridDataColumnValue[]=[];
    columns.forEach(val=> {
      let filterObj = filters?.find(x=>x.field === val.columnName);
      let filterCols:Filter[] = [];
      if(filterObj) {
        filterCols.push(filterObj);
      }

      res.push({
        filters:filterCols,
        columnName:val.columnName,
        dataType: this.tableService.getSepcificDataType4Api(val.dataType),
        displayName:val.columnName,
        isVisible:val.isVisible
      });
     //  console.log("filters:",ev.filters![val.columnName]); // dokonczyc, trzeba jakos dobrac sie do filtrów i je przeslac dalej
    });

    return res;
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
  getObservableList4path(path:string, columnPath:string, filters:Filter[]):Observable<any[]> {
  var requestBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:100000});
  var resBS = new Subject<any[]>();
  var columns:RequestGridDataColumnValue[];

   this.getColumns(columnPath).subscribe({
    next:(res:RequestGridDataColumn)=> {
      columns = res.value;
    },
    complete:()=> {
       let requestObj = this.getRequestObj(columns,undefined, 10000,filters);
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

  getMenuItemList(listPath:string, columnPath:string, id:string, label:string, filters:Filter[]):Observable<MenuItem[]> {
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
