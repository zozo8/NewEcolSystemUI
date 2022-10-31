import { Component, OnInit } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem } from "primeng/api";

@Component({
  selector: "app-mainpage",
  templateUrl: "./mainpage.component.html",
  styleUrls: ["./mainpage.component.css"]
})
export class MainpageComponent implements OnInit {

  loading:boolean;
  selectedTemplate:MenuItem;
  templateList:MenuItem[];
  text:string;

  constructor(
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.getTemplateList();
    this.selectedTemplate = this.templateList[1];
  }


  getTemplateList():void {
    this.templateList = [
      {
        label:this.translateService.instant("main-page.template1"),
        icon:"pi pi-microsoft",
        id:"modules"
      },
      {
        label:this.translateService.instant("main-page.template2"),
        icon:"pi pi-chart-line",
        id:"charts"
      }
    ];
  }
}
