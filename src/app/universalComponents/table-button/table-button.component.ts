import { Component, Input, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-table-button",
  templateUrl: "./table-button.component.html",
  styleUrls: ["./table-button.component.css"]
})
export class TableButtonComponent implements OnInit {

 @Input()
 buttonList:MenuItem[];

 @Input()
 icon:string;

  constructor() { }

  ngOnInit(): void {
  }

}
