import { Component, OnInit} from "@angular/core";
import { ConfirmationService, LazyLoadEvent, MenuItem } from "primeng/api";
import { BehaviorSubject, Observable} from "rxjs";
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
  styleUrls: ["./users.component.css"]
})


export class UsersComponent implements OnInit, ITableComponent, ITableCrudComponent<UserDto>{
  columnPath = "/api/Users/GetUserGridData/Get";
  listPath = "/api/Users/GetUsers/Get";
  addPath = "/api/Users/ManageUser/Post";
  editPath = "/api/Users/ManageUser/Put";
  deletePath = "/api/Users/DeleteUser/Delete";
  buttons:MenuItem[];
  objectDto:UserDto;
  editState:boolean;
  objectEditDto:UserDto;
  dataObj:Observable<ResponseBodyGetList>;
  columns:RequestGridDataColumnValue[];
  reqObjBS = new BehaviorSubject<RequestBodyGetList>({pageNumber:10000});

  constructor(
   private tableService:TableResponseService,
   private translateService:TranslateService,
   private userService:UserService,
   private http:HttpClient//,
   //private confirmationService:ConfirmationService
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
        label:"Dodaj",
        icon:"pi pi-fw pi-plus",
        command:()=>this.add()
      },
      {
        label:"Usuń",
        icon:"pi pi-fw pi-minus",
        command:()=>this.delete()
      },
      {
        label:"Edytuj",
        icon:"pi pi-fw pi-pencil",
        command:()=>this.edit()
      }
    ]
  }


  add(): void {
    this.editState = true;
    this.objectDto = {};
    this.objectEditDto = {};
  }
  edit(): void {
    if(this.objectEditDto !== null){
      this.editState = true;
    }

  }
  delete(): void {
    // if(this.objectDto.id !== null){
    //   this.confirmationService.confirm({
    //     message: "Czy napewno chcesz usunąc rekord?",
    //     accept:()=>{
      console.log("usuwanie");
          this.http.delete(environment.endpointApiPath+this.deletePath+"/"+this.objectDto.id).subscribe({
            complete:()=> console.log("Usunieto rekord")
           })
    //     }
    //   })
    // }
  }

  save():void{
    if(this.objectEditDto != undefined) {
      console.log(this.objectEditDto.id);
      if(this.objectEditDto.id === undefined){
        this.objectEditDto.id = 0;
        this.http.post(environment.endpointApiPath+this.addPath,this.objectEditDto).subscribe({
          complete:()=>console.log("Dodano uzytkownika toast!!!")
        });
      } else {
        this.http.put(environment.endpointApiPath+this.editPath+"/"+this.objectEditDto.id,this.objectEditDto).subscribe({
          complete:()=>console.log("Edycja użytkownika  toast!")
        })
      }
    }
  }

}


