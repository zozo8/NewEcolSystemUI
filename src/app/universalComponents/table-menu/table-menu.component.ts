import { Component, Input, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-table-menu",
  templateUrl: "./table-menu.component.html",
  styleUrls: ["./table-menu.component.css"]
})
export class TableMenuComponent implements OnInit {

 @Input()
 buttonList:MenuItem[];

 @Input()
 icon:string;

  constructor() { }

  ngOnInit(): void {
  }

}
