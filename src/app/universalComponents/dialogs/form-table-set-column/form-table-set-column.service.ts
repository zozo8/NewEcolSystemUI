import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MessageService } from "primeng/api";
import { Observable, Subject } from "rxjs";
import { ColumnSetting } from "src/app/models/requests/columnSetting.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyById } from "src/app/models/responses/responseBodyById.model";
import { PathService } from "src/app/services/path.service";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class FormTableSetColumnService {

  constructor(
    private http:HttpClient,
    private pathService:PathService
  ) { }

  setColumnByUserIdGridId(gridId: number, columns: RequestGridDataColumnValue[]):Observable<boolean> {
    var bs = new Subject<boolean>();
    var userId = Number.parseInt(localStorage.getItem("userId")??"");
    var requestPath = this.pathService.post("ColumnSetting");
    if(userId>0 && gridId){
      columns.forEach((el)=>{
        var columnObj = this.getColumnObj(gridId, el, userId);
        this.http.post<ResponseBodyById>(environment.endpointApiPath+requestPath,columnObj).subscribe();
      });
      console.log("ustawiło kolumy");
      bs.next(true);
    } else {
      console.log("błąd ustawiania kolumn");
      bs.next(false);
    }

    return bs.asObservable();
  }

  private getColumnObj(gridId: number, el: RequestGridDataColumnValue, userId: number):ColumnSetting {
   let obj:ColumnSetting = {
      id:0, //tu wjedzie konkretny id jak kolumny beda wczytywane juz z zapisanego filtra
      gridId:gridId,
      userId:userId,
      columnName:el.columnName,
      columnType:el.dataType,
      displayName:el.displayName,
      format:"",
      roundPlace:0,
      isVisible:el.isVisible,
      isDefaultSetting:false,
      customWidth:0,
      tagOrder:1, //do zmiany
      enableSum:false,
      enableAvg:false,
      enableMax:false,
      enableMin:false
    };

  return obj ;
  }
}
