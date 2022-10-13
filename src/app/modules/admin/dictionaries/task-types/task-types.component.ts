import { Component, OnInit } from "@angular/core";
import { LazyLoadEvent } from "primeng/api";
import { BehaviorSubject, Observable } from "rxjs";
import { ITableComponent } from "src/app/Interfaces/table/ITableComponent";
import { RequestBodyGetList } from "src/app/models/requests/requestBodyGetList.model";
import { RequestGridDataColumnValue } from "src/app/models/requests/requestGridDataColumnValue.model";
import { ResponseBodyGetList } from "src/app/models/responses/responseBodyGetList.model";

@Component({
  selector: "app-task-types",
  templateUrl: "./task-types.component.html",
  styleUrls: ["./task-types.component.css"]
})
export class TaskTypesComponent implements OnInit {


  ngOnInit(): void {
  }
}
