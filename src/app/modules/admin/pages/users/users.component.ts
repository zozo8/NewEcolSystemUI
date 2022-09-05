import { Component, OnInit} from "@angular/core";
import { ConfirmationService, LazyLoadEvent, MenuItem, MessageService } from "primeng/api";
import { BehaviorSubject, Observable, tap} from "rxjs";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumn } from "src/app/models/requests/requestGridDataColumn.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";
import { TableResponseService } from "src/app/services/table-response.service";
import { TranslateService } from "@ngx-translate/core";
import { ITableCrudComponent } from "src/app/Interfaces/table/ITableCrudComponent";
import { UserDto } from "src/app/models/dto/userDto";
import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
  providers:[MessageService, ConfirmationService]
})


export class UsersComponent implements OnInit, ITableComponent, ITableCrudComponent<UserDto>{
  columnPath = "/api/Users/GetUserGridData/Get";
  listPath = "/api/Users/GetUsers/Get";
  addPath = "/api/Users/ManageUser/Post";
  editPath = "/api/Users/ManageUser/Put";
  deletePath = "/api/Users/DeleteUser/Delete?id=";
  buttons:MenuItem[];
  objectDto:UserDto;
  editState:boolean;
  objectEditDto:UserDto;
  dataObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});
  submitValue:string;

  constructor(
   private tableService:TableResponseService,
   private translateService:TranslateService,
   private userService:UserService,
   private http:HttpClient,
   private messageService:MessageService,
   private confirmationService:ConfirmationService
  ) {
  }

  ngOnInit(): void {

  this.getColumns();
  this.buttons = this.getButtons();

   this.reqObjBS.subscribe(request=> {
    if(request?.pageNumber !== 10000){
      this.dataObj = this.tableService.getResponseObj(this.listPath,request);
    }
   });
  }

  getColumns():void {
     this.tableService.getFilterColumnName(this.columnPath).subscribe({
      next:(res:RequestGridDataColumn)=> {
         this.columns = this.tableService.GetColumnsOutput(res.value);
      }, complete:()=> {
        this.prepareRequest(null);
      }
  });
  }

  prepareRequest(ev:LazyLoadEvent | null):void {
    let requestObj = this.tableService.getRequestObj(this.columns, ev);
    this.reqObjBS.next(requestObj);
}

  getRequestObjFromComponent(ev:LazyLoadEvent):void {
    this.prepareRequest(ev);
  }

  getSelectedObjFromComponent(ev:any):void {
    if(ev.data != null){
      this.objectDto = ev.data;
     this.objectEditDto = {...ev.data}; //copy without reference
    }
  }

  getButtons():MenuItem[] {
    return [
      {
        label:this.translateService.instant("btn.add"),
        icon:"pi pi-fw pi-plus",
        command:()=>this.add()
      },
      {
        label:this.translateService.instant("btn.remove"),
        icon:"pi pi-fw pi-minus",
        command:()=>this.delete()
      },
      {
        label:this.translateService.instant("btn.edit"),
        icon:"pi pi-fw pi-pencil",
        command:()=>this.edit()
      },
      {
        label:this.translateService.instant("btn.refresh"),
        icon:"pi pi-fw pi-refresh",
        command:()=>this.prepareRequest(null)
      }
    ]
  }


  add(): void {
    this.editState = true;
    this.submitValue = this.translateService.instant("btn.add");
    this.objectDto = {};
    this.objectEditDto = {};
  }
  edit(): void {
    if(this.objectEditDto !== null){
      this.editState = true;
      this.submitValue = this.translateService.instant("btn.edit");
    } else {
      this.messageService.add(
        {severity:"warn", summary:this.translateService.instant("btn.warning"), detail:this.translateService.instant("table-menu.select_record") });
    }

  }
  delete(): void {
    if(this.objectDto.id !== null){
      this.confirmationService.confirm({
        message: this.translateService.instant("table-menu.remove_record_question"),
        accept:()=>{
          this.http.delete<any>(environment.endpointApiPath+this.deletePath+this.objectDto.id)
          .pipe(tap(console.log))
          .subscribe({
            next:(res:any)=>{
              console.log("Usuwanie", res);
            },
            complete:()=>this.messageService.add(
              {severity:"success", summary:this.translateService.instant("btn.ok"), detail:this.translateService.instant("table-menu.remove_record_success")
            }),
            error:()=>this.messageService.add(
              {severity:"error", summary:this.translateService.instant("table-menu.error"), detail:this.translateService.instant("table-menu.remove_record_error")}
              )
           });
        }
      })
    }
  }

  save():void{
    if(this.objectEditDto != undefined) {
      if(this.objectEditDto.id === undefined){
        this.objectEditDto.id = 0;
        this.http.post<any>(environment.endpointApiPath+this.addPath,this.objectEditDto)
        .pipe(tap(console.log))
        .subscribe({
          complete:()=>{
            this.messageService.add(
              {severity:"success",summary:this.translateService.instant("btn.ok"), detail:this.translateService.instant("table-menu.add_record_success")}
              );
            this.editState = false;
          },
          error:(er:any)=>this.messageService.add(
            {severity:"error",summary:this.translateService.instant("table-menu.error"), detail:this.translateService.instant("table-menu.add_record_error")}
            )
        });
      } else {
        this.http.put(environment.endpointApiPath+this.editPath+"/"+this.objectEditDto.id,this.objectEditDto).subscribe({
          complete:()=>{
            this.messageService.add(
              {severity:"success",summary:this.translateService.instant("btn.ok"), detail:this.translateService.instant("table-menu.edit_record_success")}
              );
            this.editState = false;
          },
          error:(er:any)=>this.messageService.add(
            {severity:"error",summary:this.translateService.instant("table-menu.error"), detail:this.translateService.instant("table-menu.edit_record_error")}
            )
        });
      }
    }
  }

  cancel():void{
    this.editState = false;
  }



}


