import { Component, OnInit} from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { BehaviorSubject, map, Observable, tap} from "rxjs";
import { FilterColumnName } from "src/app/models/requests/filterColumnName.model";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { UserService } from "./user.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {

  dataObj:Observable<ResponseBodyGetList>;

  filterColumnPath = "/api/Users/GetUserGridData/Get";
  requestPath = "/api/Users/GetUsers/Get";
  reqObj:RequestBodyGetList;
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:1});

  constructor(
   private userService:UserService
  ) { }

  ngOnInit(): void {
   this.getResponse(null);
  }

  onNewRequestParam(obj:LazyLoadEvent):void {
    this.getResponse(obj);
  }

  private getResponse(ev:LazyLoadEvent | null):void {

   //let requestBody:RequestBodyGetList;

   this.prepareRequest(ev);
   this.reqObjBS.subscribe(x=>{
     console.log(x);
      this.dataObj = this.userService.getResponseObj(this.requestPath,x);
      this.dataObj.subscribe({
        next:(res:any)=> console.log(res)
      })
   });

   //this.dataObj = this.userService.getResponseObj(this.requestPath,this.reqObj).pipe(tap(console.log));
  //  this.prepareRequest(ev).subscribe({
  //     next:(res:RequestBodyGetList)=> {
  //       requestBody = res;
  //     },
  //     complete:()=> {
  //       console.log("requestBody",requestBody);
  //       this.dataObj = this.userService.getResponseObj(this.requestPath,requestBody);
  //     }
  //   });
  }

  private prepareRequest(ev:LazyLoadEvent | null) {

    let filterColumn:RequestGridDataColumn;

    this.userService.getFilterColumnName(this.filterColumnPath).subscribe({
      next:(res:RequestGridDataColumn)=> {
        filterColumn = res;
      },
      complete:()=>{
        var res = this.userService.getRequestObj(filterColumn, ev);
        this.reqObjBS.next(res);
      }
    });

  }

}
