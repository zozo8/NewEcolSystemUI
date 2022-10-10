import { Component, OnInit} from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { MenuItem } from "primeng/api";
import { MainpageService } from "./mainpage.service";

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

    private mainpageService:MainpageService,
    private translateService:TranslateService
  ) { }

  ngOnInit(): void {
    this.templateList =this.mainpageService.getTemplateList();
    this.selectedTemplate = this.templateList[1];
  }




}
